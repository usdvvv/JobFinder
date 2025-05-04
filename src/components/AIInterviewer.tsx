
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, MicIcon, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Interviewer3DAvatar from './Interviewer3DAvatar';
import WellnessUserOverview from './WellnessUserOverview';
import { useConversation } from '@11labs/react';

// Import the correct Role type from the library
import type { Role } from '@11labs/react';

interface AIInterviewerProps {
  jobDescription?: string;
  industry?: string;
  difficulty?: string;
  agentId?: string;
}

const AIInterviewer = ({ 
  jobDescription, 
  industry = 'Tech', 
  difficulty = 'Mid-level',
  agentId = 'n1pNc0aPoEIZdxIEhzRo' // Default to the provided agent ID
}: AIInterviewerProps) => {
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<{role: 'ai' | 'user', message: string}[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [showWellnessData, setShowWellnessData] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioInitializedRef = useRef(false);

  // Initialize audio context on component mount
  useEffect(() => {
    // Create AudioContext only when needed to avoid autoplay restrictions
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log("Audio context created:", audioContextRef.current.state);
      } catch (error) {
        console.error("Failed to create AudioContext:", error);
      }
    }
    
    return () => {
      // Cleanup audio context on unmount
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  // Ensure audio context is in running state when needed
  useEffect(() => {
    if (isInterviewing && audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
        .then(() => {
          console.log("AudioContext resumed successfully:", audioContextRef.current?.state);
          audioInitializedRef.current = true;
        })
        .catch(error => console.error("Failed to resume AudioContext:", error));
    }
  }, [isInterviewing]);

  // Eleven Labs Conversation hook
  const conversationApi = useConversation({
    onConnect: () => {
      console.log("Connected to Eleven Labs");
      setIsConnecting(false);
      
      // Add initial AI message to the conversation
      const initialMessage = `Hello! I'm your AI interviewer for this ${difficulty} ${industry} position interview. ${
        jobDescription ? "I've reviewed the job description you provided." : ""
      } I'm here to ask you some relevant questions and help you practice. Let's get started!`;
      
      setConversation([{ role: 'ai', message: initialMessage }]);
      
      // Resume audio context if it was suspended (needed for Chrome's autoplay policy)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
          .then(() => {
            console.log("AudioContext resumed in onConnect:", audioContextRef.current?.state);
            audioInitializedRef.current = true;
            // Explicitly set the volume after connection
            conversationApi.setVolume({ volume: isMuted ? 0 : 1 });
          })
          .catch(error => console.error("Failed to resume AudioContext in onConnect:", error));
      } else if (audioContextRef.current) {
        console.log("AudioContext already running in onConnect:", audioContextRef.current.state);
        // Explicitly set the volume after connection
        conversationApi.setVolume({ volume: isMuted ? 0 : 1 });
      }
    },
    onDisconnect: () => {
      console.log("Disconnected from Eleven Labs");
      setIsInterviewing(false);
      setIsSpeaking(false);
    },
    onMessage: (props: { message: string; source: Role }) => {
      console.log("Message from Eleven Labs:", props);
      
      // Parse the message to handle different message types
      try {
        // Try to parse the message as JSON
        const messageData = JSON.parse(props.message);
        
        // Handle different message types based on the structure
        if (messageData.type === 'conversation.item.created' && 
            messageData.item?.type === 'message' && 
            messageData.item?.role === 'assistant') {
          
          // Extract message content
          const content = messageData.item.content?.find((c: any) => c.type === 'text')?.text || '';
          if (content) {
            setConversation(prev => [...prev, { role: 'ai', message: content }]);
          }
        } 
        // Handle when the AI is speaking
        else if (messageData.type === 'response.audio.delta') {
          setIsSpeaking(true);
          console.log("AI is speaking...");
        } 
        // Handle when the AI stops speaking
        else if (messageData.type === 'response.audio.done') {
          setIsSpeaking(false);
          console.log("AI stopped speaking");
        }
        // Handle transcript from user's audio
        else if (messageData.type === 'input_audio_transcript.delta') {
          setTranscript(messageData.delta || '');
        }
        // Handle when transcript is finalized
        else if (messageData.type === 'conversation.item.created' && 
                messageData.item?.type === 'message' && 
                messageData.item?.role === 'user') {
          
          const content = messageData.item.content?.find((c: any) => c.type === 'text')?.text || '';
          if (content) {
            setTranscript('');
            setConversation(prev => [...prev, { role: 'user', message: content }]);
          }
        }
      } catch (error) {
        // If parsing fails, handle the message as plain text
        console.log("Failed to parse message as JSON, handling as plain text:", error);
        
        // Convert the Role to a string for safer comparison
        const sourceStr = String(props.source).toLowerCase();
        
        // Now compare with lowercase string values
        if (sourceStr.includes('assistant')) {
          setConversation(prev => [...prev, { role: 'ai', message: props.message }]);
        } else if (sourceStr.includes('user')) {
          setConversation(prev => [...prev, { role: 'user', message: props.message }]);
        }
      }
    },
    onError: (error) => {
      console.error("Eleven Labs Error:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "There was an error connecting to the interview service.",
      });
      setIsInterviewing(false);
      setIsConnecting(false);
    }
  });

  const handleStartInterview = async () => {
    try {
      // Check for microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsConnecting(true);
      setShowWellnessData(true);
      
      // Prepare custom prompt based on job description and industry
      const customPrompt = `You are an AI interviewer for a ${industry} position. 
This is a ${difficulty} interview. 
${jobDescription ? "The job description is: " + jobDescription : ""}
Ask relevant interview questions for this position.
Keep responses concise, professional, and encouraging.
Evaluate the candidate's responses thoughtfully.`;

      // Resume audio context if it was suspended (needed for Chrome's autoplay policy)
      if (audioContextRef.current) {
        if (audioContextRef.current.state === 'suspended') {
          try {
            await audioContextRef.current.resume();
            console.log("AudioContext resumed in handleStartInterview:", audioContextRef.current.state);
            audioInitializedRef.current = true;
          } catch (error) {
            console.error("Failed to resume AudioContext in handleStartInterview:", error);
            // Try creating a new context as a fallback
            try {
              audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
              console.log("Created new AudioContext as fallback:", audioContextRef.current.state);
              audioInitializedRef.current = true;
            } catch (e) {
              console.error("Failed to create new AudioContext:", e);
            }
          }
        } else {
          console.log("AudioContext already running in handleStartInterview:", audioContextRef.current.state);
        }
      } else {
        // Create audio context if it doesn't exist yet
        try {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          console.log("Created AudioContext in handleStartInterview:", audioContextRef.current.state);
          audioInitializedRef.current = true;
        } catch (error) {
          console.error("Failed to create AudioContext in handleStartInterview:", error);
        }
      }

      // Start the conversation session with Eleven Labs
      await conversationApi.startSession({ 
        agentId,
        overrides: {
          agent: {
            prompt: {
              prompt: customPrompt
            }
          },
          // Explicitly set output audio parameters
          tts: {
            voiceId: "21m00Tcm4TlvDq8ikWAM" // Using a known working voice
          }
        }
      });
      
      // Set volume explicitly after starting the session
      setTimeout(() => {
        conversationApi.setVolume({ volume: isMuted ? 0 : 1 });
        console.log("Volume set after session start:", isMuted ? 0 : 1);
      }, 500);
      
      setIsInterviewing(true);
      
      toast({
        title: "Interview started",
        description: "You can now speak to the AI interviewer.",
      });
      
      // Clean up audio stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error starting interview:', error);
      setIsConnecting(false);
      
      toast({
        variant: "destructive",
        title: "Failed to start interview",
        description: "Please check your microphone access and try again.",
      });
    }
  };

  const handleStopInterview = () => {
    conversationApi.endSession();
    setIsInterviewing(false);
    setIsSpeaking(false);
    setShowWellnessData(false);
    
    toast({
      title: "Interview ended",
      description: "Your interview session has been saved.",
    });
  };

  const toggleMute = () => {
    if (!isInterviewing) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Set volume to 0 or 1 based on mute state
    conversationApi.setVolume({ volume: newMutedState ? 0 : 1 });
    console.log("Volume toggled to:", newMutedState ? 0 : 1);
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
            disabled={isConnecting}
          >
            <Play className="w-4 h-4" />
            {isConnecting ? "Connecting..." : "Start Interview"}
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
