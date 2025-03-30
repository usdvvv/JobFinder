
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, MicIcon, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import InterviewerAvatar from './InterviewerAvatar';
import { Input } from "@/components/ui/input";

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
  const { toast } = useToast();
  
  // Text-to-Speech
  const [elevenlabsApiKey, setElevenlabsApiKey] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Text-to-speech function
  const speakText = async (text: string) => {
    if (isMuted || !elevenlabsApiKey || !text) return;
    
    setIsSpeaking(true);
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': elevenlabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert text to speech');
      }

      // Create a blob URL from the response
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      if (audioRef.current) {
        audioRef.current.src = url;
        
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
        };
        
        audioRef.current.onerror = () => {
          setIsSpeaking(false);
          toast({
            variant: "destructive",
            title: "Audio playback error",
            description: "There was an error playing the audio.",
          });
        };
        
        audioRef.current.play();
      }
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

  const handleStartInterview = () => {
    if (!elevenlabsApiKey) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key to enable text-to-speech.",
      });
      return;
    }
    
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        setIsInterviewing(true);
        
        // Add welcome message from AI
        const welcomeMessage = `Hello! I'm your AI interviewer for this ${industry} position. This will be a ${difficulty} interview. ${jobDescription ? "I've reviewed the job description you provided." : ""} Let's start with a simple question: Could you please introduce yourself and tell me about your background?`;
        
        setConversation([{ role: 'ai', message: welcomeMessage }]);
        
        // Speak welcome message
        speakText(welcomeMessage);
        
        toast({
          title: "Interview started",
          description: "You can now speak to the AI interviewer.",
        });
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
    
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    toast({
      title: "Interview ended",
      description: "Your interview session has been saved.",
    });
  };

  const handleUserSpeech = (userMessage: string) => {
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', message: userMessage }]);
    
    // Simulate AI response after 1 second
    setTimeout(() => {
      // Example responses - in a real implementation, this would come from an API
      const aiResponses = [
        "That's an interesting background. Can you tell me about a challenging project you worked on recently?",
        "Thank you for sharing. How do you handle conflict in the workplace?",
        "Great answer. What would you say is your greatest professional achievement?",
        "I see. Could you describe your ideal work environment?",
        "Interesting perspective. Where do you see yourself in five years?"
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setConversation(prev => [...prev, { role: 'ai', message: randomResponse }]);
      
      // Speak AI response
      speakText(randomResponse);
    }, 1000);
  };

  // Simulated speech recognition - in a real app you would use the Web Speech API
  useEffect(() => {
    if (!isInterviewing) return;
    
    // Simulate user speaking after 8 seconds
    const timer = setTimeout(() => {
      const userResponses = [
        "Hi, I'm Alex. I have 5 years of experience in software development, specializing in React and Node.js.",
        "I recently led a project to rebuild our company's dashboard, which improved load times by 40%.",
        "I believe communication is key to resolving conflicts. I always try to understand others' perspectives."
      ];
      
      const randomUserResponse = userResponses[Math.floor(Math.random() * userResponses.length)];
      handleUserSpeech(randomUserResponse);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [isInterviewing, conversation.length]);

  // Toggle mute function
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="relative w-full space-y-6">
      {/* ElevenLabs API Key Input */}
      {!isInterviewing && (
        <div className="mb-4">
          <label htmlFor="elevenlabs-api-key" className="block text-sm font-medium mb-2">
            ElevenLabs API Key (Required for Text-to-Speech)
          </label>
          <Input
            id="elevenlabs-api-key"
            type="password"
            placeholder="Enter your ElevenLabs API key"
            value={elevenlabsApiKey}
            onChange={(e) => setElevenlabsApiKey(e.target.value)}
            className="w-full"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Get your API key from <a href="https://elevenlabs.io/" target="_blank" rel="noopener noreferrer" className="underline">ElevenLabs</a>
          </p>
        </div>
      )}
      
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
      
      {/* Controls */}
      <div className="flex justify-center">
        {!isInterviewing ? (
          <Button 
            onClick={handleStartInterview} 
            className="px-6 gap-2"
            size="lg"
            disabled={!elevenlabsApiKey}
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
