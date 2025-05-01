
import React, { ReactNode } from 'react';
import { ElevenLabsProvider } from '@11labs/react';

interface Props {
  children: ReactNode;
}

const ElevenLabsApiProvider = ({ children }: Props) => {
  // The API key is being used in the elevenLabsApi.ts file directly
  // This is a wrapper component for future extension if needed
  return (
    <ElevenLabsProvider apiKey="sk_6e665da7f8815ceb8a0e9dcb3f728a60d1f4999d0e265060">
      {children}
    </ElevenLabsProvider>
  );
};

export default ElevenLabsApiProvider;
