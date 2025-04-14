
import React from 'react';
import TourModal from './TourModal';
import TourTooltip from './TourTooltip';
import TourOverlay from './TourOverlay';
import { useTourGuide, TourStep } from '@/hooks/useTourGuide';

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
          onNext={nextStep}
          onPrev={prevStep}
          onClose={completeTour}
        />
      )}
    </>
  );
};

export default TourGuide;
