
import { useState, useRef, useEffect } from 'react';
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
      className={`faq-item ${isOpen ? 'active' : ''} ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="faq-question" onClick={toggleAnswer}>
        <div className="flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-sky-500" />
          <span>{question}</span>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            Got Questions?
          </span>
          <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={`mt-4 text-gray-900 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto mt-4">
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
      </div>
    </section>
  );
};

export default FAQ;
