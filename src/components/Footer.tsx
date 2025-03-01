
import { Github, Twitter, Linkedin, Instagram, Mail, PhoneCall } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-flowai-black text-flowai-white pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <div className="text-2xl font-bold mb-4">Flow AI</div>
            <p className="text-flowai-white/80 mb-6 max-w-xs">
              AI Solutions for Tomorrow. We pioneer custom artificial intelligence solutions designed to transform your business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-flowai-white hover:text-purple-400 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-flowai-white hover:text-purple-400 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-flowai-white hover:text-purple-400 transition-colors duration-300">
                <Github size={20} />
              </a>
              <a href="#" className="text-flowai-white hover:text-purple-400 transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-xl font-bold mb-6">Quick Links</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#launching" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                  Launching Soon
                </a>
              </li>
              <li>
                <a href="#contact" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-xl font-bold mb-6">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={20} className="mt-1 mr-3 flex-shrink-0" />
                <a href="mailto:theflowai01@gmail.com" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300">
                  theflowai01@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <PhoneCall size={20} className="mt-1 mr-3 flex-shrink-0" />
                <a href="tel:+919004452118" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300">
                  +91 9004452118
                </a>
              </li>
            </ul>
            
            <div className="mt-8">
              <h5 className="text-xl font-bold mb-6">Services</h5>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                    AI Chatbots
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                    AI-Powered CRM
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-flowai-white/80 hover:text-purple-400 transition-colors duration-300 inline-block">
                    Ticketing Systems
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-flowai-white/10 text-center text-flowai-white/60 text-sm">
          <p>&copy; {currentYear} Flow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
