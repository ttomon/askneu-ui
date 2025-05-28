
import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ChatScreen from './ChatScreen';

const MessagesScreen = () => {
  const [selectedConversation, setSelectedConversation] = useState<{id: string, name: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (conversation: {id: string, name: string}) => {
    console.log('Opening conversation:', conversation.name);
    setSelectedConversation(conversation);
  };

  const handleBackFromChat = () => {
    setSelectedConversation(null);
  };

  if (selectedConversation) {
    return (
      <ChatScreen
        conversationId={selectedConversation.id}
        conversationName={selectedConversation.name}
        onBack={handleBackFromChat}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Find Groups or Individuals"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB] bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="px-4 py-2 bg-white border-b border-gray-100">
          <p className="text-sm text-gray-600">
            Showing {filteredConversations.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Conversations */}
      <div className="bg-white">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleConversationClick({id: conversation.id, name: conversation.name})}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mr-3 shadow-sm">
              {conversation.isGroup ? (
                <span className="text-lg">{conversation.avatar}</span>
              ) : (
                <User size={20} className="text-gray-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800 truncate">
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
              <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center ml-2 shadow-sm">
                <span className="text-white text-xs font-bold">
                  {conversation.unread}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredConversations.length === 0 && searchQuery && (
        <div className="text-center py-12 bg-white">
          <Search size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No messages found</h3>
          <p className="text-gray-400">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default MessagesScreen;
