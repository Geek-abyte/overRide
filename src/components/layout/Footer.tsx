import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-[var(--background)] border-t border-[var(--secondary)] border-opacity-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">          <div className="mb-4 md:mb-0">
            <p className="text-[var(--foreground)] opacity-70 text-sm font-secondary">
              &copy; {currentYear} Jeremiah Oladele. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center">
            <p className="text-[var(--foreground)] opacity-70 text-sm flex items-center font-secondary">
              Crafted with <FaHeart className="text-[var(--primary)] mx-1" size={14} /> and blocks
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-[var(--foreground)] opacity-50 text-xs font-secondary">
            Inspired by the blocky wonders of Minecraft. No actual blocks were harmed in the making of this website.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
