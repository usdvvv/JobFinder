
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MicIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Interviewer3DAvatar from './Interviewer3DAvatar';
import WellnessUserOverview from './WellnessUserOverview';
import ElevenLabsConversation from './ElevenLabsConversation';

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
  const [showWellnessData, setShowWellnessData] = useState(false);
  const { toast } = useToast();

  console.log("AIInterviewer initialized with agentId:", agentId);

  // Prepare custom prompt based on job description and industry
  const customPrompt = `You are an AI interviewer for a ${industry} position. 
This is a ${difficulty} interview. 
${jobDescription ? "The job description is: " + jobDescription : ""}
Ask relevant interview questions for this position.
Keep responses concise, professional, and encouraging.
Evaluate the candidate's responses thoughtfully.`;

  // Handle messages from ElevenLabsConversation
  const handleMessage = (role: 'ai' | 'user', message: string) => {
    console.log(`Received ${role} message:`, message);
    if (role === 'user') {
      // Clear the transcript when we receive final user message
      setTranscript('');
      setConversation(prev => [...prev, { role, message }]);
    } else {
      // For AI messages
      setConversation(prev => [...prev, { role, message }]);
    }
  };

  // Handle conversation status changes
  const handleStatusChange = (isActive: boolean, isTalking: boolean) => {
    console.log(`Conversation status: active=${isActive}, talking=${isTalking}`);
    setIsInterviewing(isActive);
    setIsSpeaking(isTalking);
    
    if (isActive) {
      setShowWellnessData(true);
    } else {
      setShowWellnessData(false);
    }
  };

  return (
    <div className="relative w-full space-y-6">
      <div className="relative flex justify-center">
        <Interviewer3DAvatar 
          speaking={isSpeaking} 
          size={320} 
          showWellnessData={showWellnessData} 
        />
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
        <ElevenLabsConversation
          agentId={agentId}
          initialPrompt={customPrompt}
          onMessage={handleMessage}
          onStatusChange={handleStatusChange}
        />
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
