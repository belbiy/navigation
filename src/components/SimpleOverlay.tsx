import React, { useRef, useEffect, useState } from 'react';

interface SimpleOverlayProps {
  children: React.ReactNode;
  targetRef: React.RefObject<HTMLElement>; 
  isOpen: boolean;
  onClose: () => void;
  isNavigationCollapsed?: boolean; // Add a prop to indicate if navigation is collapsed
}

/**
 * A lightweight overlay component that positions itself next to a target element.
 * Includes behavior for closing when clicking outside or pressing escape.
 * Features a smooth fade animation for appearance and disappearance.
 */
export function SimpleOverlay({ 
  children, 
  targetRef, 
  isOpen, 
  onClose,
  isNavigationCollapsed = false // Default to false
}: SimpleOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ bottom: 0, left: 0 });
  const positionRef = useRef(position);
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle visibility with a slight delay for animation
  useEffect(() => {
    if (isOpen) {
      // When opening, position immediately but delay visibility for next frame
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // When closing, fade out first, then remove from DOM
      setIsVisible(false);
    }
  }, [isOpen]);
  
  // Update position when opening
  useEffect(() => {
    if (isOpen && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      
      // Position from the bottom of the screen, aligned with the right edge of the menu
      const extraOffset = isNavigationCollapsed ? 8 : 0;
      
      const newPosition = {
        bottom: window.innerHeight - targetRect.bottom,  // Position from bottom of screen
        left: targetRect.right + extraOffset  // Align with the right edge of the target + extra offset if collapsed
      };
      
      setPosition(newPosition);
      positionRef.current = newPosition;
    }
  }, [isOpen, targetRef, isNavigationCollapsed]);
  
  // Handle outside clicks and escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen && 
        overlayRef.current && 
        !overlayRef.current.contains(e.target as Node) &&
        targetRef.current && 
        !targetRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, targetRef, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        bottom: `${position.bottom}px`,
        left: `${position.left}px`,
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 200ms ease-out, transform 200ms ease-out',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))', // Add back the drop shadow
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Content wrapper */}
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1
        }}>
          {children}
        </div>
        
        {/* Arrow tip pointing to the menu item */}
        <div
          style={{
            position: 'absolute',
            left: '2px',
            bottom: '0',
            width: '16px',
            height: '16px',
            transform: 'translate(-50%, -12px) rotate(45deg)',
            backgroundColor: 'white',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

export default SimpleOverlay; 