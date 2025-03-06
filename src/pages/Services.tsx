
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BarChart4, Users, TicketCheck, BookOpen, ShieldCheck, FileText, Database } from 'lucide-react';
import { useInView } from '@/lib/animate';

const ServicesPage = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <MessageSquare size={30} />,
      id: "ai-chatbots",
      title: "AI Chatbots",
      description: "Build conversational AI for customer support, sales inquiries, and lead generation."
    },
    {
      icon: <BarChart4 size={30} />,
      id: "recommendation-engines",
      title: "Recommendation Engines",
      description: "Provide personalized product or content suggestions for e-commerce or streaming platforms."
    },
    {
      icon: <Users size={30} />,
      id: "ai-powered-crm",
      title: "AI-Powered CRM",
      description: "Add automation, lead scoring, and predictive analytics to basic CRM systems."
    },
    {
      icon: <TicketCheck size={30} />,
      id: "ticketing-systems",
      title: "Ticketing Systems",
      description: "Automate issue resolution workflows with AI-powered prioritization and classification."
    },
    {
      icon: <Database size={30} />,
      id: "customer-feedback-analysis",
      title: "Customer Feedback Analysis",
      description: "AI-driven tools to analyze customer feedback, identify trends, and generate actionable insights."
    },
    {
      icon: <BookOpen size={30} />,
      id: "employee-onboarding",
      title: "Employee Onboarding",
      description: "Platforms that streamline new hire processes with training material automation and task tracking."
    },
    {
      icon: <ShieldCheck size={30} />,
      id: "ai-driven-fraud-detection",
      title: "AI-Driven Fraud Detection",
      description: "Tools to monitor transactions and detect anomalies for banking, e-commerce, and other industries."
    },
    {
      icon: <FileText size={30} />,
      id: "ai-based-document-management",
      title: "AI-Based Document Management",
      description: "Intelligent platforms for organizing, searching, and extracting insights from large sets of documents."
    }
  ];

  return (
    <div className="bg-flowai-beigePale min-h-screen">
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-flowai-beigeSubtle text-flowai-black text-sm font-medium rounded-full">
              Our Solutions
            </span>
            <h1 className="text-4xl font-bold mt-4 mb-6 text-flowai-black">AI Services & Solutions</h1>
            <p className="max-w-3xl mx-auto text-lg text-flowai-black">
              Explore our comprehensive range of AI solutions designed to transform your business operations,
              enhance customer experiences, and drive sustainable growth.
            </p>
          </div>
          
          <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={`/services/${service.id}`} 
                className={`bg-flowai-beigeSubtle rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                  isInView ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="bg-flowai-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-flowai-black">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-flowai-black">{service.title}</h3>
                  <p className="text-flowai-black mb-6">{service.description}</p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-flowai-black font-medium hover:underline">
                      Learn More
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="/#contact" 
              className="px-8 py-4 bg-flowai-black text-flowai-white rounded-lg font-medium inline-flex items-center hover:bg-opacity-80 transition-all"
            >
              Get a Custom Solution
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
