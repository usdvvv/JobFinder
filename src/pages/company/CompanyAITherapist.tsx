
import { useState } from 'react';
import CompanyNavBar from "@/components/company/CompanyNavBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, Send, HeartPulse, Clock, Calendar, BarChart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';

const CompanyAITherapist = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! I'm Dr. Emma, your company's AI therapist. Everything discussed here is confidential. How can I support you or your team today?" 
    }
  ]);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // Add user message
    setChatMessages(prev => [...prev, { role: "user", content: message }]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let response = "";
      
      if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("overwhelmed")) {
        response = "It sounds like you're dealing with significant workplace stress. This is common, especially in high-pressure environments. Have you tried implementing any stress management techniques with your team? Even small breaks, mindfulness sessions, or walking meetings can help reduce overall stress levels.";
      } else if (message.toLowerCase().includes("team") || message.toLowerCase().includes("employees")) {
        response = "Supporting your team's mental health is crucial for both their wellbeing and productivity. Consider implementing regular check-ins, creating psychological safety, and providing resources like this service. Would you like some specific strategies for promoting team wellness?";
      } else if (message.toLowerCase().includes("burnout")) {
        response = "Burnout is a serious concern in many organizations. As a leader, it's important to watch for signs like decreased productivity, increased cynicism, or emotional exhaustion in your team. Would you like to discuss strategies to prevent burnout and foster a healthier work environment?";
      } else {
        response = "Thank you for sharing that. As a company leader, balancing business needs with employee wellbeing can be challenging. How specifically can I help support you and your team's mental health needs today?";
      }
      
      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
    
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Company AI Therapist
            </h1>
            <p className="text-gray-300 mt-2">
              Confidential mental health support for your team's wellbeing
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-in-right">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-white">
                    <HeartPulse className="mr-2 h-5 w-5 text-red-500" />
                    Company Wellness
                  </CardTitle>
                  <CardDescription className="text-gray-300">Tools and resources for your team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" onClick={() => navigate('/company/dashboard')}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30">
                    <HeartPulse className="mr-2 h-4 w-4" />
                    AI Therapist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" onClick={() => navigate('/company/peer-chat')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Peer Chat
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" onClick={() => navigate('/company/entertainment')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Entertainment
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10" disabled>
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                    <Badge variant="outline" className="ml-auto text-gray-400 border-gray-600">Soon</Badge>
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-white">How to Use This Service</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-2 list-disc list-inside text-gray-300">
                    <li>Completely confidential and private</li>
                    <li>Ask about team mental health strategies</li>
                    <li>Get leadership wellness support</li>
                    <li>Learn how to spot burnout in your team</li>
                    <li>Discover wellness programs to implement</li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3 border-b border-gray-700">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-red-900 text-red-200">ET</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white">Dr. Emma Thompson</CardTitle>
                    <CardDescription className="text-gray-300">AI Therapist | Workplace Wellness Expert</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-800 text-gray-200"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-3 border-t border-gray-700">
                <div className="flex items-center w-full space-x-2">
                  <Textarea 
                    placeholder="Type a message to the AI therapist..." 
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAITherapist;
