
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesList } from '@/components/Services';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Our AI Services</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover how our cutting-edge AI solutions can transform your business operations, enhance customer experiences, and drive sustainable growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
                <div className="bg-sky-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 text-sky-500">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-gray-700 mb-6 flex-grow">{service.detailedDescription}</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {service.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link to={`/services/${service.id}`} className="btn-primary text-center py-2 w-full">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              We specialize in developing tailored AI solutions that address your specific business challenges. Contact us to discuss your needs.
            </p>
            <Link to="/#contact" className="btn-primary inline-block px-8 py-3">
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
