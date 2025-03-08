
import { motion } from 'framer-motion';
import ContactForm from '../ContactForm';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
