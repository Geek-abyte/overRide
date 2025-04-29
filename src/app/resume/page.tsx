'use client';

import Link from 'next/link';
import { FiArrowLeft, FiDownload, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-secondary hover:text-accent mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary font-space-grotesk">
              Resume
            </h1>
            <p className="text-secondary max-w-2xl mb-6">
              My professional experience, education, and skills.
            </p>
          </div>
          
          <div className="flex mt-6 md:mt-0">
            <a 
              href="/resume.pdf" 
              download
              className="flex items-center border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent/10 transition-colors mr-3"
            >
              <FiDownload className="mr-2" />
              Download PDF
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent/10 transition-colors"
            >
              <FiEye className="mr-2" />
              View PDF
            </a>
          </div>
        </div>
        
        <div className="grid gap-12">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-primary border-b border-[#233554] pb-3 mb-6">Education</h2>
            <div className="card-glow mb-6">
              <h3 className="text-xl font-bold text-primary mb-1">Master of Science in Computer Science</h3>
              <p className="text-accent font-mono mb-1">Stanford University</p>
              <p className="text-secondary text-sm mb-4">September 2019 - June 2021</p>
              <p className="text-secondary">
                Specialized in Artificial Intelligence and Human-Computer Interaction. Thesis on "Generative Adversarial Networks for Creative 3D Modeling."
              </p>
            </div>
            
            <div className="card-glow">
              <h3 className="text-xl font-bold text-primary mb-1">Bachelor of Science in Computer Engineering</h3>
              <p className="text-accent font-mono mb-1">Massachusetts Institute of Technology</p>
              <p className="text-secondary text-sm mb-4">September 2015 - June 2019</p>
              <p className="text-secondary">
                Graduated with honors. Focused on embedded systems and software engineering.
              </p>
            </div>
          </motion.div>
          
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-primary border-b border-[#233554] pb-3 mb-6">Experience</h2>
            
            <div className="card-glow mb-6">
              <h3 className="text-xl font-bold text-primary mb-1">Senior Software Engineer</h3>
              <p className="text-accent font-mono mb-1">Google</p>
              <p className="text-secondary text-sm mb-4">January 2022 - Present</p>
              <ul className="text-secondary list-disc pl-6 space-y-2">
                <li>Lead developer for Google's internal design system, improving component reusability and accessibility.</li>
                <li>Architected and implemented frontend systems handling millions of daily users.</li>
                <li>Mentored junior engineers and conducted technical interviews for prospective team members.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
                <span className="tag">GraphQL</span>
                <span className="tag">Node.js</span>
                <span className="tag">Cloud Technologies</span>
              </div>
            </div>
            
            <div className="card-glow mb-6">
              <h3 className="text-xl font-bold text-primary mb-1">Frontend Developer</h3>
              <p className="text-accent font-mono mb-1">Facebook</p>
              <p className="text-secondary text-sm mb-4">June 2019 - December 2021</p>
              <ul className="text-secondary list-disc pl-6 space-y-2">
                <li>Developed and maintained React components for Facebook's core platforms.</li>
                <li>Improved application performance by 35% through code optimization and lazy loading.</li>
                <li>Collaborated with design teams to implement consistent UI/UX experiences.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="tag">React</span>
                <span className="tag">JavaScript</span>
                <span className="tag">CSS</span>
                <span className="tag">Redux</span>
                <span className="tag">Jest</span>
              </div>
            </div>
            
            <div className="card-glow">
              <h3 className="text-xl font-bold text-primary mb-1">Software Engineering Intern</h3>
              <p className="text-accent font-mono mb-1">Microsoft</p>
              <p className="text-secondary text-sm mb-4">May 2018 - August 2018</p>
              <ul className="text-secondary list-disc pl-6 space-y-2">
                <li>Contributed to the development of Visual Studio Code's extension API.</li>
                <li>Built internal tools for developer productivity using TypeScript and Node.js.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="tag">TypeScript</span>
                <span className="tag">Node.js</span>
                <span className="tag">VS Code API</span>
              </div>
            </div>
          </motion.div>
          
          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-primary border-b border-[#233554] pb-3 mb-6">Certifications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-glow">
                <h3 className="text-xl font-bold text-primary mb-1">AWS Solutions Architect</h3>
                <p className="text-accent font-mono mb-1">Amazon Web Services</p>
                <p className="text-secondary text-sm">June 2022</p>
              </div>
              
              <div className="card-glow">
                <h3 className="text-xl font-bold text-primary mb-1">Professional Scrum Master</h3>
                <p className="text-accent font-mono mb-1">Scrum.org</p>
                <p className="text-secondary text-sm">March 2021</p>
              </div>
              
              <div className="card-glow">
                <h3 className="text-xl font-bold text-primary mb-1">Google Cloud Certified</h3>
                <p className="text-accent font-mono mb-1">Google Cloud Platform</p>
                <p className="text-secondary text-sm">November 2020</p>
              </div>
              
              <div className="card-glow">
                <h3 className="text-xl font-bold text-primary mb-1">TensorFlow Developer</h3>
                <p className="text-accent font-mono mb-1">Google</p>
                <p className="text-secondary text-sm">August 2020</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
