
import { useState, useEffect } from 'react';
import { Menu, X, Home, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      // Hide navbar when scrolling down after 100px
      setVisible(
        (prevScrollPos > currentScrollPos) || 
        currentScrollPos < 100
      );
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="mx-auto max-w-7xl mt-4 mb-8 px-6 md:px-8">
        <div className="relative flex justify-between items-center bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg hover:bg-white/90 transition-all duration-300">
          <div className="flex-1 flex items-center justify-between">
            <a href="#" className="flex items-center">
              <span className="text-xl font-bold text-sky-500">Flow AI</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="navbar-item flex items-center">
                <Home className="mr-1 h-4 w-4 animate-pulse-subtle" />
                Home
              </a>
              <a href="#roadmap" className="navbar-item">Process</a>
              <a href="#services" className="navbar-item">Services</a>
              <a href="#about" className="navbar-item">Our Mission</a>
              <a href="#contact" className="navbar-item">Contact</a>
              <a href="#faq" className="navbar-item">FAQs</a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute left-0 right-0 z-20 md:hidden bg-white/95 backdrop-blur-md shadow-lg rounded-b-xl transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 text-center">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </a>
            <a
              href="#roadmap"
              className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </a>
            <a
              href="#services"
              className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Mission
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Contact
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
