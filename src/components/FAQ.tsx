
import { useState, useRef } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`faq-item mb-4 ${isOpen ? 'active' : ''} ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="faq-question" onClick={toggleAnswer}>
        <div className="flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-sky-500 flex-shrink-0" />
          <span className="text-left">{question}</span>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      <div 
        ref={answerRef}
        className="faq-answer"
        style={isOpen ? { maxHeight: answerRef.current?.scrollHeight + 'px' } : { maxHeight: 0 }}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const faqs = [
    {
      question: "What is Flow AI and what services does it offer?",
      answer: "Flow AI is an AI-driven service platform specializing in automation, chatbot integration, CRM solutions, and interactive website development."
    },
    {
      question: "How does Flow AI handle my project from start to finish?",
      answer: "Our process begins when a client contacts us. We analyze requirements, provide recommendations, develop solutions, test them, and finally set them up for the client. The step-by-step process is detailed in the interactive process section."
    },
    {
      question: "What industries can benefit from Flow AI's services?",
      answer: "Flow AI works with various industries, including e-commerce, finance, healthcare, education, and startups looking to automate operations with AI."
    },
    {
      question: "Can I customize the services according to my business needs?",
      answer: "Yes, all services are fully customizable. Clients can select specific services, and our team will tailor solutions based on their requirements."
    },
    {
      question: "How can I get in touch with Flow AI?",
      answer: "You can reach out via the contact form, email, or WhatsApp. Direct chat options are available for immediate assistance."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="section-container max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            Got Questions?
          </span>
          <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={`mt-4 text-3xl font-bold text-gray-900 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Find answers to common questions about our services, process, and how we can help your business.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>

        {/* Add floating elements to the background */}
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="floating-icon absolute"
              style={{
                width: `${30 + Math.random() * 20}px`,
                height: `${30 + Math.random() * 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="17" x2="12" y2="17.01"></line>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
