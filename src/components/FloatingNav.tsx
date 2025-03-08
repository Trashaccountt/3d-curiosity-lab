
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  items: NavItem[];
}

const FloatingNav = ({ items }: FloatingNavProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navControls = useAnimation();
  
  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 200; // Offset for better detection
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveIndex(index);
          updateIndicator(index);
        }
      });
    };
    
    // Update nav position on scroll
    const updateNavPosition = () => {
      const scrollPosition = window.scrollY;
      
      if (navRef.current) {
        const opacity = Math.min(1, scrollPosition / 500);
        navRef.current.style.opacity = (0.2 + opacity).toString();
        
        // Translate Y based on scroll (subtle parallax)
        navRef.current.style.transform = `translateY(${scrollPosition * 0.03}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateNavPosition);
    
    // Initial animation
    gsap.fromTo(
      navRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 0.8, duration: 1, ease: "power2.out", delay: 0.5 }
    );
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateNavPosition);
    };
  }, []);
  
  // Update indicator position
  const updateIndicator = (index: number) => {
    if (!navRef.current || !indicatorRef.current) return;
    
    const navItems = navRef.current.querySelectorAll('a');
    const activeItem = navItems[index];
    
    if (activeItem) {
      const activeItemBounds = activeItem.getBoundingClientRect();
      const navBounds = navRef.current.getBoundingClientRect();
      const offsetTop = activeItemBounds.top - navBounds.top;
      
      gsap.to(indicatorRef.current, {
        top: offsetTop,
        height: activeItemBounds.height,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  
  // Scroll to section on click
  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      window.scrollTo({
        top: sections[index].offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <motion.div
      ref={navRef}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
      initial={{ opacity: 0, x: -50 }}
      animate={navControls}
    >
      <div className="glass py-4 px-3 rounded-full relative">
        {/* Active indicator */}
        <div 
          ref={indicatorRef} 
          className="absolute left-0 w-full px-3 pointer-events-none"
        >
          <div className="bg-primary/20 backdrop-blur-sm w-full rounded-full absolute left-0"></div>
        </div>
        
        {/* Nav items */}
        <nav className="flex flex-col gap-4">
          {items.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                activeIndex === index ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(index);
                setActiveIndex(index);
              }}
            >
              {item.icon || <span className="text-sm font-medium">{index + 1}</span>}
              
              {/* Label tooltip */}
              <span className="absolute left-full ml-4 px-3 py-1 rounded-md text-sm font-medium origin-left transition-all duration-200 opacity-0 -translate-x-2 pointer-events-none bg-card/80 backdrop-blur-sm group-hover:opacity-100 group-hover:translate-x-0">
                {item.label}
              </span>
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default FloatingNav;
