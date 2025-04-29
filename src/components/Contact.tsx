'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 relative">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8"
        >
          <p className="text-accent font-mono mb-2">05. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#ccd6f6]">Get In Touch</h2>
        </motion.div>
        
        <motion.p 
          className="text-[#8892b0] mb-12 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          I'm currently open to new opportunities and collaborations. Whether you have a question, 
          a project in mind, or just want to say hello, I'll do my best to get back to you!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <a 
            href="mailto:hello@jeremiah.dev" 
            className="inline-block bg-transparent hover:bg-accent/10 text-accent border border-accent px-7 py-4 rounded-md font-medium transition-colors duration-300"
          >
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
