
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-flowai-black shadow-md h-20' : 'bg-transparent h-24'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-flowai-white' : 'text-flowai-black'
          }`}>
            Flow AI
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className={`navbar-item ${isScrolled ? 'text-flowai-white' : 'text-flowai-black'}`}>
            Home
          </a>
          <div className="relative group">
            <button 
              className={`navbar-item flex items-center ${isScrolled ? 'text-flowai-white' : 'text-flowai-black'}`}
              onClick={toggleServices}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              Services <ChevronDown size={16} className="ml-1" />
            </button>

            {servicesOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 bg-flowai-black text-flowai-white rounded-lg shadow-lg py-2 px-3"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <a href="#services" className="block py-2 hover:text-flowai-lightGray transition-colors duration-300">
                  Chatbots
                </a>
                <a href="#services" className="block py-2 hover:text-flowai-lightGray transition-colors duration-300">
                  AI-Powered CRM
                </a>
                <a href="#services" className="block py-2 hover:text-flowai-lightGray transition-colors duration-300">
                  Ticketing Systems
                </a>
                <a href="#services" className="block py-2 hover:text-flowai-lightGray transition-colors duration-300">
                  Customer Feedback Analysis
                </a>
              </div>
            )}
          </div>
          <a href="#about" className={`navbar-item ${isScrolled ? 'text-flowai-white' : 'text-flowai-black'}`}>
            About Us
          </a>
          <a href="#launching" className={`navbar-item ${isScrolled ? 'text-flowai-white' : 'text-flowai-black'}`}>
            Launching Soon
          </a>
          <a href="#contact" className={`navbar-item ${isScrolled ? 'text-flowai-white' : 'text-flowai-black'}`}>
            Contact
          </a>
        </div>

        {/* Mobile Nav Button */}
        <button 
          onClick={toggleMenu} 
          className={`md:hidden ${isScrolled ? 'text-flowai-white' : 'text-flowai-black'}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-flowai-black text-flowai-white py-4 px-6 shadow-md animate-fade-in">
          <a href="#" className="block py-3 navbar-item text-flowai-white" onClick={toggleMenu}>
            Home
          </a>
          <div>
            <button 
              onClick={toggleServices}
              className="flex items-center justify-between w-full py-3 navbar-item text-flowai-white"
            >
              Services <ChevronDown size={16} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {servicesOpen && (
              <div className="pl-4 py-2 space-y-2 animate-fade-in">
                <a href="#services" className="block py-2 text-flowai-lightGray hover:text-flowai-white transition-colors duration-300" onClick={toggleMenu}>
                  Chatbots
                </a>
                <a href="#services" className="block py-2 text-flowai-lightGray hover:text-flowai-white transition-colors duration-300" onClick={toggleMenu}>
                  AI-Powered CRM
                </a>
                <a href="#services" className="block py-2 text-flowai-lightGray hover:text-flowai-white transition-colors duration-300" onClick={toggleMenu}>
                  Ticketing Systems
                </a>
                <a href="#services" className="block py-2 text-flowai-lightGray hover:text-flowai-white transition-colors duration-300" onClick={toggleMenu}>
                  Customer Feedback Analysis
                </a>
              </div>
            )}
          </div>
          <a href="#about" className="block py-3 navbar-item text-flowai-white" onClick={toggleMenu}>
            About Us
          </a>
          <a href="#launching" className="block py-3 navbar-item text-flowai-white" onClick={toggleMenu}>
            Launching Soon
          </a>
          <a href="#contact" className="block py-3 navbar-item text-flowai-white" onClick={toggleMenu}>
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
