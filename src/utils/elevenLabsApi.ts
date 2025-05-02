
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
    // Get the conversation instance from the global variable
    const conversation = (window as any).__elevenLabsConversation;
    
    if (!conversation) {
      console.error('ElevenLabs conversation not initialized');
      toast({
        variant: "destructive",
        title: "ElevenLabs Initialization Error",
        description: "Voice AI system not properly initialized.",
      });
      return null;
    }

    console.log('Starting ElevenLabs conversation with agent:', options.agentId);
    
    // Start the session with the agent ID
    const conversationId = await conversation.startSession({
      agentId: options.agentId,
      overrides: options.overrides
    });
    
    console.log('ElevenLabs conversation started with ID:', conversationId);

    // Store the active conversation
    if (conversationId) {
      activeConversations[conversationId] = conversation;
      
      toast({
        title: "ElevenLabs Connected",
        description: "Voice AI system is now active",
      });
    }

    return conversationId;
  } catch (error) {
    console.error('Error starting ElevenLabs conversation:', error);
    toast({
      variant: "destructive",
      title: "ElevenLabs Error",
      description: error instanceof Error ? error.message : "Failed to start conversation.",
    });
    return null;
  }
};

export const endElevenLabsConversation = async (conversationId: string): Promise<boolean> => {
  try {
    if (activeConversations[conversationId]) {
      await activeConversations[conversationId].endSession();
      delete activeConversations[conversationId];
      console.log('ElevenLabs conversation ended:', conversationId);
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
      console.log(`ElevenLabs volume set to ${volume}`);
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
  INTERVIEWER: "n1pNc0aPoEIZdxIEhzRo", // Your interviewer agent ID
  THERAPIST: "tjrw9cS30IKwLlIlTYOO"    // Your therapist agent ID
};
