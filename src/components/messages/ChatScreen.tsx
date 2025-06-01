
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, User, Reply, X, MoreVertical, Phone, Video, Smile, Paperclip, Mic } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Don't forget the Zoom link for our UI/UX webinar later.",
      sender: 'Study Group - Research101',
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
      sender: 'Study Group - Research101',
      time: '2:33 PM',
      isOwn: false
    }
  ]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hide bottom navigation when component mounts and show when unmounts
  useEffect(() => {
    // Hide bottom navigation immediately when chat opens
    const bottomNav = document.querySelector('.fixed.bottom-0') as HTMLElement;
    if (bottomNav) {
      bottomNav.style.display = 'none';
    }

    // Show bottom navigation when component unmounts (going back)
    return () => {
      const bottomNav = document.querySelector('.fixed.bottom-0') as HTMLElement;
      if (bottomNav) {
        bottomNav.style.display = 'flex';
      }
    };
  }, []);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`h-screen flex flex-col max-w-md mx-auto ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <div className={`shadow-sm px-4 py-3 flex-shrink-0 border-b ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
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
          <div className="flex items-center space-x-1">
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
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className="relative group max-w-[80%]">
                {message.replyTo && (
                  <div className={`mb-1 p-2 rounded-lg text-xs ${
                    isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <div className="flex items-center space-x-1 mb-1">
                      <Reply size={12} />
                      <span className="font-medium">{message.replyTo.sender}</span>
                    </div>
                    <p className="truncate">{message.replyTo.text}</p>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.isOwn
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : isDarkMode 
                        ? 'bg-gray-800 border border-gray-700 text-gray-200 rounded-bl-md'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isOwn 
                      ? 'text-blue-100' 
                      : isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
                <button
                  onClick={() => handleReply(message)}
                  className={`absolute ${message.isOwn ? '-left-8' : '-right-8'} top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full ${
                    isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <Reply size={14} />
                </button>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {otherUserTyping && (
            <div className="flex justify-start">
              <div className={`px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%] ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700 text-gray-400'
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
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Reply Banner */}
      {replyingTo && (
        <div className={`border-t px-4 py-3 ${
          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Reply size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Replying to {replyingTo.sender}
              </span>
            </div>
            <button onClick={cancelReply} className={`p-1 rounded-full transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}>
              <X size={16} />
            </button>
          </div>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} truncate`}>
            {replyingTo.text}
          </p>
        </div>
      )}

      {/* Enhanced Message Input */}
      <div className={`border-t p-4 flex-shrink-0 ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-end space-x-2">
          <button className={`p-2 rounded-full transition-colors ${
            isDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}>
            <Paperclip size={18} />
          </button>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className={`pr-10 resize-none min-h-[44px] ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'border-gray-300 bg-gray-50 focus:border-blue-600 focus:ring-blue-600'
              }`}
              onKeyPress={handleKeyPress}
            />
            <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            }`}>
              <Smile size={16} />
            </button>
          </div>

          {newMessage.trim() ? (
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-11 h-11 p-0"
            >
              <Send size={18} />
            </Button>
          ) : (
            <button className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              <Mic size={18} />
            </button>
          )}
        </div>
        
        {isTyping && (
          <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            You are typing...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;
