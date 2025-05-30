
import React, { useState } from 'react';
import { ArrowLeft, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface ChatScreenProps {
  conversationId: string;
  conversationName: string;
  onBack: () => void;
}

const ChatScreen = ({ conversationId, conversationName, onBack }: ChatScreenProps) => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // Simulate local storage persistence
      console.log('Message saved to local storage', newMsg);
      
      toast({
        title: "Message Sent",
        description: "Your message has been delivered.",
        duration: 2000
      });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col max-w-md mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' 
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
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Online</p>
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
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.isOwn
                  ? 'bg-blue-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 border border-gray-600 text-gray-200'
                    : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isOwn 
                  ? 'text-blue-100' 
                  : isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className={`border-t p-4 flex-shrink-0 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600'
            }`}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
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
