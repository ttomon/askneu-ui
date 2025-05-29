
import React, { useState } from 'react';
import { Search, MessageCircle, User, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatScreen from './ChatScreen';

const MessagesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [conversations] = useState([
    {
      id: '1',
      name: 'Study Group - Research101',
      lastMessage: 'Thanks for the citation help!',
      time: '2m ago',
      unread: 2,
      isGroup: true,
    },
    {
      id: '2',
      name: 'Ana Reyes',
      lastMessage: 'Did you finish the assignment?',
      time: '1h ago',
      unread: 0,
      isGroup: false,
    },
    {
      id: '3',
      name: 'WebDev101 Group',
      lastMessage: 'New React tutorial shared',
      time: '3h ago',
      unread: 5,
      isGroup: true,
    },
    {
      id: '4',
      name: 'Mark Santos',
      lastMessage: 'See you at the library',
      time: '1d ago',
      unread: 0,
      isGroup: false,
    },
    {
      id: '5',
      name: 'Sofia Chen',
      lastMessage: 'Math study session tomorrow?',
      time: '2d ago',
      unread: 1,
      isGroup: false,
    },
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedChat) {
    return (
      <ChatScreen
        conversationId={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB] bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="divide-y divide-gray-100">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center">
                  {conversation.isGroup ? (
                    <MessageCircle size={20} className="text-white" />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-[#2563EB] text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {filteredConversations.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No conversations found</h3>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default MessagesScreen;
