'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type SkillCategory = {
  name: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'TailwindCSS', 'Framer Motion', 'Three.js', 'GSAP']
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'GraphQL', 'REST API', 'WebSockets']
  },
  {
    name: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase']
  },
  {
    name: 'DevOps',
    skills: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Netlify', 'CI/CD', 'Linux']
  },
  {
    name: 'Design',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX', 'Responsive Design', 'Wireframing', 'Prototyping']
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  
  return (
    <section id="skills" className="py-20 md:py-32 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading flex items-center">
            <span className="text-accent font-mono mr-2">03.</span> My Skills
            <div className="ml-4 h-px bg-[#233554] flex-grow"></div>
          </h2>
        </motion.div>
        
        <div className="mt-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.name}
                className={`px-4 py-2 rounded-full border ${
                  activeCategory === index 
                    ? 'bg-accent/10 text-accent border-accent' 
                    : 'border-[#233554] text-secondary hover:text-accent hover:border-accent'
                } transition-all duration-300`}
                onClick={() => setActiveCategory(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          
          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-glow flex items-center h-full"
              >
                <div className="w-full">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    <h3 className="font-medium text-primary">{skill}</h3>
                  </div>
                  
                  <div className="w-full bg-[#0d1629] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent"
                      style={{ 
                        width: `${Math.floor(Math.random() * 40) + 60}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
