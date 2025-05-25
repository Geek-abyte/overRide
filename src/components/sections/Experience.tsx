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

  // Mobile Experience Card Component
  const MobileExperienceCard = ({ item, index, isActive, onClick }: { 
    item: typeof experience[0], 
    index: number, 
    isActive: boolean,
    onClick: () => void 
  }) => {
    return (
      <div 
        className={`bg-[var(--stone)] bg-opacity-10 rounded-lg border-2 mb-4
                  ${isActive ? 'border-[var(--primary)]' : 'border-[var(--secondary)] border-opacity-40'}`}
        onClick={onClick}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between relative">
          <div className="absolute -left-3 -top-3 w-6 h-6 rounded-sm transform rotate-12"
               style={{ 
                 background: index === 0 ? 'var(--grass)' : index === 1 ? 'var(--wood)' : 'var(--stone)',
                 opacity: 0,
                 animation: blockAnimation ? 'minecraft-block-appear 0.5s forwards' : 'none',
                 animationDelay: `${0.5 + index * 0.15}s`,
                 boxShadow: 'inset -2px -2px 0 rgba(0, 0, 0, 0.25), inset 2px 2px 0 rgba(255, 255, 255, 0.25)'
               }}
          ></div>
          
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">{item.position}</h3>
            <div className="flex items-center">
              <span className="minecraft-pixelated-block w-2 h-2 mr-2 bg-[var(--primary)]"></span>
              <span className="text-sm text-[var(--primary)]">{item.company}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs text-[var(--foreground)] opacity-70 mb-1">{item.duration}</span>
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[var(--primary)] border-opacity-50">
              {isActive ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </div>
        </div>
        
        {/* Collapsible content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-[var(--secondary)] border-opacity-20">
                <div className="flex items-center mb-3">
                  <div className="minecraft-pixelated-block w-3 h-3 mr-2 bg-[var(--dirt)]"></div>
                  <span className="text-xs text-[var(--foreground)] opacity-80">{item.location}</span>
                </div>
                
                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {companyTechnologies[item.company as keyof typeof companyTechnologies]?.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex} 
                        className="inline-block px-2 py-1 text-xs bg-[var(--primary)] bg-opacity-20 
                                rounded border border-[var(--primary)] border-opacity-30 
                                text-[var(--foreground)]"
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
                
                {/* Responsibilities */}
                <ul className="space-y-2">
                  {item.responsibilities.map((responsibility: string, respIndex: number) => (
                    <motion.li 
                      key={respIndex} 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + respIndex * 0.1 }}
                      className="flex text-[var(--foreground)] opacity-90 items-start"
                    >
                      <span className="minecraft-pixelated-block w-2 h-2 mt-1 mr-2 flex-shrink-0" 
                            style={{ 
                              background: respIndex % 3 === 0 ? 'var(--grass)' : 
                                        respIndex % 3 === 1 ? 'var(--dirt)' : 'var(--wood)'
                            }}></span>
                      <span className="text-xs">{responsibility}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="experience" className="py-16 sm:py-20 bg-[var(--background)] relative overflow-hidden">
      {/* Decorative Minecraft block background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-10 w-12 sm:w-16 h-12 sm:h-16 bg-[var(--dirt)] bg-opacity-20 transform rotate-12 rounded-sm"></div>
        <div className="absolute top-20 right-10 w-8 sm:w-12 h-8 sm:h-12 bg-[var(--stone)] bg-opacity-20 transform -rotate-6 rounded-sm"></div>
        <div className="absolute bottom-40 -left-5 w-8 sm:w-10 h-8 sm:h-10 bg-[var(--grass)] bg-opacity-20 transform rotate-45 rounded-sm"></div>
        <div className="absolute bottom-20 right-20 w-10 sm:w-14 h-10 sm:h-14 bg-[var(--wood)] bg-opacity-20 transform -rotate-12 rounded-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => setIsVisible(true)}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center relative">
            <span className="section-title text-[var(--foreground)] relative">
              Experience
              <span className="absolute -right-8 sm:-right-10 top-0 w-6 sm:w-8 h-6 sm:h-8 bg-[var(--wood)] transform rotate-12 
                              rounded-sm minecraft-pixelated-block" style={{
                opacity: 0,
                animation: blockAnimation ? 'minecraft-block-appear 0.5s forwards' : 'none',
                animationDelay: '0.2s'
              }}></span>
            </span>
          </h2>
          
          {/* MOBILE EXPERIENCE VIEW */}
          <div className="md:hidden">
            <div className="max-w-md mx-auto">
              {experience.map((item: typeof experience[0], index: number) => (
                <MobileExperienceCard 
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={activeTab === index}
                  onClick={() => handleTabClick(index)}
                />
              ))}
            </div>
          </div>
          
          {/* DESKTOP EXPERIENCE VIEW */}
          <div className="hidden md:block">
            {/* Experience Timeline */}
            <div className="max-w-5xl mx-auto">
              {/* Minecraft-Style Work Timeline */}
              <div className="flex flex-col space-y-8 relative mb-24">
                {/* Vertical timeline line */}
                <div className="absolute top-0 left-1/4 w-2 h-full bg-[var(--primary)] bg-opacity-20 
                              transform translate-x-px" style={{
                  background: 'repeating-linear-gradient(to bottom, var(--stone) 0px, var(--stone) 4px, var(--dirt) 4px, var(--dirt) 8px)'
                }}></div>
                
                {/* Experience blocks */}
                {experience.map((item: typeof experience[0], index: number) => (
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
                      className="absolute left-1/4 w-8 h-8 transform -translate-x-3 minecraft-pixelated-block 
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
                    <div className={`relative ml-[30%] ${activeTab === index ? 'z-10' : ''}`}>
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
                        
                        <div className="flex flex-row justify-between items-center mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-[var(--foreground)] minecraft-pixelated-text">
                              {item.position}
                            </h3>
                            <div className="flex items-center">
                              <span className="minecraft-pixelated-block w-3 h-3 mr-2 bg-[var(--primary)]"></span>
                              <span className="text-[var(--primary)] font-secondary minecraft-pixelated-text">{item.company}</span>
                            </div>
                          </div>
                          <p className="text-sm text-[var(--foreground)] opacity-70 minecraft-pixelated-text">
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
                                  {companyTechnologies[item.company as keyof typeof companyTechnologies]?.map((tech: string, techIndex: number) => (
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
                                {item.responsibilities.map((responsibility: string, respIndex: number) => (
                                  <motion.li 
                                    key={respIndex} 
                                    initial={{ opacity: 0, x: -5 }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
