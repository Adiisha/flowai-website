import { useRef, useEffect, useState } from 'react';
import { useInView } from '@/lib/animate';
import { Check, DollarSign, Zap, Settings, Users, Shield } from 'lucide-react';

const About = () => {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const textRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({
    clients: 0,
    experts: 0,
    satisfaction: 0
  });
  const targetCounts = {
    clients: 150,
    experts: 40,
    satisfaction: 98
  };
  const [activeFeature, setActiveFeature] = useState<string | null>("Affordability");

  useEffect(() => {
    if (isInView) {
      resetAndAnimateCounters();
    }

    const observerOptions = {
      threshold: 0.5
    };
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resetAndAnimateCounters();
        }
      });
    }, observerOptions);
    if (textRef.current) {
      counterObserver.observe(textRef.current);
    }
    return () => {
      if (textRef.current) {
        counterObserver.unobserve(textRef.current);
      }
    };
  }, [isInView]);

  const resetAndAnimateCounters = () => {
    setCounts({
      clients: 0,
      experts: 0,
      satisfaction: 0
    });

    const clientsInterval = setInterval(() => {
      setCounts(prev => {
        const newClients = Math.min(prev.clients + 3, targetCounts.clients);
        const newExperts = Math.min(prev.experts + 1, targetCounts.experts);
        const newSatisfaction = Math.min(prev.satisfaction + 2, targetCounts.satisfaction);
        if (newClients === targetCounts.clients && newExperts === targetCounts.experts && newSatisfaction === targetCounts.satisfaction) {
          clearInterval(clientsInterval);
        }
        return {
          clients: newClients,
          experts: newExperts,
          satisfaction: newSatisfaction
        };
      });
    }, 40);
  };

  const features = [{
    title: "Affordability",
    icon: <DollarSign className="h-6 w-6" />,
    description: "We leverage open-source tools and efficient development practices to deliver high-quality AI solutions at a fraction of enterprise costs. Our transparent pricing model ensures predictability with no hidden fees.",
    details: [
      { bg: "bg-green-50", border: "border-green-100", text: "text-green-700", icon: "text-green-500", content: "Our pricing is typically 40-60% lower than enterprise AI solutions with comparable features." },
      { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-700", icon: "text-blue-500", content: "No hidden fees or unexpected costs - transparent pricing from start to finish." },
      { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-700", icon: "text-purple-500", content: "Flexible payment plans to fit businesses of any size." }
    ]
  }, {
    title: "Customization",
    icon: <Settings className="h-6 w-6" />,
    description: "Every business has unique needs. Our solutions are fully customizable to fit your specific requirements, with dedicated support to ensure your implementation matches your vision exactly.",
    details: [
      { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-700", icon: "text-amber-500", content: "Tailored AI models trained specifically for your business domain and data." },
      { bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-700", icon: "text-teal-500", content: "Customizable dashboards and user interfaces that match your brand identity." },
      { bg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-700", icon: "text-indigo-500", content: "Modular architecture allowing you to choose only the features you need." }
    ]
  }, {
    title: "Integration",
    icon: <Zap className="h-6 w-6" />,
    description: "Our solutions seamlessly integrate with your existing systems and workflows. We provide comprehensive API documentation and technical support to ensure a smooth transition.",
    details: [
      { bg: "bg-sky-50", border: "border-sky-100", text: "text-sky-700", icon: "text-sky-500", content: "Integration with 100+ popular platforms and services via well-documented APIs." },
      { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-700", icon: "text-emerald-500", content: "Pre-built connectors for major CRM, ERP, and marketing automation tools." },
      { bg: "bg-fuchsia-50", border: "border-fuchsia-100", text: "text-fuchsia-700", icon: "text-fuchsia-500", content: "Dedicated integration team to help with custom implementation needs." }
    ]
  }, {
    title: "Support",
    icon: <Users className="h-6 w-6" />,
    description: "24/7 expert support is included with all our plans. Our team of AI specialists is always available to address any concerns and provide guidance for optimal implementation.",
    details: [
      { bg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-700", icon: "text-cyan-500", content: "24/7 technical support through chat, email, and phone." },
      { bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-700", icon: "text-rose-500", content: "Regular check-ins and quarterly performance reviews for enterprise clients." },
      { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-700", icon: "text-blue-500", content: "Comprehensive knowledge base with tutorials and best practices." }
    ]
  }, {
    title: "Security",
    icon: <Shield className="h-6 w-6" />,
    description: "Enterprise-grade security protocols protect your data and ensure compliance with industry regulations. We implement advanced encryption and regular security audits.",
    details: [
      { bg: "bg-red-50", border: "border-red-100", text: "text-red-700", icon: "text-red-500", content: "GDPR, HIPAA, and SOC 2 compliant systems for data protection." },
      { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-700", icon: "text-emerald-500", content: "End-to-end encryption for all data at rest and in transit." },
      { bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-700", icon: "text-violet-500", content: "Regular penetration testing and security audits by third-party experts." }
    ]
  }];

  return <section id="about" className="bg-white py-0">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            About Us
          </span>
          <h2 className="mt-4 mb-6">Our Mission & What Sets Us Apart</h2>
          <p className="max-w-3xl mx-auto">
            Flow AI pioneers custom AI solutions to transform businesses, driving efficiency and growth with innovation at our core. We believe in creating technology that feels intuitive and seamless, just like a natural flow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref as React.RefObject<HTMLDivElement>} className={`relative overflow-hidden rounded-2xl p-8 bg-white border border-gray-100 shadow-lg ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6 text-center">What Makes Us Different</h3>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {features.map((feature, index) => <button key={index} onClick={() => setActiveFeature(activeFeature === feature.title ? null : feature.title)} className={`feature-button glow-btn ${activeFeature === feature.title ? 'active' : ''} flex items-center transition-all duration-300`}>
                  <span className="mr-2">{feature.icon}</span>
                  {feature.title}
                </button>)}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl min-h-[180px] transition-all duration-300">
              {activeFeature ? <div className="animate-fade-in">
                  <h4 className="text-xl font-bold mb-3 flex items-center">
                    {features.find(f => f.title === activeFeature)?.icon}
                    <span className="ml-2">{features.find(f => f.title === activeFeature)?.title}</span>
                  </h4>
                  <p className="text-gray-700">{features.find(f => f.title === activeFeature)?.description}</p>
                  
                  <div className="mt-5 space-y-3">
                    {features.find(f => f.title === activeFeature)?.details.map((detail, idx) => (
                      <div key={idx} className={`p-4 ${detail.bg} rounded-lg border ${detail.border} flex items-center`}>
                        <Check className={`h-5 w-5 ${detail.icon} mr-3 flex-shrink-0`} />
                        <p className={`text-sm ${detail.text} font-medium`}>{detail.content}</p>
                      </div>
                    ))}
                  </div>
                </div> : <div className="text-center flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500">Click any feature above to learn more</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js'].map((tech, idx) => <span key={idx} className="tech-badge">{tech}</span>)}
                  </div>
                </div>}
            </div>
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-70 floating-element z-[-1]"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-50 rounded-full opacity-70 floating-element z-[-1]"></div>
            <div className="absolute top-20 left-10 w-16 h-16 bg-purple-50 rounded-full opacity-60 floating-element animation-delay-700 z-[-1]"></div>
          </div>
          
          <div ref={textRef} className={`${isInView ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
              Our Vision
            </span>
            <h3 className="mt-4 mb-6">Creating AI For Everyone</h3>
            <p className="mb-6">
              We envision a world where businesses of all sizes can harness the power of artificial intelligence to achieve their full potential, without the enterprise-level costs or technical complexity traditionally associated with AI adoption.
            </p>
            <p className="mb-8">
              Our team combines expertise in artificial intelligence, machine learning, and business optimization to deliver solutions that address real challenges and create measurable impact.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2 text-flowai-black" data-count-up data-target={targetCounts.clients}>{counts.clients}+</div>
                <p className="text-base">Clients Worldwide</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2 text-flowai-black" data-count-up data-target={targetCounts.experts}>{counts.experts}+</div>
                <p className="text-base">AI Experts</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2 text-flowai-black" data-count-up data-target={targetCounts.satisfaction}>{counts.satisfaction}%</div>
                <p className="text-base">Client Satisfaction</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2 text-flowai-black">24/7</div>
                <p className="text-base">Support Services</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-2">
              {['JavaScript', 'TypeScript', 'SQL', 'AWS', 'Google Cloud', 'Azure ML'].map((tech, idx) => <span key={idx} className="tech-badge flex items-center justify-center">
                  {tech}
                </span>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default About;
