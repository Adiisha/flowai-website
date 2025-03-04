
import { useState } from 'react';
import { MessageSquare, BarChart4, Users, TicketCheck, BookOpen, ShieldCheck, FileText, Database, Info } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  benefits: string[];
  index: number;
}

const ServiceCard = ({
  icon,
  title,
  description,
  detailedDescription,
  technologies,
  benefits,
  index
}: ServiceCardProps) => {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [isFlipped, setIsFlipped] = useState(false);
  
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>} 
      className={`flip-card ${isFlipped ? 'flipped' : ''} ${isInView ? 'animate-fade-in' : 'opacity-0'}`} 
      style={{
        animationDelay: `${index * 100}ms`,
        height: "100%",
        minHeight: "400px"
      }}
      onClick={toggleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="bg-gray-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 transition-all duration-300 text-gray-700 hover:bg-sky-50 hover:text-sky-500">
            {icon}
          </div>
          <h5 className="mb-3 text-xl font-bold">{title}</h5>
          <p className="text-base text-gray-700 mb-4">{description}</p>
          
          <div className="flex flex-wrap mt-3 justify-center gap-2">
            {technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-sky-500">
            <Info size={14} />
            <span>Click for details</span>
          </div>
        </div>
        
        <div className="flip-card-back">
          <h5 className="mb-4 text-xl font-bold">{title}</h5>
          <p className="text-base text-gray-700 mb-4">{detailedDescription}</p>
          
          <div className="mb-4">
            <h6 className="font-semibold mb-2">Key Benefits:</h6>
            <ul className="text-left text-sm">
              {benefits.map((benefit, i) => (
                <li key={i} className="mb-1 flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap mt-3 justify-center gap-2">
            {technologies.map((tech, i) => (
              <span key={i} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-sky-500">
            <Info size={14} />
            <span>Click to go back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  
  const services = [
    {
      icon: <MessageSquare size={24} />,
      title: "AI Chatbots",
      description: "Build conversational AI for customer support, sales inquiries, and lead generation.",
      detailedDescription: "Our advanced AI chatbots provide human-like interactions to handle customer queries, qualify leads, and improve engagement across all your digital channels.",
      technologies: ["Rasa", "Botpress", "DialogFlow", "NLP", "Custom Training"],
      benefits: [
        "24/7 customer support without human intervention",
        "Reduced response time from hours to seconds",
        "Seamless integration with existing platforms",
        "Continuous learning and improvement",
        "Multilingual support capabilities"
      ]
    },
    {
      icon: <BarChart4 size={24} />,
      title: "Recommendation Engines",
      description: "Provide personalized product or content suggestions for e-commerce or streaming platforms.",
      detailedDescription: "Our AI-powered recommendation systems analyze user behavior to suggest relevant products or content, increasing engagement and conversion rates.",
      technologies: ["TensorFlow", "PyTorch", "Surprise", "Collaborative Filtering", "Content-Based Filtering"],
      benefits: [
        "Increased average order value by 15-30%",
        "Higher user engagement and retention",
        "Improved customer satisfaction and loyalty",
        "Real-time personalization capabilities",
        "Advanced A/B testing frameworks"
      ]
    },
    {
      icon: <Users size={24} />,
      title: "AI-Powered CRM",
      description: "Add automation, lead scoring, and predictive analytics to basic CRM systems.",
      detailedDescription: "Transform your customer relationship management with AI-powered insights, automated workflows, and predictive lead scoring to prioritize high-value opportunities.",
      technologies: ["SuiteCRM", "Odoo", "AI Extensions", "Predictive Analytics", "Data Mining"],
      benefits: [
        "Automated lead qualification and prioritization",
        "Predictive customer behavior insights",
        "Reduced manual data entry by 70%",
        "Improved sales forecast accuracy",
        "Customized customer journey mapping"
      ]
    },
    {
      icon: <TicketCheck size={24} />,
      title: "Ticketing Systems",
      description: "Automate issue resolution workflows with AI-powered prioritization and classification.",
      detailedDescription: "Our intelligent ticketing solutions use AI to categorize, prioritize, and route issues to the right teams while providing automated solutions for common problems.",
      technologies: ["Zendesk", "Freshdesk APIs", "Custom Solutions", "Automation Rules", "Sentiment Analysis"],
      benefits: [
        "Reduced resolution time by up to 60%",
        "Automatic prioritization of critical issues",
        "Intelligent routing to appropriate teams",
        "Suggested solutions based on historical data",
        "Comprehensive analytics dashboard"
      ]
    },
    {
      icon: <Database size={24} />,
      title: "Customer Feedback Analysis",
      description: "AI-driven tools to analyze customer feedback, identify trends, and generate actionable insights.",
      detailedDescription: "Leverage the power of AI to extract meaningful insights from customer reviews, surveys, and social media mentions to drive product improvements.",
      technologies: ["MonkeyLearn", "VaderSentiment", "Custom ML Models", "Natural Language Processing", "Topic Modeling"],
      benefits: [
        "Identify emerging customer concerns in real-time",
        "Quantify qualitative feedback at scale",
        "Track sentiment trends over time",
        "Discover hidden patterns in customer feedback",
        "Prioritize product improvements based on data"
      ]
    },
    {
      icon: <BookOpen size={24} />,
      title: "Employee Onboarding",
      description: "Platforms that streamline new hire processes with training material automation and task tracking.",
      detailedDescription: "Create a seamless onboarding experience with AI-powered training content generation, personalized learning paths, and automated task management.",
      technologies: ["Talmundo", "WorkBright", "Custom Workflows", "Learning Management", "Process Automation"],
      benefits: [
        "Reduce onboarding time by up to 50%",
        "Increase employee retention and satisfaction",
        "Ensure consistent training across departments",
        "Track onboarding progress in real-time",
        "Customize learning paths for each role"
      ]
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "AI-Driven Fraud Detection",
      description: "Tools to monitor transactions and detect anomalies for banking, e-commerce, and other industries.",
      detailedDescription: "Implement advanced fraud detection systems that identify suspicious patterns and anomalies in real-time, protecting your business and customers.",
      technologies: ["FraudLabs Pro", "DataRobot", "Custom Algorithms", "Anomaly Detection", "Behavioral Analysis"],
      benefits: [
        "Reduce fraudulent transactions by up to 90%",
        "Minimize false positives with advanced algorithms",
        "Real-time monitoring and alerts",
        "Adaptive learning from new fraud patterns",
        "Comprehensive audit trails and reporting"
      ]
    },
    {
      icon: <FileText size={24} />,
      title: "AI-Based Document Management",
      description: "Intelligent platforms for organizing, searching, and extracting insights from large sets of documents.",
      detailedDescription: "Transform document management with AI-powered classification, text extraction, intelligent search, and automated data entry from unstructured documents.",
      technologies: ["Papermerge", "Google DocAI", "Custom Solutions", "OCR", "Knowledge Graphs"],
      benefits: [
        "Reduce document processing time by 80%",
        "Extract key information automatically",
        "Improve document retrieval accuracy",
        "Enable semantic search capabilities",
        "Automate compliance and policy checks"
      ]
    }
  ];

  return (
    <section id="services" className="bg-gradient-to-b from-white to-gray-50 py-16 relative">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float z-[-1]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: 0.03
            }}
          >
            <div className={`rounded-full w-${8 + Math.floor(Math.random() * 16)} h-${8 + Math.floor(Math.random() * 16)}`}>
              {i % 5 === 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                </svg>
              )}
              {i % 5 === 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              )}
              {i % 5 === 2 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
              )}
              {i % 5 === 3 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
              )}
              {i % 5 === 4 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="section-container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            Our Expertise
          </span>
          <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={`mt-4 text-3xl font-bold text-gray-900 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            AI Solutions Tailored for Your Business
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Discover how our cutting-edge AI services can transform your operations, enhance customer experiences, and drive growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              detailedDescription={service.detailedDescription}
              technologies={service.technologies}
              benefits={service.benefits}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
