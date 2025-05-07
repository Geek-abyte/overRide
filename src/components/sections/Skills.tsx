import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';

const Skills = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="py-20 bg-[var(--background)] bg-opacity-95 relative overflow-hidden">
      {/* Decorative Minecraft elements */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-[var(--grass)] via-[var(--stone)] to-[var(--dirt)]"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--stone)] opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--primary)] opacity-10 rounded-full blur-3xl"></div>
      
      {/* Animated pixel blocks */}
      <motion.div 
        className="hidden md:block absolute left-10 w-12 h-12 bg-[var(--grass)] opacity-20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8
        }}
      />
      <motion.div 
        className="hidden md:block absolute right-20 top-40 w-8 h-8 bg-[var(--wood)] opacity-20"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 6,
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="section-title text-[var(--foreground)] relative inline-block">
              Skills
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-[var(--primary)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span>
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {skills.map((skillCategory, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  className="bg-[var(--stone)] bg-opacity-20 rounded-lg p-6 border-2 border-[var(--stone)] relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* 3D effect top border */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--primary)]"></div>
                  
                  {/* Minecraft block texture overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="w-full h-full grid grid-cols-8">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-gray-700 opacity-10"></div>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-6 text-[var(--foreground)] relative z-10 flex items-center">
                    <motion.div 
                      className="w-6 h-6 mr-2 bg-[var(--primary)] rounded"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    ></motion.div>
                    {skillCategory.category}
                  </h3>
                  
                  <motion.ul 
                    className="space-y-3 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {skillCategory.technologies.map((tech, techIndex) => (
                      <motion.li 
                        key={techIndex} 
                        className="flex items-center text-[var(--foreground)] opacity-90 p-2 hover:bg-[var(--primary)] hover:bg-opacity-20 rounded transition-colors"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className="w-2 h-8 bg-[var(--primary)] mr-3"
                          whileHover={{ height: 12 }}
                        ></motion.div>
                        <span>{tech}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  className="bg-[var(--stone)] bg-opacity-20 rounded-lg p-8 border-2 border-[var(--primary)] border-opacity-50 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--grass)] via-[var(--primary)] to-[var(--water)]"></div>
                  
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-8 h-8 bg-[var(--grass)] mr-3 rounded"
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                    <h3 className="text-xl font-bold text-[var(--foreground)]">Building with Blocks</h3>
                  </div>
                  
                  <p className="text-[var(--foreground)] opacity-90 mb-6">
                    Just like in Minecraft, I believe in building modular, reusable, and well-structured code. 
                    My approach to development is to craft solutions that are not only functional but also 
                    maintainable and scalable over time.
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {['Problem Solving', 'Clean Code', 'Responsive Design', 'Performance'].map((skill, index) => (
                      <motion.div 
                        key={index}
                        className="bg-[var(--background)] rounded p-2 text-center text-sm text-[var(--foreground)] border border-[var(--primary)] border-opacity-30 relative overflow-hidden"
                        whileHover={{ 
                          backgroundColor: "var(--primary)", 
                          color: "var(--background)",
                          scale: 1.05
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-[var(--stone)] bg-opacity-20 rounded-lg p-8 border-2 border-[var(--secondary)] border-opacity-50 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--water)] via-[var(--secondary)] to-[var(--stone)]"></div>
                  
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-8 h-8 bg-[var(--secondary)] mr-3 rounded"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                    <h3 className="text-xl font-bold text-[var(--foreground)]">Crafting Experiences</h3>
                  </div>
                  
                  <p className="text-[var(--foreground)] opacity-90 mb-6">
                    Beyond just code, I focus on creating memorable digital experiences. From intuitive user interfaces
                    to optimized performance, I craft solutions that users love to interact with.
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {['Accessibility', 'Team Collaboration', 'User Experience', 'Testing'].map((skill, index) => (
                      <motion.div 
                        key={index}
                        className="bg-[var(--background)] rounded p-2 text-center text-sm text-[var(--foreground)] border border-[var(--secondary)] border-opacity-30 relative overflow-hidden"
                        whileHover={{ 
                          backgroundColor: "var(--secondary)", 
                          color: "var(--background)",
                          scale: 1.05
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Minecraft-inspired progress bars - Skill Levels */}
              <motion.div 
                className="mt-12 bg-[var(--background)] border-2 border-[var(--stone)] rounded-lg p-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-6 text-[var(--foreground)] text-center">Skill Levels</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--foreground)]">Frontend Development</span>
                        <span className="text-[var(--primary)]">95%</span>
                      </div>
                      <div className="h-4 bg-[var(--stone)] bg-opacity-30 rounded overflow-hidden border border-[var(--stone)]">
                        <motion.div 
                          className="h-full bg-[var(--primary)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: "95%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 }}
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--foreground)]">Backend Development</span>
                        <span className="text-[var(--secondary)]">85%</span>
                      </div>
                      <div className="h-4 bg-[var(--stone)] bg-opacity-30 rounded overflow-hidden border border-[var(--stone)]">
                        <motion.div 
                          className="h-full bg-[var(--secondary)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--foreground)]">UI/UX Design</span>
                        <span className="text-[var(--grass)]">80%</span>
                      </div>
                      <div className="h-4 bg-[var(--stone)] bg-opacity-30 rounded overflow-hidden border border-[var(--stone)]">
                        <motion.div 
                          className="h-full bg-[var(--grass)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: "80%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--foreground)]">DevOps & Deployment</span>
                        <span className="text-[var(--water)]">75%</span>
                      </div>
                      <div className="h-4 bg-[var(--stone)] bg-opacity-30 rounded overflow-hidden border border-[var(--stone)]">
                        <motion.div 
                          className="h-full bg-[var(--water)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
