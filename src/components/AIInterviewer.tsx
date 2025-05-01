import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, MicIcon, StopCircle, Volume2, VolumeX } from 'lucide-react';
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
  const [isUsingElevenLabs, setIsUsingElevenLabs] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { toast } = useToast();
  const [showWellnessData, setShowWellnessData] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check if ElevenLabs package is available
  useEffect(() => {
    try {
      // This is just to check if the package exists
      // If it doesn't, it will throw an error and we'll use Ollama instead
      require('@11labs/react');
      setIsUsingElevenLabs(true);
    } catch (error) {
      setIsUsingElevenLabs(false);
      console.log('ElevenLabs not available, using Ollama fallback');
    }
  }, []);
  
  // Setup audio and check Ollama connection (as fallback)
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Check Ollama connection as fallback
    const checkConnection = async () => {
      const connected = await checkOllamaConnection();
      setIsOllamaConnected(connected);
      
      if (!connected && !isUsingElevenLabs) {
        toast({
          variant: "destructive",
          title: "Ollama Connection Failed",
          description: "Please make sure Ollama is running locally with the Mistral model or enable ElevenLabs.",
        });
      }
    };
    
    checkConnection();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [toast, isUsingElevenLabs]);

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
    if (isMuted || !text || isUsingElevenLabs) return;
    
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
      
      if (isUsingElevenLabs) {
        // Start ElevenLabs conversation
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
          toast({
            title: "Interview started",
            description: "You can now speak with the ElevenLabs AI interviewer.",
          });
        } else {
          // Fallback to Ollama
          handleOllamaStartInterview();
        }
      } else {
        // Use Ollama as fallback
        handleOllamaStartInterview();
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
      description: "You can now speak to the AI interviewer.",
    });
  };

  const handleStopInterview = async () => {
    setIsInterviewing(false);
    setIsSpeaking(false);
    setShowWellnessData(false);
    
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
    if (!isInterviewing || !transcript) return;
    
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
  }, [transcript, isInterviewing, isSpeaking, conversation, industry, difficulty, jobDescription]);

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
      
      {isInterviewing && transcript && (
        <div className="p-3 rounded-lg bg-muted/50 border border-primary/10">
          <p className="text-sm italic">{transcript}</p>
        </div>
      )}
      
      <div className="flex justify-center">
        {!isInterviewing ? (
          <Button 
            onClick={handleStartInterview} 
            className="px-6 gap-2"
            size="lg"
            disabled={!isOllamaConnected && !isUsingElevenLabs}
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
      </div>
      
      {!isOllamaConnected && !isUsingElevenLabs && (
        <div className="flex items-center justify-center p-2 bg-red-950/30 border border-red-500/30 rounded-md text-sm text-red-400">
          <p>Speech system not available. Enable ElevenLabs or make sure Ollama is running locally.</p>
        </div>
      )}
      
      {isInterviewing && isUsingElevenLabs && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <MicIcon className="w-4 h-4 text-green-500 animate-pulse" />
          <span>ElevenLabs Voice AI active</span>
        </div>
      )}
      
      {isInterviewing && !isUsingElevenLabs && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <MicIcon className="w-4 h-4 text-destructive animate-pulse" />
          <span>Microphone active</span>
        </div>
      )}
    </div>
  );
};

export default AIInterviewer;
