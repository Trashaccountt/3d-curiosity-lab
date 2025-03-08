
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleBackground from '../components/ParticleBackground';
import ThreeCharacters from '../components/ScientistModel';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import FloatingNav from '../components/FloatingNav';
import ThemeToggle from '../components/ThemeToggle';
import CursorFollower from '../components/CursorFollower';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];
  
  // Project data
  const projects = [
    {
      title: 'Interactive Data Visualization',
      description: 'A dashboard for visualizing complex data sets with interactive 3D charts and real-time updates.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
      technologies: ['React', 'Three.js', 'D3.js'],
      link: '#',
    },
    {
      title: 'AI-Powered Learning Platform',
      description: 'An educational platform that uses AI to create personalized learning experiences for each user.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1374&auto=format&fit=crop',
      technologies: ['React', 'Python', 'TensorFlow'],
      link: '#',
    },
  ];
  
  // Scroll to next section
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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
      <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headerRef} 
          className="text-center max-w-3xl mx-auto"
          style={{ y, opacity }}
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
            Frontend Developer & 3D Enthusiast
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Creating Digital Experiences
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
            I blend creativity with technical expertise to build immersive, 
            interactive web experiences that push the boundaries of what's possible.
          </p>
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
      
      {/* About Section with 3D Models */}
      <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
              About Me
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Curiosity-Driven Development
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              As a frontend developer with a background in physics and a childlike curiosity about how things work,
              I bring a unique perspective to every project. I love exploring the intersection of science, art, and technology.
            </p>
          </motion.div>
          
          {/* 3D Characters */}
          <ThreeCharacters />
          
          {/* Skills Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {/* Scientist Card */}
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3V5M15 3V5M7 11H17M7 15H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Methodical Approach</h3>
              <p className="text-foreground/70">
                I apply scientific methodology to problem-solving, breaking down complex issues into manageable parts and finding elegant solutions.
              </p>
            </motion.div>
            
            {/* Physicist Card */}
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22V18M12 6V2M20 12H22M2 12H4M17.657 17.657L19.071 19.071M4.929 4.929L6.343 6.343M17.657 6.343L19.071 4.929M4.929 19.071L6.343 17.657M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Technical Precision</h3>
              <p className="text-foreground/70">
                With a physics background, I understand the importance of precision and optimization in creating performant applications.
              </p>
            </motion.div>
            
            {/* Curious Kid Card */}
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17H14.337M12 3V5M5.636 5.636L7.05 7.05M3 12H5M5.636 18.364L7.05 16.95M19 12H21M16.95 7.05L18.364 5.636M16.95 16.95L18.364 18.364M12 7C9.239 7 7 9.239 7 12C7 14.761 9.239 17 12 17C14.761 17 17 14.761 17 12C17 9.239 14.761 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Endless Curiosity</h3>
              <p className="text-foreground/70">
                I approach each project with the wonder of a curious child, always eager to learn new technologies and push creative boundaries.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
              My Work
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Featured Projects
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Explore a selection of my recent work that showcases my skills in creating
              immersive, interactive web experiences with advanced 3D elements.
            </p>
          </motion.div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Let's Work Together
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Have a project in mind or want to discuss a potential collaboration?
              I'd love to hear from you. Fill out the form below and I'll get back to you soon.
            </p>
          </motion.div>
          
          {/* Contact Form */}
          <ContactForm />
          
          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
            <div className="flex justify-center gap-4">
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((platform, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="glass p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 text-center text-foreground/60">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
