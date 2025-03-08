
import { motion } from 'framer-motion';
import ThreeCharacters from '../ScientistModel';

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
