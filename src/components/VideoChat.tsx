
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, Phone } from 'lucide-react';
import Interviewer3DAvatar from './Interviewer3DAvatar';

interface VideoChatProps {
  onClose: () => void;
}

const VideoChat = ({ onClose }: VideoChatProps) => {
  const [userVideoActive, setUserVideoActive] = useState(false);
  const [userAudioActive, setUserAudioActive] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const userMediaStream = useRef<MediaStream | null>(null);

  // Handle user camera toggle
  const toggleUserVideo = async () => {
    try {
      if (userVideoActive) {
        // Turn off camera
        if (userMediaStream.current) {
          userMediaStream.current.getVideoTracks().forEach(track => track.stop());
        }
        setUserVideoActive(false);
      } else {
        // Turn on camera
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: userAudioActive 
        });
        
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
        
        userMediaStream.current = stream;
        setUserVideoActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Handle user microphone toggle
  const toggleUserAudio = async () => {
    try {
      if (userAudioActive) {
        // Turn off microphone
        if (userMediaStream.current) {
          userMediaStream.current.getAudioTracks().forEach(track => track.stop());
        }
        setUserAudioActive(false);
      } else {
        // Turn on microphone
        const hasVideo = userVideoActive && userMediaStream.current?.getVideoTracks().length > 0;
        
        const constraints = {
          audio: true,
          video: hasVideo
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (userVideoRef.current && hasVideo) {
          // If video was already active, we need to combine the streams
          const combinedStream = new MediaStream();
          
          // Add existing video tracks if they exist
          if (userMediaStream.current) {
            userMediaStream.current.getVideoTracks().forEach(track => 
              combinedStream.addTrack(track)
            );
          }
          
          // Add new audio tracks
          stream.getAudioTracks().forEach(track => 
            combinedStream.addTrack(track)
          );
          
          userVideoRef.current.srcObject = combinedStream;
          userMediaStream.current = combinedStream;
        } else {
          userMediaStream.current = stream;
        }
        
        setUserAudioActive(true);
        
        // Simulate assistant speaking when user talks
        setTimeout(() => {
          setAssistantSpeaking(true);
          setTimeout(() => setAssistantSpeaking(false), 5000);
        }, 1000);
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  // Cleanup function to stop all media tracks on component unmount
  useEffect(() => {
    return () => {
      if (userMediaStream.current) {
        userMediaStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle the end call action
  const endCall = () => {
    if (userMediaStream.current) {
      userMediaStream.current.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* AI Assistant Video Feed */}
      <Card className="relative overflow-hidden flex items-center justify-center bg-gray-900 h-full">
        <Interviewer3DAvatar speaking={assistantSpeaking} showWellnessData={false} />
        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1.5 rounded-full text-white text-xs">
          AI Assistant
        </div>
      </Card>
      
      {/* User Video Feed */}
      <Card className="relative overflow-hidden flex items-center justify-center bg-gray-900 h-full">
        {userVideoActive ? (
          <video 
            ref={userVideoRef}
            autoPlay 
            muted 
            className="min-h-full min-w-full object-cover" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/70">
            <VideoOff size={48} className="mb-2" />
            <p>Your camera is off</p>
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1.5 rounded-full text-white text-xs">
          You
        </div>
      </Card>
      
      {/* Controls */}
      <div className="col-span-2 flex justify-center space-x-4 py-4">
        <Button 
          size="icon" 
          variant={userVideoActive ? "default" : "outline"}
          onClick={toggleUserVideo}
          className="h-12 w-12 rounded-full"
        >
          {userVideoActive ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          size="icon" 
          variant={userAudioActive ? "default" : "outline"}
          onClick={toggleUserAudio}
          className="h-12 w-12 rounded-full"
        >
          {userAudioActive ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        
        <Button 
          size="icon" 
          variant="destructive"
          onClick={endCall}
          className="h-12 w-12 rounded-full"
        >
          <Phone className="h-5 w-5 rotate-135" />
        </Button>
      </div>
    </div>
  );
};

export default VideoChat;
