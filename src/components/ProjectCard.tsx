
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github?: string;
}

const ProjectCard = ({ title, description, image, technologies, link, github }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring smoothing
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  // Transform values for rotation
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  
  // Handle mouse move on card
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (event.clientX - centerX) / rect.width;
    const normalizedY = (event.clientY - centerY) / rect.height;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };
  
  useEffect(() => {
    // Animate card entry
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      className="group relative w-full max-w-md mx-auto glass-card overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX: isHovered ? rotateX : "0deg",
        rotateY: isHovered ? rotateY : "0deg",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
    >
      {/* Project image with overlay */}
      <div className="relative h-60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <motion.img 
          src={image || "/placeholder.svg"} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            scale: isHovered ? 1.1 : 1,
          }}
        />
        
        {/* Technologies tags */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <motion.span 
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="px-2 py-1 text-xs rounded-full bg-primary/80 text-white backdrop-blur-sm"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-6 z-10">
        <h3 className="text-xl font-bold mb-2 text-gradient">{title}</h3>
        <p className="text-sm text-foreground/80 mb-4">{description}</p>
        
        {/* Project links */}
        <div className="flex gap-3">
          {/* View project button */}
          <motion.a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white transition-all duration-300 hover:bg-primary/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Demo</span>
            <ExternalLink className="ml-2 w-4 h-4" />
          </motion.a>
          
          {/* GitHub link */}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-white transition-all duration-300 hover:bg-secondary/80"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>GitHub</span>
              <Github className="ml-2 w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
      
      {/* 3D layered elements for depth */}
      <motion.div 
        className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-primary/10 z-0"
        style={{
          translateZ: "-40px",
          scale: isHovered ? 1.2 : 1,
        }}
      />
      <motion.div 
        className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/5 z-0"
        style={{
          translateZ: "-20px",
          scale: isHovered ? 1.2 : 1,
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
