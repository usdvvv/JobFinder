
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, MicIcon, StopCircle, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Interviewer3DAvatar from './Interviewer3DAvatar';
import WellnessUserOverview from './WellnessUserOverview';
import { askMistral, checkOllamaConnection } from '@/utils/ollamaApi';
import { 
  startElevenLabsConversation, 
  endElevenLabsConversation, 
  setElevenLabsVolume,
  ELEVENLABS_AGENTS 
} from '@/utils/elevenLabsApi';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
    length: number;
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface AIInterviewerProps {
  jobDescription?: string;
  industry?: string;
  difficulty?: string;
}

const AIInterviewer = ({ jobDescription, industry = 'Tech', difficulty = 'Mid-level' }: AIInterviewerProps) => {
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<{role: 'ai' | 'user', message: string}[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isOllamaConnected, setIsOllamaConnected] = useState(false);
  const [isUsingElevenLabs, setIsUsingElevenLabs] = useState(true); // Default to ElevenLabs now
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [elevenLabsAvailable, setElevenLabsAvailable] = useState(false);
  const [showFallbackButton, setShowFallbackButton] = useState(false);
  const { toast } = useToast();
  const [showWellnessData, setShowWellnessData] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const initializationAttempted = useRef(false);

  // Check if ElevenLabs package is available
  useEffect(() => {
    try {
      // Check if the ElevenLabs global variable is defined
      const available = !!(window as any).__elevenLabsConversation;
      setElevenLabsAvailable(available);
      
      if (available) {
        console.log('ElevenLabs is available and will be used by default');
      } else {
        console.log('ElevenLabs not available, will show fallback option if needed');
        // Check Ollama as fallback
        checkOllamaConnection().then(connected => {
          setIsOllamaConnected(connected);
          if (connected) {
            console.log('Ollama fallback available');
          } else {
            console.log('Ollama fallback not connected');
          }
        });
      }
    } catch (error) {
      setElevenLabsAvailable(false);
      console.log('Error checking ElevenLabs availability:', error);
    }
  }, []);
  
  // Setup audio
  useEffect(() => {
    audioRef.current = new Audio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let transcriptText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcriptText += event.results[i][0].transcript;
        }
        setTranscript(transcriptText);
      };
      
      recognitionRef.current.onend = () => {
        if (isInterviewing) {
          recognitionRef.current?.start();
        }
      };
    } else {
      toast({
        variant: "destructive",
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition. Please use Chrome.",
      });
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  useEffect(() => {
    if (isInterviewing && recognitionRef.current) {
      recognitionRef.current.start();
      setShowWellnessData(true);
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isInterviewing]);

  const speakText = (text: string) => {
    if (isMuted || !text) return;
    
    // ElevenLabs handles its own TTS, this is only for Ollama fallback
    if (isUsingElevenLabs) return;
    
    setIsSpeaking(true);
    
    try {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('Daniel') || 
        voice.name.includes('Google UK English Male')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          variant: "destructive",
          title: "Speech synthesis error",
          description: "There was an error with text-to-speech.",
        });
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
      toast({
        variant: "destructive",
        title: "Text-to-speech failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  const handleStartInterview = async () => {
    try {
      // Check for microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // If we got here, microphone access was granted
      setIsInterviewing(true);
      setShowWellnessData(true);
      
      // Try to use ElevenLabs first by default
      if (elevenLabsAvailable) {
        const success = await startElevenLabsInterview();
        if (!success) {
          setShowFallbackButton(true);
          toast({
            variant: "destructive",  // Changed from "warning" to "destructive"
            title: "ElevenLabs Connection Issue",
            description: "Click 'Try Alternative Interviewer' to use the fallback system.",
          });
        }
      } else {
        // Show the fallback button if ElevenLabs isn't available
        setShowFallbackButton(true);
        toast({
          variant: "default",  // Changed from "warning" to "default"
          title: "ElevenLabs Not Available",
          description: "Click 'Try Alternative Interviewer' to use the fallback system.",
        });
      }
      
      // Clean up audio stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error starting interview:', error);
      toast({
        variant: "destructive",
        title: "Failed to start interview",
        description: "Please check your microphone access and connections.",
      });
    }
  };

  const startElevenLabsInterview = async (): Promise<boolean> => {
    if (!elevenLabsAvailable) return false;

    initializationAttempted.current = true;
    
    try {
      // Start ElevenLabs conversation with context
      const context = `You are an AI interviewer for a ${industry} position. 
This is a ${difficulty} interview. 
${jobDescription ? "The job description is: " + jobDescription : ""}
Keep responses concise, professional, and encouraging.`;
      
      const id = await startElevenLabsConversation({
        agentId: ELEVENLABS_AGENTS.INTERVIEWER,
        overrides: {
          agent: {
            prompt: {
              prompt: context
            },
            language: "en"
          },
          tts: {
            voiceId: "pFZP5JQG7iQjIQuC4Bku" // Lily voice
          }
        }
      });
      
      setConversationId(id);
      
      if (id) {
        setIsUsingElevenLabs(true);
        toast({
          title: "Interview started",
          description: "You can now speak with the ElevenLabs AI interviewer.",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error starting ElevenLabs interview:', error);
      return false;
    }
  };

  const handleSwitchToOllama = async () => {
    setShowFallbackButton(false);
    
    // End current ElevenLabs conversation if it exists
    if (conversationId) {
      await endElevenLabsConversation(conversationId);
      setConversationId(null);
    }
    
    setIsUsingElevenLabs(false);
    
    // Start Ollama interview
    await handleOllamaStartInterview();
  };

  const handleOllamaStartInterview = async () => {
    if (!isOllamaConnected) {
      toast({
        variant: "destructive",
        title: "Cannot connect to Ollama",
        description: "Make sure Ollama is running locally. Run: 'ollama run mistral'",
      });
      return;
    }
    
    // Prepare prompt for Mistral
    const context = `You are an AI interviewer for a ${industry} position. 
This is a ${difficulty} interview. 
${jobDescription ? "The job description is: " + jobDescription : ""}
Please provide a brief welcome message and ask the first interview question.
Keep responses concise, professional, and encouraging.`;
    
    // Get response from Mistral
    const aiResponse = await askMistral(context);
    
    setConversation([{ role: 'ai', message: aiResponse }]);
    
    speakText(aiResponse);
    
    toast({
      title: "Interview started",
      description: "You can now speak to the fallback AI interviewer.",
    });
  };

  const handleStopInterview = async () => {
    setIsInterviewing(false);
    setIsSpeaking(false);
    setShowWellnessData(false);
    setShowFallbackButton(false);
    
    // Stop ElevenLabs conversation if active
    if (conversationId) {
      await endElevenLabsConversation(conversationId);
      setConversationId(null);
    }
    
    // Cancel any speech synthesis
    window.speechSynthesis.cancel();
    
    toast({
      title: "Interview ended",
      description: "Your interview session has been saved.",
    });
  };

  useEffect(() => {
    // Only process transcript for Ollama mode
    if (!isInterviewing || !transcript || isUsingElevenLabs) return;
    
    const timer = setTimeout(async () => {
      if (transcript.trim() && !isSpeaking) {
        const userMessage = transcript;
        setTranscript('');
        
        setConversation(prev => [...prev, { role: 'user', message: userMessage }]);
        
        const conversationHistory = conversation.map(entry => 
          `${entry.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${entry.message}`
        ).join('\n');
        
        const prompt = `You are an AI interviewer for a ${industry} position conducting a ${difficulty} interview.
        
Previous conversation:
${conversationHistory}

Candidate: ${userMessage}

Provide a brief, professional response and ask the next relevant interview question. Keep your response under 100 words.`;

        const aiResponse = await askMistral(prompt);
        
        setConversation(prev => [...prev, { role: 'ai', message: aiResponse }]);
        
        speakText(aiResponse);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [transcript, isInterviewing, isSpeaking, conversation, industry, difficulty, jobDescription, isUsingElevenLabs]);

  const toggleMute = async () => {
    setIsMuted(!isMuted);
    
    // Adjust ElevenLabs volume if using it
    if (conversationId) {
      await setElevenLabsVolume(conversationId, isMuted ? 1.0 : 0.0);
    } else {
      // Otherwise cancel any ongoing speech
      if (isMuted) {
        window.speechSynthesis.cancel();
      }
    }
  };

  return (
    <div className="relative w-full space-y-6">
      <div className="relative flex justify-center">
        <Interviewer3DAvatar 
          speaking={isSpeaking} 
          size={320} 
          showWellnessData={showWellnessData} 
        />
        
        {isInterviewing && (
          <button 
            onClick={toggleMute}
            className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}
      </div>
      
      <div className="rounded-lg border p-4 space-y-4 h-60 overflow-y-auto">
        {conversation.map((entry, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${entry.role === 'ai' 
              ? 'bg-primary/10 border border-primary/20' 
              : 'bg-muted ml-8'}`}
          >
            <p className="text-sm">{entry.message}</p>
          </div>
        ))}
        {conversation.length === 0 && (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Your interview transcript will appear here</p>
          </div>
        )}
      </div>
      
      {isInterviewing && transcript && !isUsingElevenLabs && (
        <div className="p-3 rounded-lg bg-muted/50 border border-primary/10">
          <p className="text-sm italic">{transcript}</p>
        </div>
      )}
      
      <div className="flex flex-col items-center space-y-3">
        {!isInterviewing ? (
          <Button 
            onClick={handleStartInterview} 
            className="px-6 gap-2"
            size="lg"
          >
            <Play className="w-4 h-4" />
            Start Interview
          </Button>
        ) : (
          <Button 
            onClick={handleStopInterview}
            variant="destructive"
            className="px-6 gap-2"
            size="lg"
          >
            <StopCircle className="w-4 h-4" />
            End Interview
          </Button>
        )}
        
        {showFallbackButton && (
          <Button 
            onClick={handleSwitchToOllama}
            variant="outline"
            className="mt-2"
            disabled={!isOllamaConnected}
          >
            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
            Try Alternative Interviewer
          </Button>
        )}
      </div>
      
      {isInterviewing && isUsingElevenLabs && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <MicIcon className="w-4 h-4 text-green-500 animate-pulse" />
          <span>ElevenLabs Voice AI active</span>
        </div>
      )}
      
      {isInterviewing && !isUsingElevenLabs && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <MicIcon className="w-4 h-4 text-yellow-500 animate-pulse" />
          <span>Alternative Voice System active</span>
        </div>
      )}
    </div>
  );
};

export default AIInterviewer;
