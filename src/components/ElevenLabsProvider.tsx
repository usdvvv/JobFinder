
import React, { ReactNode } from 'react';
import { ConversationProvider } from '@11labs/react';

interface Props {
  children: ReactNode;
}

const ElevenLabsApiProvider = ({ children }: Props) => {
  return (
    <ConversationProvider apiKey="sk_6e665da7f8815ceb8a0e9dcb3f728a60d1f4999d0e265060">
      {children}
    </ConversationProvider>
  );
};

export default ElevenLabsApiProvider;
