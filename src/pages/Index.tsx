
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import ParticleBackground from '../components/ParticleBackground';
import ThreeCharacters from '../components/ScientistModel';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import FloatingNav from '../components/FloatingNav';
import ThemeToggle from '../components/ThemeToggle';
import CursorFollower from '../components/CursorFollower';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Index = () => {
  const { scrollYProgress } = useScroll();
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
  
  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];
  
  // Project data updated for backend focus
  const projects = [
    {
      title: 'Blockchain-Based eVault System for Legal Records',
      description: 'A secure platform leveraging Ethereum blockchain and IPFS for decentralized storage of legal documents with role-based access control and robust encryption.',
      image: 'https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=1470&auto=format&fit=crop',
      technologies: ['Solidity', 'Ethereum', 'IPFS', 'Node.js', 'Web3.js'],
      link: 'https://evault-demo.example.com',
      github: 'https://github.com/Qkaustubh/e-vault-blockchain'
    },
    {
      title: 'AI-Powered Cybersecurity Threat Detection System',
      description: 'A machine learning system that detects network anomalies and security threats in real-time, with comprehensive logging and alerting capabilities.',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1470&auto=format&fit=crop',
      technologies: ['Python', 'Flask', 'TensorFlow', 'PostgreSQL', 'Docker'],
      link: 'https://ai-cybersecurity.example.com',
      github: 'https://github.com/Qkaustubh/ai-cybersecurity'
    },
  ];
  
  // Skills data
  const skills = [
    {
      category: "Languages",
      items: ["C++", "C", "SQL", "JavaScript", "Python"]
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "Flask", "REST APIs", "GraphQL"]
    },
    {
      category: "Databases",
      items: ["MongoDB", "PostgreSQL", "SQL", "Redis"]
    },
    {
      category: "Blockchain",
      items: ["Solidity", "Ethereum", "Web3.js", "IPFS"]
    },
    {
      category: "Cybersecurity",
      items: ["Penetration Testing", "Ethical Hacking", "OWASP", "Network Security"]
    },
    {
      category: "Software Tools",
      items: ["Docker", "Kubernetes", "Git", "VS Code"]
    },
    {
      category: "CS Fundamentals",
      items: ["Data Structures", "DBMS", "Computer Networks", "OOPs", "Operating Systems"]
    }
  ];
  
  // Experience data
  const experiences = [
    {
      title: "Freelancer (HackerOne)",
      period: "Aug 2022 – Present",
      description: "Identified and reported critical security vulnerabilities in various platforms",
      achievements: [
        "Executed a full account takeover in an edtech startup",
        "Uncovered high-severity security bugs in a billion-dollar company",
        "Discovered IDOR vulnerabilities exposing sensitive data",
        "Implemented proof-of-concept exploits with responsible disclosure"
      ]
    }
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
              Security-First Development
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              I'm a backend developer with expertise in cybersecurity and blockchain technologies. 
              My approach combines robust system architecture with a security researcher's mindset, 
              creating scalable and impenetrable digital solutions.
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
            {/* Backend Card */}
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">API Development</h3>
              <p className="text-foreground/70">
                I design and build robust RESTful and GraphQL APIs with a focus on security, scalability, and performance optimization.
              </p>
            </motion.div>
            
            {/* Security Card */}
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Cybersecurity</h3>
              <p className="text-foreground/70">
                My experience as a security researcher enables me to identify and mitigate vulnerabilities before they become exploitable.
              </p>
            </motion.div>
            
            {/* Blockchain Card */}
            <motion.div 
              className="glass p-6 rounded-xl"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Blockchain Development</h3>
              <p className="text-foreground/70">
                I develop secure smart contracts and decentralized applications, leveraging blockchain technology for transparency and security.
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
              Explore a selection of my backend and security-focused projects that showcase my
              expertise in creating secure, scalable, and efficient solutions.
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
      
      {/* Experience Section (New) */}
      <section id="experience" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
              Experience
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Professional Journey
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              My career path has been focused on identifying security vulnerabilities and building robust backend systems.
            </p>
          </motion.div>
          
          {/* Experience Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="mb-12 glass p-8 rounded-xl"
              >
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gradient">{experience.title}</h3>
                  <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">{experience.period}</span>
                </div>
                <p className="mb-4 text-foreground/80">{experience.description}</p>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">→</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills Section (New) */}
      <section id="skills" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
              Tech Stack
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Skills & Expertise
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              My technical skills span backend development, cybersecurity, and blockchain technologies.
            </p>
          </motion.div>
          
          {/* Skills Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold mb-4 text-gradient">{skillCategory.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
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
              Have a project in mind or want to discuss potential security improvements?
              I'd love to hear from you. Fill out the form below and I'll get back to you soon.
            </p>
          </motion.div>
          
          {/* Contact Form */}
          <ContactForm />
          
          {/* Resume Button & Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <motion.a
              href="#"
              className="inline-block mb-8 px-6 py-3 rounded-lg bg-primary text-white font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center">
                <span>Explore My Resume</span>
                <ExternalLink className="ml-2 w-4 h-4" />
              </div>
            </motion.a>
            
            <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
            <div className="flex justify-center gap-4">
              <motion.a
                href="https://github.com/Qkaustubh"
                target="_blank"
                rel="noreferrer"
                className="glass p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/kaustubh-shivarkar-5b824424a"
                target="_blank"
                rel="noreferrer"
                className="glass p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:contact@example.com"
                className="glass p-3 rounded-full text-foreground/80 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
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
