
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Interviewer3DAvatar from './Interviewer3DAvatar';
import { HeartPulse, Thermometer, Bed, Clock, RectangleHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIInterviewerProps {
  jobDescription?: string;
  industry?: string;
  difficulty?: string;
}

const AIInterviewer = ({ 
  jobDescription, 
  industry = 'Tech', 
  difficulty = 'Mid-level'
}: AIInterviewerProps) => {
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWellnessData, setShowWellnessData] = useState(true);
  const { toast } = useToast();

  const startInterview = () => {
    setIsInterviewing(true);
    setShowWellnessData(true);
    
    toast({
      title: "Interview Started",
      description: "Your wellness data is now being monitored during the interview.",
    });
  };
  
  const stopInterview = () => {
    setIsInterviewing(false);
    setIsSpeaking(false);
    
    toast({
      title: "Interview Ended",
      description: "Your interview session has been completed.",
    });
  };
  
  // Fixed wellness data as requested
  const wellnessData = {
    heartRate: 120,
    stressLevel: 'High',
    sleepHours: 4,
    mood: 'Stressed'
  };

  const interviewTips = [
    "Research the company thoroughly before the interview",
    "Prepare answers for common questions in the industry",
    "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
    "Maintain good eye contact and positive body language",
    "Have questions prepared to ask the interviewer",
    "Practice technical questions relevant to the role",
    "Follow up with a thank you email after the interview"
  ];

  return (
    <div className="relative w-full space-y-6">
      <div className="relative flex justify-center">
        <Interviewer3DAvatar 
          speaking={isSpeaking} 
          size={320} 
          showWellnessData={showWellnessData} 
        />
      </div>
      
      {showWellnessData && (
        <Card className="bg-gradient-to-br from-purple-900/70 to-blue-950/80 backdrop-blur-lg border border-white/10 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-8 items-center justify-between">
              <div>
                <div className="text-xs text-gray-300">Heart Rate</div>
                <div className="font-bold text-2xl text-white flex items-center gap-2">
                  {wellnessData.heartRate} <HeartPulse className="h-4 w-4 text-red-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300">Stress Level</div>
                <div className="font-medium text-white flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  {wellnessData.stressLevel}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300">Average Sleep</div>
                <div className="text-white font-semibold flex items-center gap-1">
                  {wellnessData.sleepHours} hrs <Bed className="h-4 w-4 text-blue-400" />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300">Current Mood</div>
                <div className="text-white font-semibold flex items-center gap-1">
                  {wellnessData.mood} <Clock className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="border rounded-lg shadow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <RectangleHorizontal className="h-5 w-5 text-primary" /> Interview Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1.5">
            {interviewTips.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground">{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        {!isInterviewing ? (
          <Button 
            onClick={startInterview} 
            className="px-4 gap-2"
          >
            Start Interview
          </Button>
        ) : (
          <Button 
            onClick={stopInterview}
            variant="destructive"
            className="px-4 gap-2"
          >
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIInterviewer;
