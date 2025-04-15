
import React, { useEffect } from 'react';
import TourModal from './TourModal';
import TourTooltip from './TourTooltip';
import TourOverlay from './TourOverlay';
import TourGuidePath from './TourGuidePath';
import { useTourGuide, TourStep } from '@/hooks/useTourGuide';
import { PartyPopper } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface TourGuideProps {
  steps: TourStep[];
  onComplete?: () => void;
  storageKey?: string;
}

const TourGuide = ({ steps, onComplete, storageKey = 'jobfinder_has_seen_tour' }: TourGuideProps) => {
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
  } = useTourGuide({ steps, onComplete, storageKey });

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

  // Add automatic scrolling to ensure the target element is visible
  useEffect(() => {
    if (tourActive && currentStepData) {
      const targetElement = document.querySelector(currentStepData.targetSelector) as HTMLElement;
      
      if (targetElement) {
        // Calculate element position
        const rect = targetElement.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        // If element is not fully in viewport, scroll to it
        if (!isInViewport) {
          const scrollOptions = {
            behavior: 'smooth' as ScrollBehavior,
            block: 'center' as ScrollLogicalPosition,
            inline: 'center' as ScrollLogicalPosition
          };
          
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            targetElement.scrollIntoView(scrollOptions);
          }, 300);
        }
      }
    }
  }, [tourActive, currentStep, currentStepData]);

  // Get previous step data for drawing the path
  const getPrevStepSelector = () => {
    if (currentStep > 1 && steps[currentStep - 2]) {
      return steps[currentStep - 2].targetSelector;
    }
    return '';
  };

  return (
    <>
      <TourModal 
        isOpen={showWelcomeModal} 
        onStartTour={startTour} 
        onSkipTour={skipTour} 
      />
      
      <TourOverlay visible={tourActive} />
      
      {/* Animated path between steps */}
      {tourActive && currentStep > 1 && (
        <TourGuidePath 
          sourceSelector={getPrevStepSelector()}
          targetSelector={currentStepData?.targetSelector || ''}
          active={tourActive && currentStep > 1}
        />
      )}
      
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
