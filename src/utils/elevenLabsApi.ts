
import { useConversation } from '@11labs/react';
import { toast } from "@/components/ui/use-toast";

// Store active conversation instances
let activeConversations: Record<string, any> = {};

interface StartConversationOptions {
  agentId: string;
  overrides?: {
    agent?: {
      prompt?: {
        prompt?: string;
      };
      firstMessage?: string;
      language?: string;
    };
    tts?: {
      voiceId?: string;
    };
  };
}

export const startElevenLabsConversation = async (
  options: StartConversationOptions
): Promise<string | null> => {
  try {
    const conversation = useConversation({
      onConnect: () => {
        console.log('ElevenLabs conversation connected');
      },
      onDisconnect: () => {
        console.log('ElevenLabs conversation disconnected');
      },
      onMessage: (message) => {
        console.log('ElevenLabs message received:', message);
      },
      onError: (error) => {
        console.error('ElevenLabs conversation error:', error);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Failed to connect to ElevenLabs. Please try again.",
        });
      },
      overrides: options.overrides
    });

    // Start the session with the agent ID
    const conversationId = await conversation.startSession({
      agentId: options.agentId
    });

    // Store the active conversation
    if (conversationId) {
      activeConversations[conversationId] = conversation;
    }

    return conversationId;
  } catch (error) {
    console.error('Error starting ElevenLabs conversation:', error);
    toast({
      variant: "destructive",
      title: "Conversation Error",
      description: error instanceof Error ? error.message : "Failed to start conversation",
    });
    return null;
  }
};

export const endElevenLabsConversation = async (conversationId: string): Promise<boolean> => {
  try {
    if (activeConversations[conversationId]) {
      await activeConversations[conversationId].endSession();
      delete activeConversations[conversationId];
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error ending ElevenLabs conversation:', error);
    return false;
  }
};

export const setElevenLabsVolume = async (conversationId: string, volume: number): Promise<boolean> => {
  try {
    if (activeConversations[conversationId]) {
      await activeConversations[conversationId].setVolume({ volume });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error setting ElevenLabs volume:', error);
    return false;
  }
};

export const getElevenLabsStatus = (conversationId: string): 'connected' | 'disconnected' => {
  if (!activeConversations[conversationId]) return 'disconnected';
  return activeConversations[conversationId].status;
};

export const isElevenLabsSpeaking = (conversationId: string): boolean => {
  if (!activeConversations[conversationId]) return false;
  return activeConversations[conversationId].isSpeaking;
};

// Agent IDs for different use cases (these would be replaced with actual ElevenLabs agent IDs)
export const ELEVENLABS_AGENTS = {
  INTERVIEWER: "interview-agent-id", // Replace with actual agent ID
  THERAPIST: "therapist-agent-id"    // Replace with actual agent ID
};
