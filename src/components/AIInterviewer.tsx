
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, MicIcon, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import InterviewerAvatar from './InterviewerAvatar';

// Add proper TypeScript declarations for Web Speech API
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

// Define the SpeechRecognition interface
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

// Extend Window interface to include SpeechRecognition
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
  // Use a default Ollama URL rather than exposing it to the user
  const ollamaUrl = 'http://localhost:11434';
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Setup audio element
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Web Speech API for speech recognition
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

  // Update recognition status when interviewing state changes
  useEffect(() => {
    if (isInterviewing && recognitionRef.current) {
      recognitionRef.current.start();
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isInterviewing]);

  // Web Speech API for text-to-speech (free solution)
  const speakText = (text: string) => {
    if (isMuted || !text) return;
    
    setIsSpeaking(true);
    
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a good male voice
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

  // Function to communicate with local Ollama Mistral model
  const askMistral = async (prompt: string) => {
    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral',
          prompt: prompt,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to communicate with Ollama');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Ollama API Error:', error);
      toast({
        variant: "destructive",
        title: "Ollama API Error",
        description: "Make sure Ollama is running locally with the Mistral model. Run: 'ollama run mistral'",
      });
      return "I'm having trouble connecting to my AI brain right now. Please check that Ollama is running with the Mistral model.";
    }
  };

  const handleStartInterview = async () => {
    // Test connection to Ollama
    try {
      await fetch(`${ollamaUrl}/api/tags`, { method: 'GET' });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cannot connect to Ollama",
        description: "Make sure Ollama is running locally. Run: 'ollama run mistral'",
      });
      return;
    }
    
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(async () => {
        setIsInterviewing(true);
        
        // Build context for Mistral
        const context = `You are an AI interviewer for a ${industry} position. 
This is a ${difficulty} interview. 
${jobDescription ? "The job description is: " + jobDescription : ""}
Please provide a brief welcome message and ask the first interview question.
Keep responses concise, professional, and encouraging.`;

        // Get AI response
        const aiResponse = await askMistral(context);
        
        // Add welcome message from AI
        setConversation([{ role: 'ai', message: aiResponse }]);
        
        // Speak welcome message
        speakText(aiResponse);
        
        toast({
          title: "Interview started",
          description: "You can now speak to the AI interviewer.",
        });
        
        // Start listening for user speech
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
        toast({
          variant: "destructive",
          title: "Microphone access denied",
          description: "We need microphone access to conduct the interview.",
        });
      });
  };

  const handleStopInterview = () => {
    setIsInterviewing(false);
    setIsSpeaking(false);
    
    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Stop any playing audio
    window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    toast({
      title: "Interview ended",
      description: "Your interview session has been saved.",
    });
  };

  // Handle speech recognition results and send to AI when user pauses
  useEffect(() => {
    if (!isInterviewing || !transcript) return;
    
    const timer = setTimeout(async () => {
      if (transcript.trim() && !isSpeaking) {
        const userMessage = transcript;
        setTranscript('');
        
        // Add user message to conversation
        setConversation(prev => [...prev, { role: 'user', message: userMessage }]);
        
        // Get conversation history for context
        const conversationHistory = conversation.map(entry => 
          `${entry.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${entry.message}`
        ).join('\n');
        
        // Build prompt for Mistral
        const prompt = `You are an AI interviewer for a ${industry} position conducting a ${difficulty} interview.
        
Previous conversation:
${conversationHistory}

Candidate: ${userMessage}

Provide a brief, professional response and ask the next relevant interview question. Keep your response under 100 words.`;

        // Get AI response
        const aiResponse = await askMistral(prompt);
        
        // Add AI response to conversation
        setConversation(prev => [...prev, { role: 'ai', message: aiResponse }]);
        
        // Speak AI response
        speakText(aiResponse);
      }
    }, 1500); // Wait for 1.5 seconds of silence before sending
    
    return () => clearTimeout(timer);
  }, [transcript, isInterviewing, isSpeaking, conversation, industry, difficulty, jobDescription]);

  // Toggle mute function
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="relative w-full space-y-6">
      {/* 3D Avatar */}
      <div className="relative flex justify-center">
        <InterviewerAvatar speaking={isSpeaking} size={320} />
        
        {/* Audio Controls */}
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
      
      {/* Conversation */}
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
      
      {/* User's current speech */}
      {isInterviewing && transcript && (
        <div className="p-3 rounded-lg bg-muted/50 border border-primary/10">
          <p className="text-sm italic">{transcript}</p>
        </div>
      )}
      
      {/* Controls */}
      <div className="flex justify-center">
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
      </div>
      
      {isInterviewing && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <MicIcon className="w-4 h-4 text-destructive animate-pulse" />
          <span>Microphone active</span>
        </div>
      )}
    </div>
  );
};

export default AIInterviewer;
