
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { 
  initChatbot, 
  sendMessage, 
  copyResponse, 
  startSpeechRecognition, 
  toggleHistory, 
  clearChat, 
  clearHistory 
} from '@/lib/chatbot';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const chatbotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize chatbot functionality
      setTimeout(() => {
        initChatbot();
      }, 100);
      
      // Handle clicks outside of chatbot
      const handleClickOutside = (event: MouseEvent) => {
        if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={chatbotRef} className="chatbot-container">
        <div className="container">
          <div className="flex justify-between items-center mb-3">
            <h2>Flow AI Assistant</h2>
            <button className="btn btn-close" onClick={onClose}>✕</button>
          </div>
          <div className="form-group d-flex">
            <input
              type="text"
              className="form-control"
              id="userInput"
              placeholder="Enter your question"
            />
            <button className="btn btn-primary ml-2" onClick={() => startSpeechRecognition()}>
              🎤
            </button>
          </div>
          <button className="btn btn-success mt-2" id="askButton" onClick={() => sendMessage()}>
            Ask!
          </button>
          <button
            className="btn btn-secondary ml-2 mt-2"
            id="copyButton"
            onClick={() => copyResponse()}
            style={{ display: 'none' }}
          >
            📋 Copy
          </button>

          <div className="d-flex justify-content-between mb-3 mt-3">
            <button className="btn btn-info" id="historyButton" onClick={() => toggleHistory()}>History</button>
            <button className="btn btn-danger" id="clearChatButton" onClick={() => clearChat()}>Clear Chat</button>
            <button className="btn btn-warning" id="clearHistoryButton" onClick={() => clearHistory()}>
              Clear History
            </button>
          </div>

          {/* Chat Container */}
          <div id="chat-container">
            <div id="chat-box"></div>
          </div>

          <div id="history" style={{ display: 'none' }}>
            <h4>Chat History</h4>
            <ul id="historyList"></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
