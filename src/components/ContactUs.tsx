import { useState } from 'react';
import { Mail, Send, Phone } from 'lucide-react';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
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
  return <section id="contact" className="bg-white text-gray-900 py-[6px]">
      <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          <h2 className="text-[48px] font-bold tracking-tight text-gray-900">
            Ask whatever you have in your mind
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Whether you have questions or are ready to discuss your business, 
            we're here to help. Reach out today.
          </p>
          
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-sky-500" />
              <a href="mailto:theflowai01@gmail.com" className="text-gray-900 hover:text-sky-600 transition-colors">
                theflowai01@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-sky-500" />
              <a href="tel:+919004452118" className="text-gray-900 hover:text-sky-600 transition-colors">
                +91 9004452118
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50/80 rounded-lg backdrop-blur-sm p-8 border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-gray-900" placeholder="Jane Smith" required />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                Email
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-gray-900" placeholder="jane@example.com" required />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                Message
              </label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full p-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-gray-900" placeholder="Hi, I am reaching out for..." required />
            </div>
            
            <button type="submit" className="w-full py-3 rounded-md bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all duration-300 text-white font-medium flex items-center justify-center gap-2 group glow-btn">
              <span>Submit</span>
              <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>;
};
export default ContactUs;