'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type JobType = {
  company: string;
  url: string;
  title: string;
  duration: string;
  description: string[];
  technologies: string[];
};

const jobs: JobType[] = [
  {
    company: 'Innovative Tech',
    url: 'https://example.com',
    title: 'Senior Software Engineer',
    duration: 'January 2023 - Present',
    description: [
      'Lead the development of a full-stack web application using Next.js, TypeScript, and GraphQL',
      'Architected and implemented a scalable state management solution reducing render cycles by 40%',
      'Mentored junior developers and established coding standards across the frontend team',
      'Collaborated with design and product teams to deliver pixel-perfect, accessible user interfaces'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'TailwindCSS']
  },
  {
    company: 'Digital Solutions Agency',
    url: 'https://example.com',
    title: 'Frontend Developer',
    duration: 'March 2021 - December 2022',
    description: [
      'Developed responsive web applications for various clients in the fintech and healthcare sectors',
      'Implemented complex animations and interactive elements using GSAP and Three.js',
      'Optimized web performance achieving 95+ scores on Google Lighthouse',
      'Built custom content management solutions with headless CMS integrations'
    ],
    technologies: ['JavaScript', 'React', 'GSAP', 'Three.js', 'Styled Components']
  },
  {
    company: 'Tech Startup',
    url: 'https://example.com',
    title: 'Full Stack Developer',
    duration: 'June 2019 - February 2021',
    description: [
      'Built and maintained REST APIs using Node.js, Express, and MongoDB',
      'Designed and implemented database schemas and indexing strategies',
      'Created efficient data visualization dashboards with D3.js and React',
      'Integrated third-party services and APIs including payment gateways and authentication systems'
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'D3.js']
  },
  {
    company: 'Freelance',
    url: '#',
    title: 'Web Developer',
    duration: 'January 2018 - May 2019',
    description: [
      'Designed and developed custom websites for small businesses and individuals',
      'Created WordPress themes and plugins to extend functionality',
      'Implemented SEO strategies resulting in increased organic traffic',
      'Provided ongoing maintenance and support for client websites'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress']
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <section id="experience" className="py-20 md:py-32 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading flex items-center">
            <span className="text-accent font-mono mr-2">02.</span> Where I've Worked
            <div className="ml-4 h-px bg-[#233554] flex-grow"></div>
          </h2>
        </motion.div>
        
        <div className="mt-10 grid md:grid-cols-[200px_1fr] gap-8">
          {/* Tabs */}
          <div className="overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal">
            <div className="flex md:flex-col border-b md:border-b-0 md:border-l border-[#233554]">
              {jobs.map((job, index) => (
                <button
                  key={index}
                  className={`px-5 py-2.5 text-sm font-mono text-left transition-all duration-200 hover:bg-[#172a45]/30 hover:text-accent border-b-2 md:border-b-0 md:border-l-2 ${
                    activeTab === index
                      ? 'text-accent border-accent bg-[#172a45]/30 md:border-l-accent'
                      : 'text-[#8892b0] border-transparent md:border-l-[#233554]'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {job.company}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-[#ccd6f6]">
              {jobs[activeTab].title}{' '}
              <span className="text-accent">@ {' '}
                <a 
                  href={jobs[activeTab].url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {jobs[activeTab].company}
                </a>
              </span>
            </h3>
            
            <p className="text-sm text-[#8892b0] font-mono mt-1 mb-4">
              {jobs[activeTab].duration}
            </p>
            
            <ul className="space-y-2.5">
              {jobs[activeTab].description.map((item, index) => (
                <li key={index} className="flex text-[#8892b0]">
                  <span className="text-accent mr-2 mt-1">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {jobs[activeTab].technologies.map((tech) => (
                <span key={tech} className="tag text-[#8892b0]">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
