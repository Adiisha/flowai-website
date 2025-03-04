
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

const LoginBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in - this would be replaced with your auth logic
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    // Optionally save this preference
    localStorage.setItem('bannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="discount-banner w-full flex justify-between items-center mb-4">
      <div className="flex-1 text-center relative z-10">
        <div className="flex items-center justify-center">
          <Bell className="h-5 w-5 mr-2 animate-pulse-subtle" />
          <span className="font-medium">
            {isLoggedIn 
              ? "Welcome back! Your 5% discount has been applied." 
              : "Get 5% Discount When Logged In"}
          </span>
        </div>
      </div>
      
      {!isLoggedIn && (
        <div className="flex-shrink-0 hidden sm:block">
          <button 
            className="bg-white text-sky-500 px-3 py-1.5 text-sm rounded-md hover:bg-sky-50 transition-colors"
            onClick={() => {}}
          >
            Login
          </button>
        </div>
      )}
      
      <button 
        className="flex-shrink-0 ml-3 text-white hover:text-gray-100"
        onClick={dismissBanner}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default LoginBanner;
