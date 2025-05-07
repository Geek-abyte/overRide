import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '@/data/portfolio';
import MinecraftImage from '@/components/ui/MinecraftImage';

const Projects = () => {
  // Filter featured projects
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-[var(--background)] bg-opacity-95 relative">
      {/* Decorative pixel blocks */}
      <div className="hidden md:block absolute top-20 left-10 w-8 h-8 bg-[var(--dirt)] opacity-40 transform rotate-12"></div>
      <div className="hidden md:block absolute bottom-40 right-20 w-10 h-10 bg-[var(--wood)] opacity-40 transform -rotate-6"></div>
      <div className="hidden md:block absolute top-60 right-10 w-6 h-6 bg-[var(--grass)] opacity-40 transform rotate-45"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-main">
            <span className="section-title text-[var(--foreground)]">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 gap-12 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative group overflow-hidden rounded-lg shadow-xl border-4 border-[var(--stone)]">
                    <div className="absolute inset-0 bg-[var(--primary)] bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Project image using MinecraftImage component */}
                    <div className="w-full aspect-video relative">
                      <MinecraftImage 
                        alt={project.title}
                        width={600}
                        height={337}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                  <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)] font-main">{project.title}</h3>
                  
                  <div className="bg-[var(--background)] p-6 rounded-lg shadow-lg mb-6 border-2 border-[var(--secondary)] transform hover:-translate-y-1 transition-transform">
                    <p className="text-[var(--foreground)] opacity-90 font-secondary">
                      {project.description}
                    </p>
                  </div>
                  
                  <ul className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <li 
                        key={techIndex}
                        className="text-xs bg-[var(--stone)] text-[var(--foreground)] px-3 py-1 rounded-full font-secondary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <FaGithub size={22} />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 relative"
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-[var(--foreground)] relative inline-block mx-auto">
              <span className="relative z-10">Other Noteworthy Projects</span>
              <motion.div 
                className="absolute bottom-0 left-0 h-3 bg-[var(--primary)] opacity-50" 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h3>
            
            {/* Pixelated chest decoration */}
            <div className="w-16 h-16 mx-auto mb-6 bg-[var(--wood)] relative overflow-hidden rounded-sm border-2 border-[var(--stone)]">
              <div className="w-full h-3 bg-[var(--stone)] absolute top-5"></div>
              <div className="w-2 h-2 bg-[var(--primary)] absolute top-7 left-7"></div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-800">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20, rotateX: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -15, 
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                  scale: 1.02
                }}
                className="bg-[var(--stone)] bg-opacity-20 rounded-lg p-6 transition-all duration-300 
                          border-2 border-[var(--stone)] relative overflow-hidden transform-gpu"
              >
                {/* Shimmering effect overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-0"
                  animate={{ 
                    x: ["100%", "-100%"],
                    opacity: [0, 0.1, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    repeatDelay: index * 2 
                  }}
                />
                
                {/* Pixel corners */}
                <div className="absolute top-0 left-0 w-4 h-4 bg-[var(--primary)] opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--primary)] opacity-60"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-[var(--foreground)]">{project.title}</h4>
                  <div className="flex space-x-3">
                    <motion.a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub size={20} />
                    </motion.a>
                    <motion.a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt size={18} />
                    </motion.a>
                  </div>
                </div>
                
                <div className="h-24 overflow-hidden mb-6 relative">
                  <p className="text-[var(--foreground)] opacity-80 text-sm">
                    {project.description.substring(0, 120)}...
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--stone)] to-transparent"></div>
                </div>
                
                <motion.ul 
                  className="flex flex-wrap gap-2 mt-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                >
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <motion.li 
                      key={techIndex}
                      className="text-xs bg-[var(--background)] text-[var(--foreground)] px-2 py-1 rounded border border-[var(--primary)] border-opacity-30"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: "var(--primary)", color: "var(--background)" }}
                    >
                      {tech}
                    </motion.li>
                  ))}
                  {project.technologies.length > 3 && (
                    <motion.li 
                      className="text-xs bg-[var(--background)] text-[var(--foreground)] px-2 py-1 rounded border border-[var(--secondary)] border-opacity-30"
                      whileHover={{ scale: 1.05 }}
                    >
                      +{project.technologies.length - 3}
                    </motion.li>
                  )}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
