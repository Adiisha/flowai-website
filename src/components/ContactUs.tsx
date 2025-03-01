
import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

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
        
        <div className="bg-flowai-black">
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
                className="w-full p-3 bg-flowai-black rounded-md border border-flowai-gray/30 focus:outline-none focus:border-flowai-white text-flowai-white"
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
                className="w-full p-3 bg-flowai-black rounded-md border border-flowai-gray/30 focus:outline-none focus:border-flowai-white text-flowai-white"
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
                className="w-full p-3 bg-flowai-black rounded-md border border-flowai-gray/30 focus:outline-none focus:border-flowai-white text-flowai-white"
                placeholder="Hi, I am reaching out for..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-[#6c5ce7] hover:bg-[#5b47e5] transition-colors text-white font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
