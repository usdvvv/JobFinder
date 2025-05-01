
import { useEffect, useState } from 'react';
import { useConversation } from '@11labs/react';

export const useElevenLabsConversation = (apiKey: string) => {
  const [isReady, setIsReady] = useState(false);
  
  // Initialize the conversation with the API key
  const conversation = useConversation({
    apiKey,
    onConnect: () => {
      console.log('ElevenLabs conversation connected');
      setIsReady(true);
    },
    onDisconnect: () => {
      console.log('ElevenLabs conversation disconnected');
    },
    onMessage: (message) => {
      console.log('ElevenLabs message received:', message);
    },
    onError: (error) => {
      console.error('ElevenLabs conversation error:', error);
      setIsReady(false);
    }
  });

  // Store the conversation in a global variable for use outside of React components
  useEffect(() => {
    if (conversation) {
      (window as any).__elevenLabsConversation = conversation;
      
      // Debug check to verify the conversation object
      console.log("ElevenLabs conversation object initialized:", Boolean((window as any).__elevenLabsConversation));
    }
    
    return () => {
      // Clean up if needed
      if ((window as any).__elevenLabsConversation) {
        console.log("Cleaning up ElevenLabs conversation");
        (window as any).__elevenLabsConversation = null;
      }
    };
  }, [conversation]);

  return { conversation, isReady };
};
