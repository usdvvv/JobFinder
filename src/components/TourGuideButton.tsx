
import React from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TourGuideButtonProps {
  onStartTour: () => void;
}

const TourGuideButton = ({ onStartTour }: TourGuideButtonProps) => {
  const handleClick = () => {
    onStartTour();
    toast({
      title: "Tour Guide Activated",
      description: "Let's explore JobFinder's features together!",
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg border border-blue-200 dark:border-blue-800"
      onClick={handleClick}
      aria-label="Start tour guide"
    >
      <HelpCircle className="h-6 w-6 text-blue-500" />
    </Button>
  );
};

export default TourGuideButton;
