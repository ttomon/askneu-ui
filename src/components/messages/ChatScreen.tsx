
import React, { useState } from 'react';
import { ArrowLeft, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatScreenProps {
  conversationId: string;
  conversationName: string;
  onBack: () => void;
}

const ChatScreen = ({ conversationId, conversationName, onBack }: ChatScreenProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState([
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
      // Here you would typically send the message to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#7B1F27] flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#333]">{conversationName}</h1>
            <p className="text-xs text-gray-500">Online</p>
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
                  ? 'bg-[#7B1F27] text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isOwn ? 'text-gray-200' : 'text-gray-500'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border-gray-300 focus:border-[#7B1F27] focus:ring-[#7B1F27]"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-[#7B1F27] hover:bg-[#5A1A1F] text-white"
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
