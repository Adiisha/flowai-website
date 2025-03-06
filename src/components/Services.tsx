
import { useState } from 'react';
import { MessageSquare, BarChart4, Users, TicketCheck, BookOpen, ShieldCheck, FileText, Database } from 'lucide-react';
import { useInView } from '@/lib/animate';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  id: string;
  index: number;
}

const ServiceCard = ({
  icon,
  title,
  description,
  id,
  index
}: ServiceCardProps) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/services/${id}`}
      ref={ref as React.RefObject<HTMLAnchorElement>} 
      className={`service-card h-full transition-all duration-300 block ${isInView ? 'animate-fade-in' : 'opacity-0'} hover:shadow-glow`} 
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 h-full flex flex-col relative overflow-hidden bg-[#F5F5DC]">
        <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 transition-all duration-300 text-black 
                      hover:bg-black hover:text-white glow-icon">
          {icon}
        </div>
        <h5 className="mb-3 text-xl font-bold text-black">{title}</h5>
        <p className="text-base text-black mb-4">{description}</p>
        
        <div className="mt-auto">
          <span className="px-4 py-2 bg-black text-white rounded-lg inline-flex items-center text-sm font-medium transition-all hover:bg-opacity-80">
            Learn More
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

const Services = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const services = [
    {
      icon: <MessageSquare size={24} />,
      id: "ai-chatbots",
      title: "AI Chatbots",
      description: "Build conversational AI for customer support, sales inquiries, and lead generation."
    },
    {
      icon: <BarChart4 size={24} />,
      id: "recommendation-engines",
      title: "Recommendation Engines",
      description: "Provide personalized product or content suggestions for e-commerce or streaming platforms."
    },
    {
      icon: <Users size={24} />,
      id: "ai-powered-crm",
      title: "AI-Powered CRM",
      description: "Add automation, lead scoring, and predictive analytics to basic CRM systems."
    },
    {
      icon: <TicketCheck size={24} />,
      id: "ticketing-systems",
      title: "Ticketing Systems",
      description: "Automate issue resolution workflows with AI-powered prioritization and classification."
    },
    {
      icon: <Database size={24} />,
      id: "customer-feedback-analysis",
      title: "Customer Feedback Analysis",
      description: "AI-driven tools to analyze customer feedback, identify trends, and generate actionable insights."
    },
    {
      icon: <BookOpen size={24} />,
      id: "employee-onboarding",
      title: "Employee Onboarding",
      description: "Platforms that streamline new hire processes with training material automation and task tracking."
    },
    {
      icon: <ShieldCheck size={24} />,
      id: "ai-driven-fraud-detection",
      title: "AI-Driven Fraud Detection",
      description: "Tools to monitor transactions and detect anomalies for banking, e-commerce, and other industries."
    },
    {
      icon: <FileText size={24} />,
      id: "ai-based-document-management",
      title: "AI-Based Document Management",
      description: "Intelligent platforms for organizing, searching, and extracting insights from large sets of documents."
    }
  ];

  return (
    <section id="services" className="bg-gradient-to-b from-white to-[#F5F5DC] py-16 relative">
      <div className="section-container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-[#F5F5DC] text-black text-sm font-medium rounded-full">
            Our Expertise
          </span>
          <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={`mt-4 text-3xl font-bold text-black ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            AI Solutions Tailored for Your Business
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-black">
            Discover how our cutting-edge AI services can transform your operations, enhance customer experiences, and drive growth.
          </p>
          <Link to="/services" className="mt-6 inline-block px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-opacity-80 transition-all">
            View All Services
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              id={service.id}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
