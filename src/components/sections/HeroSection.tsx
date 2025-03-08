
import { useRef, useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

interface HeroSectionProps {
  scrollYProgress: any;
}

const HeroSection = ({ scrollYProgress }: HeroSectionProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  
  const subtitles = [
    "Building Secure & Scalable Backend Solutions",
    "Optimizing Performance, Security & Architecture",
    "Bridging Blockchain, AI, and Cybersecurity"
  ];
  
  // Subtitle rotation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [subtitles.length]);
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Header text reveal animation
  useEffect(() => {
    if (headerRef.current) {
      const title = headerRef.current.querySelector('h1');
      const subtitle = headerRef.current.querySelector('p');
      const cta = headerRef.current.querySelector('button');
      
      if (title && subtitle && cta) {
        gsap.fromTo(
          title,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
        
        gsap.fromTo(
          subtitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
        
        gsap.fromTo(
          cta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
        );
      }
    }
  }, []);
  
  // Scroll to next section
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <motion.div 
        ref={headerRef} 
        className="text-center max-w-3xl mx-auto"
        style={{ y, opacity }}
      >
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
          Backend Developer | Cybersecurity Enthusiast | Blockchain Innovator
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
          Secure Backend Solutions
        </h1>
        <motion.p 
          key={subtitleIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl text-foreground/80 mb-8 h-8"
        >
          {subtitles[subtitleIndex]}
        </motion.p>
        <motion.button
          onClick={scrollToNextSection}
          className="px-6 py-3 rounded-lg bg-primary text-white font-medium transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work
        </motion.button>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center p-1">
          <div className="w-1 h-2 bg-foreground/50 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
