import { type Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Jeremiah Oladele | Resume',
  description: 'Professional resume of Jeremiah Oladele, showcasing experience, education and skills',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ThemeToggle />
      <ScrollToTop />
    </>
  );
}
