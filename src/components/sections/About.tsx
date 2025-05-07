import { motion } from 'framer-motion';
import { personalData } from '@/data/portfolio';

const About = () => {
  return (
    <section id="about" className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-main">
            <span className="section-title text-[var(--foreground)]">About Me</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <p className="text-lg text-[var(--foreground)] opacity-90 mb-6 font-secondary">
                {personalData.about}
              </p>
              
              <p className="text-lg text-[var(--foreground)] opacity-90 mb-6 font-secondary">
                I approach programming the same way I approach building in Minecraft - with creativity, 
                careful planning, and attention to detail. Just as each block in Minecraft has a purpose, 
                each line of code I write serves a specific function.
              </p>
                <p className="text-lg text-[var(--foreground)] opacity-90 mb-6 font-secondary">
                When I&apos;m not coding, you might find me exploring new technologies, contributing to open source 
                projects, or actually playing Minecraft to get inspiration for my next digital creation.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-[var(--primary)] font-main">Current Status</h3>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--grass)] mr-3 animate-pulse"></div>
                  <span className="text-[var(--foreground)] font-secondary">{personalData.availability}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--stone)] mr-3"></div>
                  <span className="text-[var(--foreground)]">Based in {personalData.location}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full aspect-square bg-[var(--stone)] rounded-lg p-2 shadow-lg transform -rotate-2">
                <div className="w-full h-full bg-[var(--dirt)] bg-opacity-70 rounded border-4 border-[var(--secondary)] flex items-center justify-center">
                  <div className="p-4 text-center">
                    <div className="pixelated">
                      <div className="w-20 h-20 mx-auto bg-[var(--grass)] rounded mb-4"></div>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">Skills</h3>
                    <p className="text-sm text-[var(--foreground)] opacity-80">Building digital worlds block by block</p>
                    
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {['JS', 'TS', 'React', 'Node', 'Next', 'CSS'].map((skill, index) => (
                        <div 
                          key={index} 
                          className="text-xs bg-[var(--background)] text-[var(--foreground)] rounded p-1 border border-[var(--primary)]"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[var(--wood)] rounded-lg shadow-lg transform rotate-12"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[var(--grass)] rounded-lg shadow-lg transform -rotate-6"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
