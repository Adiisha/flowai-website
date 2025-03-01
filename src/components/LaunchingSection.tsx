
import { useState, useEffect } from 'react';
import { useInView } from '@/lib/animate';
import { Bell } from 'lucide-react';

const LaunchingSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  useEffect(() => {
    // Set the target date to 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically call an API to save the email
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };
  
  const CountdownItem = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-flowai-white text-flowai-black w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
  
  return (
    <section id="launching" className="py-24 bg-flowai-black text-flowai-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-white text-flowai-black text-sm font-medium rounded-full">
            Coming Soon
          </span>
          <h2 
            ref={ref as React.RefObject<HTMLHeadingElement>}
            className={`mt-4 text-flowai-white ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            New AI Features Launching Soon
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-flowai-white/80">
            We're preparing to launch our next generation of AI tools. Sign up to be notified when we go live.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Next-gen AI tools await</h3>
              <p className="mb-8 text-flowai-white/80">
                Our upcoming platform includes groundbreaking features for AI-driven analytics, 
                predictive customer insights, and automated workflow optimization.
              </p>
              
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-flowai-black border-2 border-transparent focus:border-flowai-white/30 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-flowai-black text-flowai-white px-4 py-1.5 rounded transition-colors duration-300 hover:bg-flowai-darkGray"
                >
                  Notify Me
                </button>
              </form>
              
              {isSubmitted && (
                <div className="mt-3 text-green-400 flex items-center">
                  <Bell size={16} className="mr-2" />
                  Thank you! We'll notify you when we launch.
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-flowai-darkGray/50 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold mb-6 text-center">Launching In</h4>
                
                <div className="flex justify-center gap-4">
                  <CountdownItem value={countdown.days} label="Days" />
                  <CountdownItem value={countdown.hours} label="Hours" />
                  <CountdownItem value={countdown.minutes} label="Minutes" />
                  <CountdownItem value={countdown.seconds} label="Seconds" />
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-flex gap-2 flex-wrap justify-center">
                    {['AI Analytics', 'Predictive Insights', 'Custom Reports', 'API Access'].map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-flowai-white/10 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaunchingSection;
