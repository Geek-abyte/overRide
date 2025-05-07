import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experience } from '@/data/portfolio';
import Image from 'next/image';

// Example technologies for each company (you can add this to your portfolio.ts file later)
const companyTechnologies = {
  'BlockTech Solutions': ['React', 'TypeScript', 'Next.js', 'CI/CD', 'Jest'],
  'Pixel Perfect Agency': ['React', 'Node.js', 'MongoDB', 'Express', 'RESTful API'],
  'CubeTech Innovations': ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [blockAnimation, setBlockAnimation] = useState(false);

  useEffect(() => {
    // Start the block animations when the section becomes visible
    const timer = setTimeout(() => {
      setBlockAnimation(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleTabClick = (index: number) => {
    // Add Minecraft-style "click" sound effect (optional)
    setActiveTab(index);
  };

  return (
    <section id="experience" className="py-20 bg-[var(--background)] relative overflow-hidden">
      {/* Decorative Minecraft block background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-10 w-16 h-16 bg-[var(--dirt)] bg-opacity-20 transform rotate-12 rounded-sm"></div>
        <div className="absolute top-20 right-10 w-12 h-12 bg-[var(--stone)] bg-opacity-20 transform -rotate-6 rounded-sm"></div>
        <div className="absolute bottom-40 -left-5 w-10 h-10 bg-[var(--grass)] bg-opacity-20 transform rotate-45 rounded-sm"></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-[var(--wood)] bg-opacity-20 transform -rotate-12 rounded-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => setIsVisible(true)}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="section-title text-[var(--foreground)] relative">
              Experience
              <span className="absolute -right-10 top-0 w-8 h-8 bg-[var(--wood)] transform rotate-12 
                               rounded-sm minecraft-pixelated-block" style={{
                opacity: 0,
                animation: blockAnimation ? 'minecraft-block-appear 0.5s forwards' : 'none',
                animationDelay: '0.2s'
              }}></span>
            </span>
          </h2>
          
          {/* Experience Timeline */}
          <div className="max-w-5xl mx-auto">
            {/* Minecraft-Style Work Timeline */}
            <div className="flex flex-col space-y-8 relative mb-24">
              {/* Vertical timeline line */}
              <div className="absolute top-0 left-16 md:left-1/4 w-2 h-full bg-[var(--primary)] bg-opacity-20 
                            transform translate-x-px" style={{
                background: 'repeating-linear-gradient(to bottom, var(--stone) 0px, var(--stone) 4px, var(--dirt) 4px, var(--dirt) 8px)'
              }}></div>
              
              {/* Experience blocks */}
              {experience.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative ${index !== experience.length - 1 ? 'pb-8' : ''}`}
                >
                  {/* Timeline node */}
                  <div 
                    className="absolute left-16 md:left-1/4 w-8 h-8 transform -translate-x-3 minecraft-pixelated-block 
                              cursor-pointer hover:scale-110 transition-transform duration-200"
                    style={{
                      background: index === 0 ? 'var(--grass)' : index === 1 ? 'var(--wood)' : 'var(--stone)',
                      boxShadow: 'inset -2px -2px 0 rgba(0, 0, 0, 0.25), inset 2px 2px 0 rgba(255, 255, 255, 0.25)',
                      opacity: 0,
                      animation: blockAnimation ? 'minecraft-block-appear 0.5s forwards' : 'none',
                      animationDelay: `${0.5 + index * 0.2}s`
                    }}
                    onClick={() => handleTabClick(index)}
                  ></div>
                  
                  {/* Experience card */}
                  <div className={`relative ml-24 md:ml-[30%] ${activeTab === index ? 'z-10' : ''}`}>
                    <motion.div
                      initial={false}
                      animate={{ 
                        scale: activeTab === index ? 1 : 0.98,
                        opacity: activeTab === index ? 1 : 0.7,
                      }}
                      className={`bg-[var(--stone)] bg-opacity-10 p-5 rounded-lg border-2 border-opacity-40
                                transform transition-all duration-300 relative overflow-hidden group
                                ${activeTab === index ? 'border-[var(--primary)]' : 'border-[var(--secondary)] hover:border-[var(--primary)] hover:border-opacity-40'}`}
                      onClick={() => handleTabClick(index)}
                    >
                      {/* Decorative corner blocks */}
                      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[var(--primary)] opacity-0 rounded-sm transform rotate-45 
                                    group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[var(--primary)] opacity-0 rounded-sm transform rotate-45 
                                    group-hover:opacity-20 transition-opacity duration-300"></div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-[var(--foreground)] minecraft-pixelated-text">
                            {item.position}
                          </h3>
                          <div className="flex items-center">
                            <span className="minecraft-pixelated-block w-3 h-3 mr-2 bg-[var(--primary)]"></span>
                            <span className="text-[var(--primary)] font-secondary minecraft-pixelated-text">{item.company}</span>
                          </div>
                        </div>
                        <p className="text-sm text-[var(--foreground)] opacity-70 minecraft-pixelated-text mt-2 sm:mt-0">
                          {item.duration}
                        </p>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <div className="minecraft-pixelated-block w-4 h-4 mr-2 bg-[var(--dirt)]"></div>
                        <span className="text-sm text-[var(--foreground)] opacity-80 minecraft-pixelated-text">{item.location}</span>
                      </div>
                      
                      {/* Animated content when tab is active */}
                      <AnimatePresence>
                        {activeTab === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Technologies used */}
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2 mb-4">
                                {companyTechnologies[item.company as keyof typeof companyTechnologies]?.map((tech, techIndex) => (
                                  <span 
                                    key={techIndex} 
                                    className="inline-block px-3 py-1 text-xs bg-[var(--primary)] bg-opacity-20 
                                            rounded border border-[var(--primary)] border-opacity-30 
                                            text-[var(--foreground)] minecraft-pixelated-text"
                                    style={{
                                      opacity: 0,
                                      animation: 'minecraft-text-reveal 0.8s forwards',
                                      animationDelay: `${0.1 + techIndex * 0.05}s`,
                                      animationFillMode: 'both'
                                    }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Responsibilities with Minecraft block bullets */}
                            <ul className="space-y-3">
                              {item.responsibilities.map((responsibility, respIndex) => (
                                <motion.li 
                                  key={respIndex} 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.1 + respIndex * 0.1 }}
                                  className="flex text-[var(--foreground)] opacity-90 items-start"
                                >
                                  <span className="minecraft-pixelated-block w-3 h-3 mt-1 mr-3 flex-shrink-0" 
                                        style={{ 
                                          background: respIndex % 3 === 0 ? 'var(--grass)' : 
                                                    respIndex % 3 === 1 ? 'var(--dirt)' : 'var(--wood)'
                                        }}></span>
                                  <span className="text-sm">{responsibility}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Preview content when tab is not active */}
                      {activeTab !== index && (
                        <div className="h-12 flex items-center">
                          <p className="text-[var(--foreground)] opacity-60 truncate">
                            {item.responsibilities[0]}...
                          </p>
                        </div>
                      )}
                      
                      {/* Click to expand note */}
                      {activeTab !== index && (
                        <div className="absolute bottom-2 right-2">
                          <span className="text-xs text-[var(--primary)] opacity-70 minecraft-pixelated-text">Click to expand</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Education Section with Minecraft-style design */}
          <div className="mt-4 mb-8 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center text-[var(--foreground)] relative">
              <span className="section-title relative">
                Education
                <span className="absolute -left-10 -top-2 w-6 h-6 bg-[var(--grass)] rounded-sm transform rotate-12 
                               minecraft-pixelated-block" style={{
                  opacity: 0,
                  animation: blockAnimation ? 'minecraft-block-appear 0.5s forwards' : 'none',
                  animationDelay: '0.4s'
                }}></span>
              </span>
            </h3>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Minecraft-style education card */}
              <div className="bg-[var(--dirt)] rounded-lg p-1 transform rotate-1 relative overflow-visible">
                {/* Decorative blocks */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--grass)] rounded-md border-2 border-[var(--stone)]" style={{
                  opacity: 0,
                  animation: blockAnimation ? 'minecraft-block-appear 0.5s forwards' : 'none',
                  animationDelay: '0.7s',
                  boxShadow: 'inset -2px -2px 0 rgba(0, 0, 0, 0.25), inset 2px 2px 0 rgba(255, 255, 255, 0.25)'
                }}></div>
                
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-[var(--wood)] rounded-md border-2 border-[var(--stone)]" style={{
                  opacity: 0,
                  animation: blockAnimation ? 'minecraft-block-appear 0.5s forwards' : 'none',
                  animationDelay: '0.9s',
                  boxShadow: 'inset -2px -2px 0 rgba(0, 0, 0, 0.25), inset 2px 2px 0 rgba(255, 255, 255, 0.25)'
                }}></div>
                
                <div className="bg-[var(--stone)] p-1 rounded-lg">
                  <div className="bg-[var(--background)] p-6 rounded-lg border-2 border-[var(--secondary)] border-opacity-30 relative">
                    {/* School details with Minecraft elements */}
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                      {/* University logo (replaced with a Minecraft-style image) */}
                      <div className="w-32 h-32 bg-[var(--stone)] p-1 rounded-lg transform -rotate-2 shadow-lg flex-shrink-0">
                        <div className="bg-[var(--primary)] bg-opacity-20 w-full h-full rounded-lg flex items-center justify-center overflow-hidden">
                          <div className="relative w-24 h-24 minecraft-pixelated-block">
                            <Image 
                              src="/images/heart.png" 
                              alt="University" 
                              width={96}
                              height={96}
                              className="object-contain pixelated"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                          <div>
                            <h4 className="text-2xl font-bold text-[var(--foreground)] minecraft-pixelated-text">University of Lagos</h4>
                            <p className="text-[var(--primary)] opacity-90 mb-2 minecraft-pixelated-text">BS in Computer Science</p>
                          </div>
                          <div className="bg-[var(--primary)] px-4 py-2 rounded-lg text-white transform -rotate-2 mt-2 md:mt-0">
                            <span className="minecraft-pixelated-text font-bold">2016 - 2020</span>
                          </div>
                        </div>
                        
                        {/* University description */}
                        <p className="text-[var(--foreground)] opacity-80 mb-4 text-sm">
                          Studied computer science with focus on software engineering, algorithms, and data structures.
                          Participated in multiple hackathons and coding competitions.
                        </p>
                      </div>
                    </div>
                    
                    {/* Achievements and Certifications in Minecraft-style containers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[var(--stone)] bg-opacity-10 p-1 rounded-lg transform rotate-1">
                        <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--secondary)] border-opacity-30 h-full">
                          <div className="flex items-center mb-3">
                            <div className="minecraft-pixelated-block w-6 h-6 mr-2 bg-[var(--primary)]"></div>
                            <h5 className="font-bold text-[var(--foreground)] minecraft-pixelated-text">Achievements</h5>
                          </div>
                          
                          <ul className="space-y-3">
                            {["Graduated with First Class Honors", "Vice President of the Programming Club", "Developed a campus navigation app as final year project"].map((achievement, i) => (
                              <motion.li 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                                className="flex text-[var(--foreground)] opacity-90 items-start"
                              >
                                <span className="minecraft-pixelated-block w-3 h-3 mt-1 mr-3 flex-shrink-0" 
                                      style={{ background: 'var(--wood)' }}></span>
                                <span className="text-sm">{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-[var(--stone)] bg-opacity-10 p-1 rounded-lg transform -rotate-1">
                        <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--secondary)] border-opacity-30 h-full">
                          <div className="flex items-center mb-3">
                            <div className="minecraft-pixelated-block w-6 h-6 mr-2 bg-[var(--dirt)]"></div>
                            <h5 className="font-bold text-[var(--foreground)] minecraft-pixelated-text">Certifications</h5>
                          </div>
                          
                          <ul className="space-y-4">
                            {[
                              {name: "Full Stack Web Development (Udacity)", year: "2019"},
                              {name: "AWS Certified Developer – Associate", year: "2022"}
                            ].map((cert, i) => (
                              <motion.li 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                                className="flex items-center bg-[var(--stone)] bg-opacity-10 p-2 rounded text-[var(--foreground)] border border-[var(--stone)] border-opacity-20"
                              >
                                <div className="minecraft-pixelated-block w-5 h-5 mr-3" 
                                     style={{ background: 'var(--grass)' }}></div>
                                <div className="flex-grow">
                                  <p className="text-sm minecraft-pixelated-text">{cert.name}</p>
                                </div>
                                <span className="text-xs py-1 px-2 bg-[var(--primary)] bg-opacity-20 rounded minecraft-pixelated-text">{cert.year}</span>
                              </motion.li>
                            ))}
                            
                            {/* Add Minecraft-style "unlock new skills" animation */}
                            <div className="flex items-center justify-center mt-2 bg-[var(--stone)] bg-opacity-10 py-2 px-4 rounded border border-dashed border-[var(--primary)] border-opacity-40">
                              <Image 
                                src="/images/pickaxe.png" 
                                alt="Pickaxe" 
                                width={20} 
                                height={20}
                                className="mr-2 pixelated"
                                style={{ imageRendering: 'pixelated' }}
                              />
                              <span className="text-xs text-[var(--primary)] minecraft-pixelated-text animate-pulse">More skills being unlocked...</span>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
