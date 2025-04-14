
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourTooltipProps {
  targetSelector: string;
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const TourTooltip = ({
  targetSelector,
  title,
  description,
  position = 'bottom',
  step,
  totalSteps,
  onNext,
  onPrev,
  onClose
}: TourTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const positionTooltip = () => {
    const targetElement = document.querySelector(targetSelector) as HTMLElement;
    if (!targetElement || !tooltipRef.current) return;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    // Add highlight effect to the target element
    targetElement.style.position = 'relative';
    targetElement.style.zIndex = '60';
    targetElement.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5)';
    targetElement.style.borderRadius = '4px';
    
    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - 10;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.right + 10;
        break;
      case 'bottom':
        top = targetRect.bottom + 10;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.left - tooltipRect.width - 10;
        break;
    }

    // Make sure tooltip stays within viewport
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    
    if (top < 10) top = 10;
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = window.innerHeight - tooltipRect.height - 10;
    }

    setTooltipPosition({ top, left });
  };

  useEffect(() => {
    positionTooltip();
    
    // Reposition on window resize
    window.addEventListener('resize', positionTooltip);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', positionTooltip);
      
      // Remove highlight from all elements
      document.querySelectorAll('[style*="z-index: 60"]').forEach((el) => {
        (el as HTMLElement).style.boxShadow = '';
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.position = '';
        (el as HTMLElement).style.borderRadius = '';
      });
    };
  }, [targetSelector, position]);

  return (
    <div 
      ref={tooltipRef}
      className="fixed bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-blue-500/20 p-4 w-72 z-[100] animate-fade-in"
      style={{ 
        top: `${tooltipPosition.top}px`, 
        left: `${tooltipPosition.left}px` 
      }}
    >
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        aria-label="Close tour"
      >
        <X size={18} />
      </button>
      
      <div className="mb-1 text-xs font-medium text-blue-500">
        Step {step} of {totalSteps}
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPrev}
          disabled={step === 1}
          className={cn(step === 1 && "opacity-50 cursor-not-allowed")}
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        
        <Button 
          size="sm" 
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {step === totalSteps ? "Finish" : "Next"} 
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TourTooltip;
