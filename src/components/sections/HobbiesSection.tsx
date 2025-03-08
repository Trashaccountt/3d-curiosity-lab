
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Gamepad, Cpu, Shield } from 'lucide-react';

const HobbiesSection = () => {
  const [activeHobby, setActiveHobby] = useState<string | null>(null);
  
  // Hobbies data
  const hobbies = [
    {
      id: "gaming",
      title: "Gaming",
      icon: <Gamepad className="w-6 h-6" />,
      description: "Passionate about competitive strategy games and immersive RPGs. Always looking for opportunities to test my strategic thinking and problem-solving skills in virtual environments.",
      animation: "game-controller"
    },
    {
      id: "tech",
      title: "Tech Exploration",
      icon: <Cpu className="w-6 h-6" />,
      description: "Constantly exploring new backend frameworks, cloud architectures, and AI technologies. Enjoy building small experimental projects to test emerging tools and techniques.",
      animation: "tech-wave"
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Challenges",
      icon: <Shield className="w-6 h-6" />,
      description: "Regular participant in CTF competitions and ethical hacking exercises. Solving security puzzles and identifying vulnerabilities helps me build more secure systems.",
      animation: "security-shield"
    }
  ];
  
  const handleHobbyClick = (id: string) => {
    setActiveHobby(id === activeHobby ? null : id);
  };
  
  return (
    <section id="hobbies" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium">
            Beyond Coding
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Hobbies & Interests
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            When I'm not engineering backend systems or improving security protocols,
            here's what keeps me engaged and inspired.
          </p>
        </motion.div>
        
        {/* Hobbies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass p-6 rounded-xl cursor-pointer transition-all duration-300 
                ${activeHobby === hobby.id ? 'ring-2 ring-primary scale-105' : 'hover:scale-[1.02]'}`}
              onClick={() => handleHobbyClick(hobby.id)}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                  {hobby.icon}
                </div>
                <h3 className="text-xl font-bold text-gradient">{hobby.title}</h3>
              </div>
              
              <p className="text-foreground/70 mb-4">
                {hobby.description}
              </p>
              
              {/* Interactive Animation Container */}
              <motion.div 
                className={`w-full h-32 rounded-lg bg-primary/5 overflow-hidden ${activeHobby !== hobby.id ? 'opacity-60' : ''}`}
                animate={{ height: activeHobby === hobby.id ? 160 : 100 }}
                transition={{ duration: 0.3 }}
              >
                {hobby.id === "gaming" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div 
                      className="w-16 h-16 bg-primary/20 rounded-lg"
                      animate={{ 
                        rotate: activeHobby === "gaming" ? [0, 15, -15, 0] : 0,
                        x: activeHobby === "gaming" ? [-20, 20, -20, 0] : 0
                      }}
                      transition={{ 
                        repeat: activeHobby === "gaming" ? Infinity : 0, 
                        duration: 2
                      }}
                    >
                      <Gamepad className="w-full h-full p-3 text-primary" />
                    </motion.div>
                  </div>
                )}
                
                {hobby.id === "tech" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div 
                      className="w-full flex justify-center space-x-2"
                      animate={{
                        y: activeHobby === "tech" ? [0, -10, 0] : 0
                      }}
                      transition={{ 
                        repeat: activeHobby === "tech" ? Infinity : 0, 
                        duration: 2,
                        staggerChildren: 0.2
                      }}
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-16 bg-primary/20 rounded-full"
                          animate={{ 
                            height: activeHobby === "tech" ? [40, 80, 40] : 40,
                            opacity: activeHobby === "tech" ? [0.5, 1, 0.5] : 0.5
                          }}
                          transition={{ 
                            repeat: activeHobby === "tech" ? Infinity : 0, 
                            duration: 1.5,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
                
                {hobby.id === "cybersecurity" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div 
                      className="relative w-16 h-16"
                      animate={{ 
                        rotate: activeHobby === "cybersecurity" ? [0, 360] : 0
                      }}
                      transition={{ 
                        repeat: activeHobby === "cybersecurity" ? Infinity : 0, 
                        duration: 10,
                        ease: "linear"
                      }}
                    >
                      <Shield className="w-full h-full text-primary" />
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        animate={{
                          scale: activeHobby === "cybersecurity" ? [1, 1.5, 1] : 1,
                          opacity: activeHobby === "cybersecurity" ? [1, 0, 1] : 1
                        }}
                        transition={{
                          repeat: activeHobby === "cybersecurity" ? Infinity : 0,
                          duration: 2
                        }}
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
              
              {/* "Click to interact" text */}
              <motion.p 
                className="text-xs text-center mt-3 text-foreground/50"
                animate={{ 
                  opacity: activeHobby === hobby.id ? 0 : 1 
                }}
                transition={{ duration: 0.3 }}
              >
                Click to interact
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
