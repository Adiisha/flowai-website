
import { useRef, useEffect } from 'react';
import { MessageSquare, Users, TicketCheck, BarChart4, BookOpen, ShieldCheck, FileText } from 'lucide-react';
import { useInView, staggeredAnimation } from '@/lib/animate';

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const animProps = staggeredAnimation(index, 0.1);
  
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`card card-hover ${isInView ? animProps.className : 'opacity-0'}`}
      style={isInView ? { ...animProps.style, opacity: 1 } : animProps.style}
    >
      <div className="bg-flowai-beigeDark p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h5 className="mb-3">{title}</h5>
      <p className="text-base text-flowai-black/80">{description}</p>
    </div>
  );
};

const Services = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const services = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Chatbots",
      description: "Enhance customer engagement with smart chatbots for support and lead generation, available 24/7."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "AI-Powered CRM",
      description: "Boost sales with automation and predictive insights that transform your customer relationship management."
    },
    {
      icon: <TicketCheck className="w-8 h-8" />,
      title: "Ticketing Systems",
      description: "Speed up issue resolutions with AI-driven prioritization and intelligent automation."
    },
    {
      icon: <BarChart4 className="w-8 h-8" />,
      title: "Feedback Analysis",
      description: "Turn customer feedback into actionable insights with real-time AI analysis tools."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Employee Onboarding",
      description: "Simplify employee onboarding with automated training programs and intelligent learning paths."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Fraud Detection",
      description: "Secure transactions with real-time anomaly detection powered by advanced AI algorithms."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Document Management",
      description: "Effortlessly manage documents with intelligent search and automated categorization."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-flowai-beige to-flowai-beigeDark">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full">
            Our Expertise
          </span>
          <h2 
            ref={ref as React.RefObject<HTMLHeadingElement>}
            className={`mt-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            AI Solutions Tailored for Your Business
          </h2>
          <p className="max-w-2xl mx-auto mt-4">
            Discover how our cutting-edge AI services can transform your operations, enhance customer experiences, and drive growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
