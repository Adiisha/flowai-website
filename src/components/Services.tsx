import { useState, useEffect, useRef } from 'react';
import { MessageSquare, BarChart4, Users, TicketCheck, BookOpen, ShieldCheck, FileText, Database, Layers, Settings } from 'lucide-react';
import { useInView } from '@/lib/animate';
interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  technologies: string[];
  index: number;
}
const ServiceCard = ({
  icon,
  title,
  description,
  technologies,
  index
}: ServiceCardProps) => {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [isHovered, setIsHovered] = useState(false);
  return <div ref={ref as React.RefObject<HTMLDivElement>} className={`card card-hover relative overflow-hidden transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{
    animationDelay: `${index * 100}ms`
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative z-10 p-6">
        <div className={`bg-gray-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 transition-all duration-300 ${isHovered ? 'bg-sky-50 text-sky-500' : 'text-gray-700'}`}>
          {icon}
        </div>
        <h5 className="mb-3">{title}</h5>
        <p className="text-base text-flowai-black/80 mb-4">{description}</p>
        
        <div className="flex flex-wrap mt-3">
          {technologies.map((tech, i) => <span key={i} className="tech-badge">
              {tech}
            </span>)}
        </div>
      </div>
    </div>;
};
const Services = () => {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const services = [{
    icon: <MessageSquare size={24} />,
    title: "AI Chatbots",
    description: "Build conversational AI for customer support, sales inquiries, and lead generation.",
    technologies: ["Rasa", "Botpress", "DialogFlow"]
  }, {
    icon: <BarChart4 size={24} />,
    title: "Recommendation Engines",
    description: "Provide personalized product or content suggestions for e-commerce or streaming platforms.",
    technologies: ["TensorFlow", "PyTorch", "Surprise"]
  }, {
    icon: <Users size={24} />,
    title: "AI-Powered CRM",
    description: "Add automation, lead scoring, and predictive analytics to basic CRM systems.",
    technologies: ["SuiteCRM", "Odoo", "AI Extensions"]
  }, {
    icon: <TicketCheck size={24} />,
    title: "Ticketing Systems",
    description: "Automate issue resolution workflows with AI-powered prioritization and classification.",
    technologies: ["Zendesk", "Freshdesk APIs", "Custom Solutions"]
  }, {
    icon: <Database size={24} />,
    title: "Customer Feedback Analysis",
    description: "AI-driven tools to analyze customer feedback, identify trends, and generate actionable insights.",
    technologies: ["MonkeyLearn", "VaderSentiment", "Custom ML Models"]
  }, {
    icon: <BookOpen size={24} />,
    title: "Employee Onboarding",
    description: "Platforms that streamline new hire processes with training material automation and task tracking.",
    technologies: ["Talmundo", "WorkBright", "Custom Workflows"]
  }, {
    icon: <ShieldCheck size={24} />,
    title: "AI-Driven Fraud Detection",
    description: "Tools to monitor transactions and detect anomalies for banking, e-commerce, and other industries.",
    technologies: ["FraudLabs Pro", "DataRobot", "Custom Algorithms"]
  }, {
    icon: <FileText size={24} />,
    title: "AI-Based Document Management",
    description: "Intelligent platforms for organizing, searching, and extracting insights from large sets of documents.",
    technologies: ["Papermerge", "Google DocAI", "Custom Solutions"]
  }];
  return <section id="services" className="bg-gradient-to-b from-white to-gray-50 py-[86px]">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            Our Expertise
          </span>
          <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={`mt-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            AI Solutions Tailored for Your Business
          </h2>
          <p className="max-w-2xl mx-auto mt-4">
            Discover how our cutting-edge AI services can transform your operations, enhance customer experiences, and drive growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} technologies={service.technologies} index={index} />)}
        </div>
      </div>
    </section>;
};
export default Services;