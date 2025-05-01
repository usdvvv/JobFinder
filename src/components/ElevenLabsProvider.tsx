
import React, { ReactNode, useEffect, useState } from 'react';
import { useElevenLabsConversation } from '@/hooks/useElevenLabsConversation';
import { toast } from '@/components/ui/use-toast';

interface Props {
  children: ReactNode;
}

const ElevenLabsApiProvider = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize with API key - consider moving this to an environment variable in production
  const { isReady } = useElevenLabsConversation("sk_6e665da7f8815ceb8a0e9dcb3f728a60d1f4999d0e265060");
  
  useEffect(() => {
    if (isReady && !isInitialized) {
      setIsInitialized(true);
      console.log("ElevenLabs conversation system initialized successfully");
    }
  }, [isReady, isInitialized]);

  return <>{children}</>;
};

export default ElevenLabsApiProvider;
