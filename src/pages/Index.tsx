
import { useScroll } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import ThemeToggle from '../components/ThemeToggle';
import CursorFollower from '../components/CursorFollower';
import FloatingNav from '../components/FloatingNav';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import SkillsSection from '../components/sections/SkillsSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/sections/Footer';

const Index = () => {
  const { scrollYProgress } = useScroll();
  
  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];
  
  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <ParticleBackground />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Cursor Follower */}
      <CursorFollower />
      
      {/* Navigation */}
      <FloatingNav items={navItems} />
      
      {/* Hero Section */}
      <HeroSection scrollYProgress={scrollYProgress} />
      
      {/* About Section with 3D Models */}
      <AboutSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Experience Section */}
      <ExperienceSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
