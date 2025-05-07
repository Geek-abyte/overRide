import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalData } from '@/data/portfolio';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitted: false,
    error: false
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, you would handle form submission to a backend
    // For this demo, we'll just simulate a successful submission
    setFormState({
      ...formState,
      submitted: true,
      name: '',
      email: '',
      message: ''
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <section id="contact" className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-main">
            <span className="section-title text-[var(--foreground)]">Contact</span>
          </h2>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)] font-main">Get In Touch</h3>
                <p className="text-[var(--foreground)] opacity-90 mb-8 font-secondary">
                I&apos;m currently looking for new opportunities to craft amazing digital experiences.
                Whether you have a question, a project idea, or just want to say hello, feel free to reach out!
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-[var(--foreground)] opacity-90 font-secondary">
                  <FaEnvelope className="mr-3 text-[var(--primary)]" />
                  <a 
                    href={`mailto:${personalData.email}`}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    {personalData.email}
                  </a>
                </div>
                
                <div className="flex items-center text-[var(--foreground)] opacity-90 font-secondary">
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <div className="w-3 h-3 bg-[var(--primary)] rounded-full"></div>
                  </div>
                  <span>{personalData.location}</span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-4 text-[var(--foreground)] font-main">Find me on</h4>
              
              <div className="flex space-x-6">
                <a 
                  href={personalData.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a 
                  href={personalData.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a 
                  href={personalData.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
            
            <div>              {formState.submitted ? (
                <div className="bg-[var(--grass)] bg-opacity-20 border-2 border-[var(--grass)] rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)] font-main">Message Sent!</h3>                  <p className="text-[var(--foreground)] opacity-90 font-secondary">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible!
                  </p>
                  <button
                    onClick={() => setFormState({ ...formState, submitted: false })}
                    className="mt-6 minecraft-btn bg-[var(--primary)] hover:bg-[var(--primary)]/80 px-6 py-2 rounded font-main"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--grass)] to-[var(--primary)] rounded-lg blur opacity-20"></div>
                    <div className="relative bg-[var(--background)] rounded-lg p-6 border-2 border-[var(--stone)] border-opacity-50">
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-[var(--foreground)] mb-2 font-medium font-main">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-[var(--stone)] bg-opacity-20 text-[var(--foreground)] border-2 border-[var(--stone)] border-opacity-30 rounded px-4 py-2 focus:outline-none focus:border-[var(--primary)] font-secondary"
                        />
                      </div>
                        <div className="mb-4">
                        <label htmlFor="email" className="block text-[var(--foreground)] mb-2 font-medium font-main">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-[var(--stone)] bg-opacity-20 text-[var(--foreground)] border-2 border-[var(--stone)] border-opacity-30 rounded px-4 py-2 focus:outline-none focus:border-[var(--primary)] font-secondary"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="message" className="block text-[var(--foreground)] mb-2 font-medium font-main">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full bg-[var(--stone)] bg-opacity-20 text-[var(--foreground)] border-2 border-[var(--stone)] border-opacity-30 rounded px-4 py-2 focus:outline-none focus:border-[var(--primary)] font-secondary"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="minecraft-btn bg-[var(--primary)] hover:bg-[var(--primary)]/80 px-6 py-3 rounded w-full font-main"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
