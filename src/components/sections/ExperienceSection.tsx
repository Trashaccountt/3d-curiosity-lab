
import { motion } from 'framer-motion';

const ExperienceSection = () => {
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
  
  return (
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
  );
};

export default ExperienceSection;
