'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

type ProjectType = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  externalUrl?: string;
  featured: boolean;
};

const projects: ProjectType[] = [
  {
    title: 'Immersive Portfolio',
    description: 'A creative developer portfolio with interactive 3D elements, smooth animations, and a unique user experience. Built with React Three Fiber and GSAP for high-performance animations.',
    image: '/projects/portfolio.jpg',
    technologies: ['React', 'Three.js', 'GSAP', 'TailwindCSS'],
    githubUrl: 'https://github.com',
    externalUrl: 'https://example.com',
    featured: true
  },
  {
    title: 'AI Code Assistant',
    description: 'An intelligent code completion and suggestion tool for developers, leveraging machine learning to provide context-aware coding assistance across multiple programming languages.',
    image: '/projects/ai-assistant.jpg',
    technologies: ['TypeScript', 'Python', 'TensorFlow', 'VS Code API'],
    githubUrl: 'https://github.com',
    externalUrl: 'https://example.com',
    featured: true
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, user authentication, shopping cart, payment processing, and order tracking functionalities.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'MongoDB', 'Stripe', 'AWS'],
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    title: 'Crypto Dashboard',
    description: 'Real-time cryptocurrency monitoring dashboard with interactive charts, portfolio tracking, and notifications for price changes.',
    image: '/projects/crypto.jpg',
    technologies: ['React', 'D3.js', 'WebSockets', 'Redux'],
    githubUrl: 'https://github.com',
    externalUrl: 'https://example.com',
    featured: false
  },
  {
    title: 'Smart Home App',
    description: 'Mobile application for controlling smart home devices with voice commands, automation rules, and energy consumption analytics.',
    image: '/projects/smarthome.jpg',
    technologies: ['React Native', 'Node.js', 'GraphQL', 'IoT Protocols'],
    githubUrl: 'https://github.com',
    externalUrl: 'https://example.com',
    featured: false
  },
  {
    title: 'Content Management System',
    description: 'Headless CMS with a customizable dashboard, content modeling, API generation, and multi-environment publishing workflow.',
    image: '/projects/cms.jpg',
    technologies: ['JavaScript', 'Express', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com',
    featured: false
  }
];

export default function Projects() {
  const [showMore, setShowMore] = useState(false);
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);
  
  return (
    <section id="projects" className="py-20 md:py-32 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >          <h2 className="section-heading flex items-center">
            <span className="text-accent font-mono mr-2">04.</span> Some Things I've Built
            <div className="ml-4 h-px bg-[#233554] flex-grow"></div>
          </h2>
        </motion.div>
        
        {/* Featured Projects */}
        <div className="mt-10 space-y-30">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="relative mb-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={`grid md:grid-cols-12 items-center gap-6 md:gap-10 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Project Image */}
                <div className={`md:col-span-7 relative group ${
                  index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                }`}>
                  <div className="absolute -inset-2 bg-accent/5 rounded-lg filter blur-lg group-hover:bg-accent/10 group-hover:blur-xl transition-all duration-300 -z-10"></div>
                  <a 
                    href={project.externalUrl || project.githubUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full h-full rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-video bg-[#112240] rounded-lg overflow-hidden">
                      {/* Project thumbnail placeholder - replace with actual image when available */}
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-accent/50">{project.title} Screenshot</span>
                        {/* When you have a real image, use this:
                        <Image 
                          src={project.image}
                          fill
                          alt={project.title}
                          className="object-cover mix-blend-screen opacity-60 md:opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                        />
                        */}
                      </div>
                    </div>
                  </a>
                </div>
                
                {/* Project Info */}
                <div className={`md:col-span-5 ${
                  index % 2 === 0 ? 'md:order-2 text-right' : 'md:order-1 text-left'
                }`}>
                  <p className="text-accent font-mono text-sm mb-1">Featured Project</p>
                  <h3 className="text-2xl font-bold text-[#ccd6f6] mb-3">
                    <a 
                      href={project.externalUrl || project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {project.title}
                    </a>
                  </h3>
                  
                  <div className="card-glow z-10 my-6">
                    <p className="text-[#8892b0]">
                      {project.description}
                    </p>
                  </div>
                  
                  <ul className={`flex flex-wrap gap-3 text-sm text-[#8892b0] font-mono mb-6 ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}>
                    {project.technologies.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                  
                  <div className={`flex gap-4 text-[#ccd6f6] ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub Repository`}
                        className="hover:text-accent transition-colors"
                      >
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.externalUrl && (
                      <a 
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Live Site`}
                        className="hover:text-accent transition-colors"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-[#ccd6f6] mb-10">
            Other Noteworthy Projects
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.slice(0, showMore ? otherProjects.length : 3).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="card-glow group h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"                          aria-label={`${project.title} GitHub Repository`}
                          className="text-[#ccd6f6] hover:text-accent transition-colors"
                        >
                          <FiGithub size={18} />
                        </a>
                      )}
                      {project.externalUrl && (
                        <a 
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"                          aria-label={`${project.title} Live Site`}
                          className="text-[#ccd6f6] hover:text-accent transition-colors"
                        >
                          <FiExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                    <h4 className="text-xl font-bold text-[#ccd6f6] mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                    <p className="text-[#8892b0] mb-6">
                    {project.description}
                  </p>
                </div>
                
                <ul className="flex flex-wrap gap-2 text-xs text-[#8892b0] font-mono">
                  {project.technologies.map((tech, i) => (
                    <li key={i} className="tag">{tech}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
            {otherProjects.length > 3 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowMore(!showMore)}
                className="border border-accent text-accent px-6 py-3 rounded-md hover:bg-accent/10 transition-colors mr-4"
              >
                {showMore ? 'Show Less' : 'Show More'}
              </button>
              
              <Link
                href="/projects"
                className="border border-accent text-accent px-6 py-3 rounded-md hover:bg-accent/10 transition-colors"
              >
                View All Projects
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
