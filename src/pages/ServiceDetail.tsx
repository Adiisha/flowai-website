
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesList } from '@/components/Services';
import { Check, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = servicesList.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Service not found</h1>
            <p className="mt-4">The service you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 inline-block btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/#services" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="bg-sky-50 p-5 rounded-full mr-6 text-sky-500">
              {service.icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
          </div>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Service Overview</h2>
            <p className="text-lg text-gray-700 mb-6">{service.detailedDescription}</p>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Why Choose Our {service.title}?</h3>
              <p className="text-gray-700">
                Our approach combines cutting-edge AI technology with deep industry expertise to deliver solutions that are not just powerful, but also practical and easy to implement. We focus on creating tools that integrate seamlessly with your existing workflows and systems.
              </p>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="bg-green-50 rounded-full p-1 mr-3 text-green-500 flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Technologies We Use</h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-sky-50 text-sky-700 rounded-full font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Implementation Process</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">1. Analysis & Planning</h3>
                <p className="text-gray-700">We analyze your business needs, data sources, and existing systems to create a customized implementation plan.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">2. Design & Development</h3>
                <p className="text-gray-700">Our team designs and develops the solution, with regular client feedback to ensure alignment with your vision.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">3. Testing & Deployment</h3>
                <p className="text-gray-700">We thoroughly test the solution before deployment, ensuring seamless integration with your existing systems.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">4. Training & Support</h3>
                <p className="text-gray-700">We provide comprehensive training for your team and ongoing support to ensure optimal utilization.</p>
              </div>
            </div>
          </section>
          
          <div className="bg-sky-50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to enhance your business with {service.title}?</h2>
            <p className="text-lg mb-6">
              Get in touch for a free consultation and discover how our solutions can drive growth and efficiency.
            </p>
            <Link to="/#contact" className="btn-primary inline-block px-8 py-3">
              Free Consultation
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
