
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <div className="faq-question" onClick={toggleOpen}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const faqItems = [
    {
      question: "What is Flow AI and what services does it offer?",
      answer: "Flow AI is an AI-driven service platform specializing in automation, chatbot integration, CRM solutions, and interactive website development. We provide comprehensive AI solutions tailored to businesses of all sizes to improve efficiency and customer experiences."
    },
    {
      question: "How does Flow AI handle my project from start to finish?",
      answer: "Our process begins when a client contacts us. We analyze requirements, provide recommendations, develop solutions, test them, and finally set them up for the client. The step-by-step process is detailed in the interactive process section."
    },
    {
      question: "What industries can benefit from Flow AI's services?",
      answer: "Flow AI works with various industries, including e-commerce, finance, healthcare, education, and startups looking to automate operations with AI. Our solutions are adaptable to virtually any business model that can benefit from AI-driven improvements."
    },
    {
      question: "Can I customize the services according to my business needs?",
      answer: "Yes, all services are fully customizable. Clients can select specific services, and our team will tailor solutions based on their requirements. We take pride in offering bespoke AI solutions that address your unique challenges."
    },
    {
      question: "How can I get in touch with Flow AI?",
      answer: "You can reach out via the contact form, email, or WhatsApp. Direct chat options are available for immediate assistance. Our team typically responds within 24 hours to all inquiries."
    },
    {
      question: "Is there a discount for new clients?",
      answer: "Yes, we offer a 5% discount for all registered users. Simply create an account and log in to automatically apply the discount to any of our services."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Absolutely! All our AI solutions come with dedicated support to ensure optimal performance. We offer different support packages depending on your needs, from basic maintenance to comprehensive 24/7 technical assistance."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            Common Questions
          </span>
          <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={`mt-4 text-gray-900 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto mt-4">
            Find answers to common questions about our services, pricing, and process.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
