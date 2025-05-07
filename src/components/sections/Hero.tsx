import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalData } from '@/data/portfolio';
import Image from 'next/image';

const Hero = () => {  const nameLetters = "Jeremiah Oladele".split('');
  const titleLetters = "I build digital experiences".split('');

  useEffect(() => {
    // Animation for name letters with staggered delay
    const nameLetters = document.querySelectorAll('.name-letters span');
    nameLetters.forEach((letter, index) => {
      (letter as HTMLElement).style.animationDelay = `${index * 0.08}s`;
    });
    
    // Animation for title letters with staggered delay
    const titleLetters = document.querySelectorAll('.title-letters span');
    titleLetters.forEach((letter, index) => {
      (letter as HTMLElement).style.animationDelay = `${index * 0.08 + 0.5}s`;
    });
  }, []);
  
  
  return (
    <section className="min-h-screen flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <p className="text-[var(--primary)] font-secondary minecraft-pixelated-text">
                <span 
                  className="inline-block bg-[var(--dirt)] w-6 h-6 mr-2"
                  style={{ 
                    animation: 'minecraft-block-appear 0.5s forwards',
                    opacity: 0,
                    boxShadow: 'inset -2px -2px 0 rgba(0, 0, 0, 0.25), inset 2px 2px 0 rgba(255, 255, 255, 0.25)'
                  }}
                ></span>
                Hello, my name is
              </p>
            </motion.div>            
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold mb-3 text-[var(--foreground)] font-main">              <div className="overflow-hidden mb-2">
                <div className="minecraft-text-animated -mb-4 font-extrabold">
                  {nameLetters.map((letter, index) => (
                    <span 
                      key={index}
                      className={letter === ' ' ? 'mr-2' : ''}
                      style={{ 
                        display: 'inline-block',
                        opacity: 0,
                        animation: 'minecraft-letter-appear 0.8s forwards',
                        animationFillMode: 'both',
                        textShadow: '0 0 5px rgba(68, 143, 61, 0.5)'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div><div className="overflow-hidden">
                <div className="minecraft-text-animated text-[var(--secondary)] text-2xl sm:text-3xl md:text-3xl">
                  {titleLetters.map((letter, index) => (
                    <span 
                      key={index}
                      className={letter === ' ' ? 'mr-2' : ''}
                      style={{ 
                        display: 'inline-block',
                        opacity: 0,
                        animation: 'minecraft-letter-appear 0.8s forwards',
                        animationFillMode: 'both'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl font-secondary text-[var(--foreground)] mb-6 max-w-2xl"
            >
              {personalData.about.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className="inline-block mr-1"
                  style={{ 
                    opacity: 0,
                    animation: 'minecraft-text-reveal 0.8s forwards',
                    animationDelay: `${1.5 + i * 0.05}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {word}
                </span>
              ))}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#projects" 
                className="minecraft-btn bg-[var(--primary)] hover:bg-[var(--primary)]/80 px-6 py-3 rounded relative group overflow-hidden"
              >
                <span className="relative z-10">See My Work</span>
                <span className="absolute inset-0 bg-[var(--grass)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>              <a 
                href="#contact" 
                className="minecraft-btn bg-transparent border-2 border-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary)]/10 px-6 py-3 rounded relative group overflow-hidden"
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-[var(--stone)] bg-opacity-30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </motion.div>
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex space-x-5 mt-8"
            >
              <a 
                href={personalData.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors transform hover:scale-110 transition-transform duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={24} style={{ 
                  display: 'inline-block',
                  animation: 'pixel-bounce 2s ease-in-out infinite'
                }} />
              </a>
              <a 
                href={personalData.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors transform hover:scale-110 transition-transform duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} style={{ 
                  display: 'inline-block',
                  animation: 'pixel-bounce 2s ease-in-out infinite',
                  animationDelay: '0.1s'
                }} />
              </a>
              <a 
                href={personalData.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors transform hover:scale-110 transition-transform duration-200"
                aria-label="Twitter"
              >
                <FaTwitter size={24} style={{ 
                  display: 'inline-block',
                  animation: 'pixel-bounce 2s ease-in-out infinite',
                  animationDelay: '0.2s'
                }} />
              </a>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="w-full max-w-sm aspect-square relative"
            >
              <div className="w-full h-full bg-[var(--dirt)] rounded-lg p-2 transform rotate-3 shadow-xl relative z-10">
                <div className="w-full h-full bg-[var(--stone)] rounded border-4 border-[var(--secondary)] p-2 relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--grass)] rounded-md border-2 border-[var(--stone)] animate-[block-appear_0.5s_ease_0.3s_forwards] opacity-0"></div>              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-[var(--wood)] rounded-md border-2 border-[var(--stone)] animate-minecraft-block-appear opacity-0" style={{ animationDelay: '0.6s' }}></div>
                    <div className="w-full h-full bg-[var(--primary)] bg-opacity-20 rounded flex items-center justify-center">
                    <div className="text-center p-6 relative">
                      <div className="w-40 h-40 mx-auto mb-4 rounded-lg border-4 border-[var(--stone)] shadow-lg pixelated animate-[float_4s_ease-in-out_infinite] relative overflow-hidden">                        <Image 
                          src="/images/pixeljerry.png" 
                          alt="Pixel Jerry" 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover pixelated"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute -top-6 -right-6 w-8 h-8 bg-[var(--grass)] rounded-sm rotate-12 animate-pulse"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[var(--dirt)] rounded-sm -rotate-12 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--foreground)] minecraft-pixelated-text">{personalData.name}</h3>
                      <p className="text-sm text-[var(--foreground)] opacity-80 minecraft-pixelated-text">{personalData.title}</p>                      <div className="mt-4 flex justify-center space-x-2">
                        <span className="inline-block w-3 h-3 bg-[var(--grass)] rounded-full animate-pulse"></span>
                        <span className="inline-block w-3 h-3 bg-[var(--stone)] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                        <span className="inline-block w-3 h-3 bg-[var(--dirt)] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></span>
                      </div>
                      
                      {/* Floating pixel particles */}
                      <div className="absolute -z-10 inset-0">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-[var(--primary)] opacity-50 rounded-sm"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                              animationDelay: `${Math.random() * 2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="absolute -top-4 left-0 w-full">
                        <div className="flex justify-center">
                          <div className="w-3 h-3 bg-[var(--wood)] rounded-sm animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              {/* Minecraft-style decorative blocks */}
              <div className="absolute top-1/2 -left-12 w-8 h-8 bg-[var(--dirt)] rounded transform rotate-12" style={{ 
                opacity: 0,
                animation: 'minecraft-block-appear 0.5s forwards',
                animationDelay: '0.9s',
                animationFillMode: 'forwards'
              }}></div>
              <div className="absolute bottom-10 -right-10 w-10 h-10 bg-[var(--stone)] rounded transform -rotate-6" style={{ 
                opacity: 0,
                animation: 'minecraft-block-appear 0.5s forwards',
                animationDelay: '1.2s',
                animationFillMode: 'forwards'
              }}></div>
              <div className="absolute top-10 -right-8 w-6 h-6 bg-[var(--grass)] rounded transform rotate-45" style={{ 
                opacity: 0,
                animation: 'minecraft-block-appear 0.5s forwards',
                animationDelay: '1.5s',
                animationFillMode: 'forwards'
              }}></div>
              {/* Additional decorative elements */}
              <div className="absolute top-20 -left-14 w-5 h-5 bg-[var(--wood)] rounded-sm transform rotate-12" style={{ 
                opacity: 0,
                animation: 'minecraft-block-appear 0.5s forwards, float 3s ease-in-out infinite',
                animationDelay: '1.7s',
                animationFillMode: 'forwards'
              }}></div>
              <div className="absolute bottom-20 -right-16 w-7 h-7 bg-[var(--primary)] opacity-70 rounded-sm transform -rotate-12" style={{ 
                opacity: 0,
                animation: 'minecraft-block-appear 0.5s forwards, float 4s ease-in-out infinite',
                animationDelay: '2s',
                animationFillMode: 'forwards'
              }}></div>
              <div className="absolute -bottom-6 left-20 w-12 h-3 bg-[var(--secondary)] opacity-40 rounded-sm" style={{ 
                opacity: 0,
                animation: 'minecraft-block-appear 0.5s forwards',
                animationDelay: '2.2s',
                animationFillMode: 'forwards'
              }}></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
