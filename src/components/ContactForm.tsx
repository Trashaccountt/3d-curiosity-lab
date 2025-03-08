
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  const bubbleRefs = useRef<HTMLDivElement[]>([]);
  const controls = useAnimation();
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSubmitted: false });
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success animation
      const formElements = formRef.current?.elements;
      if (formElements) {
        gsap.to(formElements, {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setFormState({ isSubmitting: false, isSubmitted: true });
            setFormData({ name: '', email: '', message: '' });
            
            // Reset form after success animation
            setTimeout(() => {
              gsap.fromTo(
                formElements,
                { y: 20, opacity: 0 },
                { 
                  y: 0, 
                  opacity: 1, 
                  stagger: 0.1, 
                  duration: 0.4, 
                  ease: "power2.out"
                }
              );
            }, 500);
          }
        });
      }
      
      toast.success("Message sent successfully!");
    } catch (error) {
      setFormState({ isSubmitting: false, isSubmitted: false });
      toast.error("Failed to send message. Please try again.");
    }
  };
  
  // Create floating bubble effect
  useEffect(() => {
    // Create random bubbles
    bubbleRefs.current.forEach((bubble, index) => {
      const delay = index * 0.2;
      const duration = 2 + Math.random() * 4;
      
      gsap.to(bubble, {
        y: "-100px",
        x: `${(Math.random() - 0.5) * 150}px`,
        opacity: 0,
        scale: 2,
        duration: duration,
        delay: delay,
        ease: "power1.out",
        repeat: -1,
        repeatDelay: 1,
        onRepeat: () => {
          gsap.set(bubble, {
            y: "0px",
            x: `${(Math.random() - 0.5) * 100}px`,
            opacity: 0.7,
            scale: 0.5 + Math.random() * 0.5
          });
        }
      });
    });
    
    // Initial animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
    
    return () => {
      bubbleRefs.current.forEach(bubble => {
        gsap.killTweensOf(bubble);
      });
    };
  }, [controls]);
  
  // Add bubble to refs
  const addBubbleRef = (el: HTMLDivElement) => {
    if (el && !bubbleRefs.current.includes(el)) {
      bubbleRefs.current.push(el);
    }
  };
  
  return (
    <div className="relative max-w-xl mx-auto">
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={addBubbleRef}
            className="absolute bottom-0 rounded-full bg-primary/10 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 50}px`,
              height: `${20 + Math.random() * 50}px`,
              opacity: 0.5 + Math.random() * 0.3
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="glass p-8 rounded-2xl relative z-10"
      >
        <h3 className="text-2xl font-bold mb-6 text-gradient">Get in Touch</h3>
        
        {formState.isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
            <p className="text-foreground/80 mb-4">Thanks for reaching out. I'll get back to you shortly.</p>
            <button
              onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-primary"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass-input w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="glass-input w-full px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full py-3 px-6 bg-primary text-white rounded-lg transition-all duration-300 hover:bg-primary/90 active:scale-95"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formState.isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ContactForm;
