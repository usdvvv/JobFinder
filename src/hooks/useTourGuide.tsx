
import { useState, useEffect } from 'react';

export interface TourStep {
  targetSelector: string;
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

interface UseTourGuideProps {
  steps: TourStep[];
  onComplete?: () => void;
}

export function useTourGuide({ steps, onComplete }: UseTourGuideProps) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tourActive, setTourActive] = useState(false);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem('jobfinder_has_seen_tour');
    
    if (!hasSeenTour) {
      // Delay showing the welcome modal to let the page load first
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => {
    setShowWelcomeModal(false);
    setCurrentStep(1);
    setTourActive(true);
  };

  const skipTour = () => {
    setShowWelcomeModal(false);
    localStorage.setItem('jobfinder_has_seen_tour', 'true');
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    setTourActive(false);
    localStorage.setItem('jobfinder_has_seen_tour', 'true');
    if (onComplete) onComplete();
  };

  const resetTour = () => {
    localStorage.removeItem('jobfinder_has_seen_tour');
    setShowWelcomeModal(true);
    setCurrentStep(0);
    setTourActive(false);
  };

  return {
    showWelcomeModal,
    tourActive,
    currentStep,
    currentStepData: steps[currentStep - 1],
    totalSteps: steps.length,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    completeTour,
    resetTour
  };
}
