import Link from 'next/link';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-secondary hover:text-accent mb-12 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary font-space-grotesk">
          Projects Archive
        </h1>
        
        <p className="text-secondary max-w-2xl mb-12">
          A collection of projects I've worked on, ranging from web applications and design systems 
          to experiments and open-source contributions.
        </p>
        
        <div className="grid gap-8">
          {Array(10).fill(0).map((_, index) => (
            <div 
              key={index}
              className="grid md:grid-cols-[1fr_150px_150px_100px] gap-4 items-center border-b border-[#233554] py-6"
            >
              <div>
                <h3 className="text-xl font-medium text-primary mb-2">
                  Project {index + 1}
                </h3>
                <p className="text-secondary">
                  {index % 3 === 0 
                    ? 'A full-stack web application built with Next.js, TypeScript and MongoDB'
                    : index % 3 === 1
                    ? 'Mobile app developed with React Native and Firebase'
                    : 'Design system and component library for a SaaS platform'
                  }
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 md:justify-center">
                {['React', 'TypeScript', 'Node.js'].map(tech => (
                  <span key={tech} className="tag text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="text-secondary md:text-center">
                {new Date(2020 + index, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
                  .toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </div>
              
              <div className="flex gap-4 md:justify-end">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors"
                  aria-label="GitHub Repository"
                >
                  <FiGithub size={20} />
                </a>
                {index % 2 === 0 && (
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-accent transition-colors"
                    aria-label="Live Demo"
                  >
                    <FiExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
