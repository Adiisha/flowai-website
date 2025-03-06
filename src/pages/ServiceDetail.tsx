
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, BarChart4, Users, TicketCheck, BookOpen, ShieldCheck, FileText, Database, ArrowLeft, CheckCircle } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface ServiceData {
  icon: JSX.Element;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  benefits: string[];
}

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceData | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const services: Record<string, ServiceData> = {
    "ai-chatbots": {
      icon: <MessageSquare size={36} />,
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
    "recommendation-engines": {
      icon: <BarChart4 size={36} />,
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
    "ai-powered-crm": {
      icon: <Users size={36} />,
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
    "ticketing-systems": {
      icon: <TicketCheck size={36} />,
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
    "customer-feedback-analysis": {
      icon: <Database size={36} />,
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
    "employee-onboarding": {
      icon: <BookOpen size={36} />,
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
    "ai-driven-fraud-detection": {
      icon: <ShieldCheck size={36} />,
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
    "ai-based-document-management": {
      icon: <FileText size={36} />,
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
  };

  useEffect(() => {
    if (id && services[id]) {
      setService(services[id]);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!service) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center bg-[#F5F5DC]">
        <h1 className="text-3xl font-bold mb-4 text-black">Service Not Found</h1>
        <p className="mb-8 text-black">The service you're looking for doesn't exist or has been moved.</p>
        <Link to="/services" className="px-6 py-3 bg-black text-white rounded-lg font-medium">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/services" className="inline-flex items-center text-black hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
          
          <div className="bg-[#F5F5DC] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-black text-white p-4 rounded-full mr-4">
                {service.icon}
              </div>
              <h1 className="text-4xl font-bold text-black">{service.title}</h1>
            </div>
            
            <p className="text-xl mb-8 text-black">
              {service.description}
            </p>
            
            <div ref={ref as React.RefObject<HTMLDivElement>} className={`mb-10 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
              <h2 className="text-2xl font-bold mb-4 text-black">Overview</h2>
              <p className="mb-6 text-black">
                {service.detailedDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-black flex items-center">
                    <span className="bg-black text-white p-2 rounded-full mr-3">
                      <CheckCircle size={20} />
                    </span>
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-black mr-2 mt-1">•</span>
                        <span className="text-black">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-black flex items-center">
                    <span className="bg-black text-white p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                    </span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap">
                    {service.technologies.map((tech, index) => (
                      <span key={index} className="m-1 px-3 py-1 bg-[#F5F5DC] text-black rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-6 text-black">Ready to implement this solution?</h3>
              <Link 
                to="/contact" 
                className="px-8 py-3 bg-black text-white rounded-lg inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
              >
                Get a Free Consultation
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
