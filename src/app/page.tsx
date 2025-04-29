import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HeroWrapper from '@/components/HeroWrapper';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroWrapper />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle />
      <ScrollToTop />
    </>
  );
}
