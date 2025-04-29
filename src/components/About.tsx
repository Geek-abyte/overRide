'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const skills = [
    'JavaScript (ES6+)', 
    'TypeScript', 
    'React', 
    'Next.js', 
    'Node.js', 
    'Express',
    'TailwindCSS',
    'GraphQL',
    'MongoDB',
    'PostgreSQL',
    'Redux',
    'Three.js'
  ];

  return (
    <section 
      id="about" 
      className="py-20 md:py-32 px-6 relative"
      ref={containerRef}
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#112240]/30 -z-10"></div>
      
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading flex items-center">
            <span className="text-accent font-mono mr-2">01.</span> About Me
            <div className="ml-4 h-px bg-[#233554] flex-grow"></div>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-7 gap-12">
          {/* Text content */}
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4 text-[#8892b0]">
              <p>
                Hello! I'm Jeremiah, a passionate software developer with a keen interest in creating 
                digital experiences that live on the internet. My journey in web development began back in 
                2018 when I decided to try customizing a WordPress theme — turns out hacking together a custom 
                theme taught me a lot about HTML & CSS!
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of working at <span className="text-accent">various organizations</span>, 
                contributing to accessible, inclusive products and digital solutions. My main focus these days 
                is building immersive, performant web applications that deliver exceptional user experiences.
              </p>
              <p>
                I also recently launched a course that covers everything you need to build a web app with the 
                Spotify API using React, Node.js, and good software architecture principles.
              </p>
              <p>Here are a few technologies I've been working with recently:</p>
            </div>

            <ul className="grid grid-cols-2 gap-2 mt-6">
              {skills.map((skill, index) => (
                <motion.li 
                  key={skill}
                  className="flex items-center text-[#8892b0]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <span className="text-accent mr-2">▹</span> {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Image */}
          <motion.div 
            className="md:col-span-3 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-accent/30 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 bg-background overflow-hidden rounded-lg">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-[#112240] flex items-center justify-center text-accent">
                  <span className="text-center text-sm">Profile Image</span>
                  {/* When you have a real image, use this:
                  <Image 
                    src="/profile.jpg"
                    fill
                    alt="Jeremiah Oladele"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  */}
                </div>
                <div className="absolute inset-0 border-2 border-accent rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300 z-10"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
