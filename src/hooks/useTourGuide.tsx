
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
  storageKey?: string;
}

export function useTourGuide({ steps, onComplete, storageKey = 'jobfinder_has_seen_tour' }: UseTourGuideProps) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tourActive, setTourActive] = useState(false);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem(storageKey);
    
    if (!hasSeenTour) {
      // Delay showing the welcome modal to let the page load first
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const startTour = () => {
    setShowWelcomeModal(false);
    setCurrentStep(1);
    setTourActive(true);
    // Ensure normal scrolling is maintained
    document.body.style.overflow = 'auto';
  };

  const skipTour = () => {
    setShowWelcomeModal(false);
    setTourActive(false);
    localStorage.setItem(storageKey, 'true');
    // Reset any highlighted elements
    document.querySelectorAll('[style*="z-index: 60"]').forEach((el) => {
      (el as HTMLElement).style.boxShadow = '';
      (el as HTMLElement).style.zIndex = '';
      (el as HTMLElement).style.position = '';
      (el as HTMLElement).style.borderRadius = '';
    });
    // Ensure normal scrolling is maintained
    document.body.style.overflow = 'auto';
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
    localStorage.setItem(storageKey, 'true');
    // Reset any highlighted elements
    document.querySelectorAll('[style*="z-index: 60"]').forEach((el) => {
      (el as HTMLElement).style.boxShadow = '';
      (el as HTMLElement).style.zIndex = '';
      (el as HTMLElement).style.position = '';
      (el as HTMLElement).style.borderRadius = '';
    });
    if (onComplete) onComplete();
    // Ensure normal scrolling is maintained
    document.body.style.overflow = 'auto';
  };

  const resetTour = () => {
    localStorage.removeItem(storageKey);
    setShowWelcomeModal(true);
    setCurrentStep(0);
    setTourActive(false);
    // Ensure normal scrolling is maintained
    document.body.style.overflow = 'auto';
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
