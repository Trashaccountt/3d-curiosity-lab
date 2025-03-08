
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Show cursor after a short delay when mouse enters the window
    const handleMouseEnter = () => {
      setTimeout(() => setIsVisible(true), 100);
    };
    
    // Hide cursor when mouse leaves the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Handle hover effects over interactive elements
  useEffect(() => {
    const handleInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      
      const onElementEnter = () => {
        if (followerRef.current) {
          followerRef.current.classList.add('scale-150');
          followerRef.current.classList.add('opacity-30');
        }
      };
      
      const onElementLeave = () => {
        if (followerRef.current) {
          followerRef.current.classList.remove('scale-150');
          followerRef.current.classList.remove('opacity-30');
        }
      };
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', onElementEnter);
        element.addEventListener('mouseleave', onElementLeave);
      });
      
      return () => {
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', onElementEnter);
          element.removeEventListener('mouseleave', onElementLeave);
        });
      };
    };
    
    return handleInteractiveElements();
  }, []);
  
  return (
    <motion.div
      ref={followerRef}
      className="cursor-follower pointer-events-none fixed z-50 transition-transform duration-300 ease-out"
      style={{
        left: mousePosition.x - 100,
        top: mousePosition.y - 100,
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        opacity: isVisible ? 0.5 : 0,
        mixBlendMode: 'lighten',
      }}
      animate={{
        x: mousePosition.x - 100,
        y: mousePosition.y - 100,
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  );
};

export default CursorFollower;
