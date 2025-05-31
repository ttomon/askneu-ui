
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, User, Reply, X, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: string;
  time: string;
  isOwn: boolean;
  replyTo?: Message;
}

interface ChatScreenProps {
  conversationId: string;
  conversationName: string;
  onBack: () => void;
}

const ChatScreen = ({ conversationId, conversationName, onBack }: ChatScreenProps) => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Don't forget the Zoom link for our UI/UX webinar later.",
      sender: 'EduTech Group',
      time: '2:30 PM',
      isOwn: false
    },
    {
      id: '2',
      text: 'Thanks for the reminder! What time does it start?',
      sender: 'You',
      time: '2:32 PM',
      isOwn: true
    },
    {
      id: '3',
      text: 'It starts at 3:00 PM. Here is the link: https://zoom.us/j/123456789',
      sender: 'EduTech Group',
      time: '2:33 PM',
      isOwn: false
    }
  ]);

  // Simulate typing indicator
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    
    if (newMessage.length > 0) {
      setIsTyping(true);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [newMessage]);

  // Simulate other user typing
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setOtherUserTyping(true);
        setTimeout(() => setOtherUserTyping(false), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        replyTo: replyingTo || undefined
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setReplyingTo(null);
      
      console.log('Message saved to local storage', newMsg);
      
      toast({
        title: "Message Sent",
        description: "Your message has been delivered.",
        duration: 2000
      });
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <div className={`min-h-screen flex flex-col max-w-md mx-auto ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <div className={`shadow-sm px-4 py-3 flex-shrink-0 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-900' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{conversationName}</h1>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {otherUserTyping ? 'typing...' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              <Phone size={18} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              <Video size={18} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className="relative group max-w-xs">
              {message.replyTo && (
                <div className={`mb-1 p-2 rounded-lg text-xs ${
                  isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  Replying to: {message.replyTo.text.substring(0, 30)}...
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.isOwn
                    ? 'bg-blue-600 text-white'
                    : isDarkMode 
                      ? 'bg-gray-900 border border-gray-800 text-gray-200'
                      : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn 
                    ? 'text-blue-100' 
                    : isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
              {!message.isOwn && (
                <button
                  onClick={() => handleReply(message)}
                  className={`absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full ${
                    isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <Reply size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {otherUserTyping && (
          <div className="flex justify-start">
            <div className={`px-4 py-2 rounded-lg max-w-xs ${
              isDarkMode 
                ? 'bg-gray-900 border border-gray-800 text-gray-400'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reply Banner */}
      {replyingTo && (
        <div className={`border-t px-4 py-2 ${
          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Reply size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Replying to {replyingTo.sender}
              </span>
            </div>
            <button onClick={cancelReply} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              <X size={16} />
            </button>
          </div>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {replyingTo.text.substring(0, 50)}...
          </p>
        </div>
      )}

      {/* Enhanced Message Input */}
      <div className={`border-t p-4 flex-shrink-0 ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
      }`}>
        {isTyping && (
          <div className={`text-xs mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            You are typing...
          </div>
        )}
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 ${
              isDarkMode 
                ? 'border-gray-800 bg-black text-white placeholder-gray-400 focus:border-blue-500'
                : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600'
            }`}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
