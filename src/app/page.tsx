"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import TermsPricesChatbot from "@/components/sections/TermsPricesChatbot";
import Footer from "@/components/layout/Footer";
import BackgroundDecoration from "@/components/ui/BackgroundDecoration";
import { useContent } from "@/context/ContentContext";

export default function Home() {
  const { content, refreshing } = useContent();
  const [isClient, setIsClient] = useState(false);

  // Check if we're running on the client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && (target as HTMLAnchorElement).getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = (target as HTMLAnchorElement).getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick as EventListener);
    return () => document.removeEventListener('click', handleAnchorClick as EventListener);
  }, []);

  if (!isClient || (!content && refreshing)) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="animate-pulse text-[var(--primary)]">Loading...</div>
    </div>;
  }

  const siteConfig = content?.siteConfig || {
    sections: {
      hero: { enabled: true },
      about: { enabled: true },
      experience: { enabled: true },
      projects: { enabled: true },
      skills: { enabled: true },
      contact: { enabled: true }
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <BackgroundDecoration />
      <Header />
      <main>
        {/* Render sections conditionally based on config */}
        {(!siteConfig || siteConfig.sections.hero.enabled) && <Hero />}
        {(!siteConfig || siteConfig.sections.about.enabled) && <About />}
        {(!siteConfig || siteConfig.sections.experience.enabled) && <Experience />}
        {(!siteConfig || siteConfig.sections.projects.enabled) && <Projects />}
        {(!siteConfig || siteConfig.sections.skills.enabled) && <Skills />}
        {(!siteConfig || siteConfig.sections.contact.enabled) && <Contact />}
      </main>
      <Footer />
      {/* Floating chatbot - always rendered regardless of section config */}
      <TermsPricesChatbot />
    </div>
  );
}
