import { useConversation } from '@11labs/react';
import { toast } from "@/components/ui/use-toast";

// Define Language type since we can't import it correctly
type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'pl' | 'hi' | 'ar' | 'ja' | 'zh' | 'nl';

// ElevenLabs API key
const ELEVENLABS_API_KEY = "sk_6e665da7f8815ceb8a0e9dcb3f728a60d1f4999d0e265060";

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
      language?: Language;
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
    // Create the conversation config
    const conversationConfig = {
      apiKey: ELEVENLABS_API_KEY,
      onConnect: () => {
        console.log('ElevenLabs conversation connected');
      },
      onDisconnect: () => {
        console.log('ElevenLabs conversation disconnected');
      },
      onMessage: (message: any) => {
        console.log('ElevenLabs message received:', message);
      },
      onError: (error: any) => {
        console.error('ElevenLabs conversation error:', error);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Failed to connect to ElevenLabs. Please try again.",
        });
      },
      overrides: options.overrides
    };

    // Initialize the conversation outside of React components
    // Note: useConversation is a hook, so we can't use it in a regular function
    // This is a workaround - in real implementations, use this inside a React component
    const conversation = (window as any).__elevenLabsConversation;
    
    if (!conversation) {
      console.error('ElevenLabs conversation not initialized');
      toast({
        variant: "destructive",
        title: "Initialization Error",
        description: "ElevenLabs conversation system not properly initialized.",
      });
      return null;
    }

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

// Agent IDs for different use cases
export const ELEVENLABS_AGENTS = {
  INTERVIEWER: "n1pNc0aPoEIZdxIEhzRo", // Your actual interviewer agent ID
  THERAPIST: "tjrw9cS30IKwLlIlTYOO"    // Your actual therapist agent ID
};
