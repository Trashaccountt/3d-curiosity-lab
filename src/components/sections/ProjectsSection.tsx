
import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard';

const ProjectsSection = () => {
  // Project data
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
  
  return (
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
  );
};

export default ProjectsSection;
