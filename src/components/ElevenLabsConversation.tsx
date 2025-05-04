
import { useState, useEffect, useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from "@/components/ui/button";
import { Play, StopCircle, Volume2, VolumeX, MicIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import type { Role } from '@11labs/react';

// Set the Eleven Labs API key globally
if (typeof window !== 'undefined') {
  window.localStorage.setItem('elevenlabs_api_key', 'sk_26512dca0f90c9ed2b98f24f1424dab7fef26b8a56fdd969');
}

interface ElevenLabsConversationProps {
  agentId: string;
  initialPrompt?: string;
  onMessage?: (role: 'ai' | 'user', message: string) => void;
  onStatusChange?: (isActive: boolean, isSpeaking: boolean) => void;
}

const ElevenLabsConversation = ({ 
  agentId,
  initialPrompt,
  onMessage,
  onStatusChange
}: ElevenLabsConversationProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  console.log("ElevenLabsConversation initialized with agentId:", agentId);

  // Initialize the conversation with Eleven Labs
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to Eleven Labs");
      setIsActive(true);
      setIsStarting(false);
      if (onStatusChange) onStatusChange(true, false);
      
      toast({
        title: "Connected",
        description: "You can now speak with the AI interviewer.",
      });
      
      // Set volume after connection is established - important!
      setTimeout(() => {
        conversation.setVolume({ volume: isMuted ? 0 : 1 });
        console.log("Initial volume set:", isMuted ? 0 : 1);
      }, 500);
    },
    onDisconnect: () => {
      console.log("Disconnected from Eleven Labs");
      setIsActive(false);
      setIsStarting(false);
      if (onStatusChange) onStatusChange(false, false);
      
      if (isActive) {
        toast({
          title: "Disconnected",
          description: "The interview has ended.",
        });
      }
    },
    onMessage: (props: { message: string; source: Role }) => {
      console.log("Message from Eleven Labs:", props);
      
      try {
        const messageData = JSON.parse(props.message);
        
        // Handle AI messages
        if (messageData.type === 'conversation.item.created' && 
            messageData.item?.type === 'message' && 
            messageData.item?.role === 'assistant') {
          const content = messageData.item.content?.find((c: any) => c.type === 'text')?.text || '';
          if (content && onMessage) {
            onMessage('ai', content);
          }
        } 
        // Handle AI speaking status
        else if (messageData.type === 'response.audio.delta') {
          if (onStatusChange) onStatusChange(true, true);
          console.log("AI is speaking...");
        } 
        // Handle AI stopped speaking
        else if (messageData.type === 'response.audio.done') {
          if (onStatusChange) onStatusChange(true, false);
          console.log("AI stopped speaking");
        }
        // Handle transcript from user's audio
        else if (messageData.type === 'input_audio_transcript.delta') {
          // Handle partial transcript if needed
        }
        // Handle when transcript is finalized
        else if (messageData.type === 'conversation.item.created' && 
                messageData.item?.type === 'message' && 
                messageData.item?.role === 'user') {
          const content = messageData.item.content?.find((c: any) => c.type === 'text')?.text || '';
          if (content && onMessage) {
            onMessage('user', content);
          }
        }
      } catch (error) {
        // Handle plain text messages
        const sourceStr = String(props.source).toLowerCase();
        
        if (sourceStr.includes('assistant') && onMessage) {
          onMessage('ai', props.message);
        } else if (sourceStr.includes('user') && onMessage) {
          onMessage('user', props.message);
        }
        
        console.log("Message parsing failed, handled as plain text:", error);
      }
    },
    onError: (error) => {
      console.error("Eleven Labs Error:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "There was an error connecting to the interview service.",
      });
      setIsActive(false);
      setIsStarting(false);
      if (onStatusChange) onStatusChange(false, false);
    }
  });

  // Check for microphone permission when component mounts
  useEffect(() => {
    async function checkMicPermission() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasMicrophone = devices.some(device => device.kind === 'audioinput');
        
        if (hasMicrophone) {
          try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicPermission(true);
            console.log("Microphone permission granted");
          } catch (error) {
            setMicPermission(false);
            console.error("Microphone permission denied:", error);
          }
        } else {
          setMicPermission(false);
          console.error("No microphone found");
        }
      } catch (error) {
        console.error("Error checking microphone:", error);
        setMicPermission(false);
      }
    }
    
    checkMicPermission();
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isActive) {
        console.log("Component unmounting, ending conversation");
        conversation.endSession().catch(console.error);
      }
    };
  }, [conversation, isActive]);

  // Start the conversation
  const startConversation = useCallback(async () => {
    try {
      setIsStarting(true);
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
      
      console.log("Starting conversation with agent ID:", agentId);
      console.log("Initial prompt:", initialPrompt);
      
      // Start the conversation session
      await conversation.startSession({
        agentId,
        overrides: initialPrompt ? {
          agent: {
            prompt: {
              prompt: initialPrompt
            }
          },
          // Explicitly set output audio parameters
          tts: {
            voiceId: "21m00Tcm4TlvDq8ikWAM" // Using a specific voice
          }
        } : undefined
      });
      
      console.log("Conversation started successfully");
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsStarting(false);
      
      // Show appropriate error message based on error type
      if ((error as Error).name === 'NotAllowedError') {
        toast({
          variant: "destructive",
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use the interview feature.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Please check your microphone and try again.",
        });
      }
    }
  }, [conversation, agentId, initialPrompt, toast]);

  // Stop the conversation
  const stopConversation = useCallback(async () => {
    try {
      console.log("Stopping conversation");
      await conversation.endSession();
      toast({
        title: "Disconnected",
        description: "The conversation has ended.",
      });
    } catch (error) {
      console.error("Error ending conversation:", error);
    }
  }, [conversation, toast]);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (isActive) {
      conversation.setVolume({ volume: newMutedState ? 0 : 1 });
      console.log("Volume set to:", newMutedState ? 0 : 1);
    }
  }, [isMuted, conversation, isActive]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {!isActive ? (
          <Button 
            onClick={startConversation} 
            className="px-4 gap-2"
            disabled={isStarting || micPermission === false}
          >
            {isStarting ? (
              <>
                <span className="animate-spin mr-1">⏳</span>
                Connecting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Conversation
              </>
            )}
          </Button>
        ) : (
          <Button 
            onClick={stopConversation}
            variant="destructive"
            className="px-4 gap-2"
          >
            <StopCircle className="w-4 h-4" />
            End Conversation
          </Button>
        )}
        
        {isActive && (
          <Button 
            onClick={toggleMute} 
            variant="outline"
            className="px-4"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        {micPermission === false && (
          <div className="text-destructive flex items-center gap-1 mb-2">
            <MicIcon className="w-3 h-3" />
            <span>Microphone access required</span>
          </div>
        )}
        {isActive ? "Connection active" : "Not connected"}
      </div>
    </div>
  );
};

export default ElevenLabsConversation;
