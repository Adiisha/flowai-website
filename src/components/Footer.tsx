
import { Mail, Phone, Twitter, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-flowai-black text-flowai-white py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Flow<span className="text-teal-500">AI</span></h3>
            <p className="text-flowai-white/80 mb-6">
              Empowering businesses with custom AI solutions to drive innovation, efficiency, and growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-flowai-white hover:text-teal-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-flowai-white hover:text-teal-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-flowai-white hover:text-teal-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-flowai-white hover:text-teal-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-flowai-white/80 hover:text-teal-500 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-flowai-white/80 hover:text-teal-500 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-flowai-white/80 hover:text-teal-500 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-flowai-white/80 hover:text-teal-500 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-flowai-white/80 hover:text-teal-500 transition-colors">
                    AI Chatbots
                  </a>
                </li>
                <li>
                  <a href="#" className="text-flowai-white/80 hover:text-teal-500 transition-colors">
                    AI-Powered CRM
                  </a>
                </li>
                <li>
                  <a href="#" className="text-flowai-white/80 hover:text-teal-500 transition-colors">
                    Ticketing Systems
                  </a>
                </li>
                <li>
                  <a href="#" className="text-flowai-white/80 hover:text-teal-500 transition-colors">
                    Feedback Analysis
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-1 text-teal-500" />
                  <a href="mailto:theflowai01@gmail.com" className="text-flowai-white/80 hover:text-teal-500 transition-colors">
                    theflowai01@gmail.com
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-1 text-teal-500" />
                  <a href="tel:+919004452118" className="text-flowai-white/80 hover:text-teal-500 transition-colors">
                    +91 9004452118
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-flowai-white/10 text-center text-flowai-white/60">
          <p>© {new Date().getFullYear()} FlowAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
