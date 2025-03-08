
import { motion } from 'framer-motion';

const SkillsSection = () => {
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
  
  return (
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
  );
};

export default SkillsSection;
