
import { useState } from 'react';
import { Mail, Send, Phone } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-flowai-black text-flowai-white">
      <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          <h2 className="text-[48px] font-bold tracking-tight text-flowai-white">
            Ask whatever you have in your mind
          </h2>
          <p className="mt-6 text-lg text-flowai-white/90">
            Whether you have questions or are ready to discuss your business, 
            we're here to help. Reach out today.
          </p>
          
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              <a href="mailto:theflowai01@gmail.com" className="text-flowai-white hover:text-flowai-lightGray transition-colors">
                theflowai01@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6" />
              <a href="tel:+919004452118" className="text-flowai-white hover:text-flowai-lightGray transition-colors">
                +91 9004452118
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-flowai-black/40 rounded-lg backdrop-blur-sm p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-flowai-black/60 rounded-md border border-flowai-white/20 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-flowai-white"
                placeholder="Jane Smith"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-flowai-black/60 rounded-md border border-flowai-white/20 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-flowai-white"
                placeholder="jane@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 bg-flowai-black/60 rounded-md border border-flowai-white/20 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-flowai-white"
                placeholder="Hi, I am reaching out for..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300 text-white font-medium flex items-center justify-center gap-2 group glow-btn"
            >
              <span>Submit</span>
              <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
