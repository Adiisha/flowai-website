import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, BarChart4, Users, TicketCheck, BookOpen, ShieldCheck, FileText, Database, ArrowLeft, CheckCircle, Zap, Award, Target, RefreshCw } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface ServiceData {
  icon: JSX.Element;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  benefits: string[];
  highlights?: string[];
  useCases?: string[];
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
      detailedDescription: "Our advanced AI chatbots provide human-like interactions to handle customer queries, qualify leads, and improve engagement across all your digital channels. Using the latest natural language processing technologies, we create intelligent solutions that understand intent and respond naturally.",
      technologies: ["Rasa", "Botpress", "DialogFlow", "NLP", "Custom Training"],
      benefits: [
        "24/7 customer support without human intervention",
        "Reduced response time from hours to seconds",
        "Seamless integration with existing platforms",
        "Continuous learning and improvement",
        "Multilingual support capabilities"
      ],
      highlights: [
        "Voice and text interface options",
        "Integration with CRM systems for personalized responses",
        "Analytics dashboard to track performance",
        "Custom training with your company data"
      ],
      useCases: [
        "E-commerce product assistance",
        "IT helpdesk automation",
        "Lead qualification and nurturing",
        "Appointment scheduling"
      ]
    },
    "recommendation-engines": {
      icon: <BarChart4 size={36} />,
      title: "Recommendation Engines",
      description: "Provide personalized product or content suggestions for e-commerce or streaming platforms.",
      detailedDescription: "Our AI-powered recommendation systems analyze user behavior to suggest relevant products or content, increasing engagement and conversion rates. We create sophisticated algorithms that understand preferences and match users with items they're likely to enjoy.",
      technologies: ["TensorFlow", "PyTorch", "Surprise", "Collaborative Filtering", "Content-Based Filtering"],
      benefits: [
        "Increased average order value by 15-30%",
        "Higher user engagement and retention",
        "Improved customer satisfaction and loyalty",
        "Real-time personalization capabilities",
        "Advanced A/B testing frameworks"
      ],
      highlights: [
        "Hybrid recommendation algorithms",
        "Cold-start problem solutions",
        "Personalized email marketing integration",
        "Cross-platform recommendation sync"
      ],
      useCases: [
        "E-commerce product recommendations",
        "Content streaming suggestions",
        "News and article personalization",
        "Travel and hospitality offerings"
      ]
    },
    "ai-powered-crm": {
      icon: <Users size={36} />,
      title: "AI-Powered CRM",
      description: "Add automation, lead scoring, and predictive analytics to basic CRM systems.",
      detailedDescription: "Transform your customer relationship management with AI-powered insights, automated workflows, and predictive lead scoring to prioritize high-value opportunities. Our solutions enhance existing CRM platforms with intelligent features that drive conversion.",
      technologies: ["SuiteCRM", "Odoo", "AI Extensions", "Predictive Analytics", "Data Mining"],
      benefits: [
        "Automated lead qualification and prioritization",
        "Predictive customer behavior insights",
        "Reduced manual data entry by 70%",
        "Improved sales forecast accuracy",
        "Customized customer journey mapping"
      ],
      highlights: [
        "Sales opportunity prediction",
        "Customer churn risk identification",
        "Automated follow-up scheduling",
        "Sentiment analysis for customer interactions"
      ],
      useCases: [
        "B2B sales pipeline optimization",
        "Retail customer retention",
        "Financial services client management",
        "Healthcare patient relationship"
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
      detailedDescription: "Implement advanced fraud detection systems that identify suspicious patterns and anomalies in real-time, protecting your business and customers. Our AI models continuously learn from new data to stay ahead of emerging fraud techniques.",
      technologies: ["FraudLabs Pro", "DataRobot", "Custom Algorithms", "Anomaly Detection", "Behavioral Analysis"],
      benefits: [
        "Reduce fraudulent transactions by up to 90%",
        "Minimize false positives with advanced algorithms",
        "Real-time monitoring and alerts",
        "Adaptive learning from new fraud patterns",
        "Comprehensive audit trails and reporting"
      ],
      highlights: [
        "Multi-layered security approach",
        "Device fingerprinting capabilities",
        "Behavioral biometrics analysis",
        "Integration with existing security systems"
      ],
      useCases: [
        "Payment processing fraud prevention",
        "Insurance claim verification",
        "Account takeover protection",
        "New account fraud detection"
      ]
    },
    "ai-based-document-management": {
      icon: <FileText size={36} />,
      title: "AI-Based Document Management",
      description: "Intelligent platforms for organizing, searching, and extracting insights from large sets of documents.",
      detailedDescription: "Transform document management with AI-powered classification, text extraction, intelligent search, and automated data entry from unstructured documents. Our solutions make document processing efficient and error-free.",
      technologies: ["Papermerge", "Google DocAI", "Custom Solutions", "OCR", "Knowledge Graphs"],
      benefits: [
        "Reduce document processing time by 80%",
        "Extract key information automatically",
        "Improve document retrieval accuracy",
        "Enable semantic search capabilities",
        "Automate compliance and policy checks"
      ],
      highlights: [
        "Intelligent document categorization",
        "Automated metadata extraction",
        "Advanced search with natural language",
        "Version control and audit trails"
      ],
      useCases: [
        "Legal document analysis",
        "Healthcare record management",
        "Financial document processing",
        "Government compliance documentation"
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
      <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center bg-flowai-beigeSubtle">
        <h1 className="text-3xl font-bold mb-4 text-flowai-black">Service Not Found</h1>
        <p className="mb-8 text-flowai-black">The service you're looking for doesn't exist or has been moved.</p>
        <Link to="/services" className="px-6 py-3 bg-flowai-black text-flowai-white rounded-lg font-medium">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-flowai-beigePale min-h-screen">
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/services" className="inline-flex items-center text-flowai-black hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
          
          <div className="bg-flowai-beigeSubtle rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-flowai-black text-flowai-white p-4 rounded-full mr-4">
                {service.icon}
              </div>
              <h1 className="text-4xl font-bold text-flowai-black">{service.title}</h1>
            </div>
            
            <p className="text-xl mb-8 text-flowai-black">
              {service.description}
            </p>
            
            <div ref={ref as React.RefObject<HTMLDivElement>} className={`mb-10 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
              <h2 className="text-2xl font-bold mb-4 text-flowai-black">Overview</h2>
              <p className="mb-6 text-flowai-black">
                {service.detailedDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-flowai-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-flowai-black flex items-center">
                    <span className="bg-flowai-black text-flowai-white p-2 rounded-full mr-3">
                      <CheckCircle size={20} />
                    </span>
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-flowai-black mr-2 mt-1">•</span>
                        <span className="text-flowai-black">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-flowai-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-flowai-black flex items-center">
                    <span className="bg-flowai-black text-flowai-white p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                    </span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap">
                    {service.technologies.map((tech, index) => (
                      <span key={index} className="m-1 px-3 py-1 bg-flowai-beigePale text-flowai-black rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {service.highlights && (
                <div className="mt-12 bg-flowai-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-flowai-black flex items-center">
                    <span className="bg-flowai-black text-flowai-white p-2 rounded-full mr-3">
                      <Zap size={20} />
                    </span>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-amber-500 mr-2 mt-1">
                          <Award size={18} />
                        </span>
                        <span className="text-flowai-black">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {service.useCases && (
                <div className="mt-8 bg-flowai-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-flowai-black flex items-center">
                    <span className="bg-flowai-black text-flowai-white p-2 rounded-full mr-3">
                      <Target size={20} />
                    </span>
                    Common Use Cases
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.useCases.map((useCase, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-teal-500 mr-2 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                        </span>
                        <span className="text-flowai-black">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-6 text-flowai-black">Ready to implement this solution?</h3>
              <a 
                href="/#contact" 
                className="px-8 py-3 bg-flowai-black text-flowai-white rounded-lg inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
              >
                Get a Free Consultation
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
