
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const cleanupRef = useRef<(() => void) | null>(null);
  
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

  // Scroll to element and handle navigation between pages
  useEffect(() => {
    if (!tourActive || !currentStepData) return;
    
    // Clean up any previous tour step actions
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    
    const targetSelector = currentStepData.targetSelector;
    
    // Check if the target has a page route prefix (e.g., "/jobs:...")
    if (targetSelector.includes(':')) {
      const [pageRoute, elementSelector] = targetSelector.split(':');
      
      // Navigate to the page if needed
      navigate(pageRoute);
      
      // Wait for navigation and then find the element
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(elementSelector);
        if (element) {
          scrollToElement(element);
        }
      }, 500);
      
      cleanupRef.current = () => clearTimeout(timeoutId);
      return;
    }
    
    // If no page navigation, just scroll to the element
    const element = document.querySelector(targetSelector);
    if (element) {
      scrollToElement(element);
    }
    
  }, [tourActive, currentStepData, currentStep, navigate]);
  
  // Function to scroll to an element with smooth animation
  const scrollToElement = (element: Element) => {
    const rect = element.getBoundingClientRect();
    const isInViewport = 
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    
    if (!isInViewport) {
      // Calculate the ideal scroll position (slightly above the center)
      const scrollToY = 
        window.scrollY + 
        rect.top - 
        window.innerHeight / 3;
      
      window.scrollTo({
        top: Math.max(0, scrollToY),
        behavior: 'smooth'
      });
    }
    
    // Highlight the element with a brief pulse animation
    element.classList.add('tour-highlight-pulse');
    setTimeout(() => {
      element.classList.remove('tour-highlight-pulse');
    }, 1500);
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

  // Cleanup function for when tour ends
  useEffect(() => {
    if (!tourActive && cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
      
      // Add a slight delay before re-enabling pointer events
      // to ensure the transition completes
      document.body.classList.remove('tour-active'); 
    }
    
    if (tourActive) {
      document.body.classList.add('tour-active');
      
      // Add global styles for highlighting tour targets
      const styleEl = document.createElement('style');
      styleEl.innerHTML = `
        .tour-highlight-pulse {
          animation: tour-pulse 1.5s ease-in-out;
          z-index: 45;
          position: relative;
        }
        @keyframes tour-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          50% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0.4); }
        }
      `;
      document.head.appendChild(styleEl);
      
      cleanupRef.current = () => {
        document.head.removeChild(styleEl);
      };
    }
    
    return () => {
      // Ensure we clean up when component unmounts
      document.body.classList.remove('tour-active');
    };
  }, [tourActive]);

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
          targetSelector={currentStepData.targetSelector.includes(':') 
            ? currentStepData.targetSelector.split(':')[1] 
            : currentStepData.targetSelector}
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
