
import React, { useEffect } from 'react';
import TourModal from './TourModal';
import TourTooltip from './TourTooltip';
import TourOverlay from './TourOverlay';
import { useTourGuide, TourStep } from '@/hooks/useTourGuide';
import { PartyPopper } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TourGuideProps {
  steps: TourStep[];
  onComplete?: () => void;
}

const TourGuide = ({ steps, onComplete }: TourGuideProps) => {
  const {
    showWelcomeModal,
    tourActive,
    currentStep,
    currentStepData,
    totalSteps,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    completeTour
  } = useTourGuide({ steps, onComplete });

  // Show congratulations on completing the tour
  const handleCompleteTour = () => {
    completeTour();
    
    // Show success toast with party popper icon
    toast({
      title: "Tour Completed! 🎉",
      description: "You're all set to explore JobFinder. Need help anytime? Just click the tour guide button.",
      variant: "default",
      children: <PartyPopper className="h-5 w-5 text-green-500" />,
    });
  };

  // Add keyboard navigation
  useEffect(() => {
    if (!tourActive) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        completeTour();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tourActive, completeTour, nextStep, prevStep]);

  return (
    <>
      <TourModal 
        isOpen={showWelcomeModal} 
        onStartTour={startTour} 
        onSkipTour={skipTour} 
      />
      
      <TourOverlay visible={tourActive} />
      
      {tourActive && currentStepData && (
        <TourTooltip
          targetSelector={currentStepData.targetSelector}
          title={currentStepData.title}
          description={currentStepData.description}
          position={currentStepData.position}
          step={currentStep}
          totalSteps={totalSteps}
          onNext={currentStep === totalSteps ? handleCompleteTour : nextStep}
          onPrev={prevStep}
          onClose={completeTour}
        />
      )}
    </>
  );
};

export default TourGuide;
