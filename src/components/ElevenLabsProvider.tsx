
import React, { ReactNode, useEffect } from 'react';
import { useElevenLabsConversation } from '@/hooks/useElevenLabsConversation';

interface Props {
  children: ReactNode;
}

const ElevenLabsApiProvider = ({ children }: Props) => {
  // Initialize the ElevenLabs conversation with the API key
  const { isReady } = useElevenLabsConversation("sk_6e665da7f8815ceb8a0e9dcb3f728a60d1f4999d0e265060");
  
  // Simply render children - we're using the conversation through the global variable
  return <>{children}</>;
};

export default ElevenLabsApiProvider;
