
import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MessagesScreen = () => {
  const [conversations] = useState([
    {
      id: '1',
      name: 'EduTech Group',
      lastMessage: "Don't forget the Zoom link for our UI/UX webinar later.",
      time: '2m ago',
      unread: 2,
      isGroup: true,
      avatar: '🟡',
    },
    {
      id: '2',
      name: 'Prof. Santos',
      lastMessage: 'Please revise your assignment per the new rubric.',
      time: '1h ago',
      unread: 1,
      isGroup: false,
      avatar: '🟢',
    },
    {
      id: '3',
      name: 'WebDev101',
      lastMessage: "Who's free for a meeting this Friday?",
      time: '3h ago',
      unread: 0,
      isGroup: true,
      avatar: '🟡',
    },
    {
      id: '4',
      name: 'Ana Reyes',
      lastMessage: 'Thanks for helping with the APA citation!',
      time: '1d ago',
      unread: 0,
      isGroup: false,
      avatar: '🔵',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-[#333]">Messages</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Find Groups or Individuals"
            className="pl-10 border-gray-300 focus:border-[#7B1F27] focus:ring-[#7B1F27]"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="bg-white">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              {conversation.isGroup ? (
                <span className="text-lg">{conversation.avatar}</span>
              ) : (
                <User size={20} className="text-gray-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-[#333] truncate">
                  {conversation.name}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {conversation.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage}
              </p>
            </div>
            
            {conversation.unread > 0 && (
              <div className="w-6 h-6 bg-[#7B1F27] rounded-full flex items-center justify-center ml-2">
                <span className="text-white text-xs font-bold">
                  {conversation.unread}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesScreen;
