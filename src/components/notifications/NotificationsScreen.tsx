
import React, { useState } from 'react';
import { Bell, MessageCircle, Users, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NotificationsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    {
      id: '1',
      type: 'reply',
      title: 'New reply to your question',
      message: 'Jessa replied to your question in #ProgrammingBasics: "Try using a for-loop here instead."',
      time: '2m ago',
      isRead: false,
      icon: MessageCircle,
      color: 'text-blue-500',
    },
    {
      id: '2',
      type: 'like',
      title: 'Your post was liked',
      message: 'Ana Reyes and 5 others liked your post about APA citations.',
      time: '1h ago',
      isRead: false,
      icon: Bell,
      color: 'text-[#2563EB]',
    },
    {
      id: '3',
      type: 'group',
      title: 'Group invitation',
      message: 'Mark Santos invited you to join "Advanced React Patterns".',
      time: '3h ago',
      isRead: true,
      icon: Users,
      color: 'text-green-500',
    },
    {
      id: '4',
      type: 'mention',
      title: 'You were mentioned',
      message: 'Sofia Chen mentioned you in #MathHelp: "Could you help explain this concept?"',
      time: '1d ago',
      isRead: true,
      icon: User,
      color: 'text-purple-500',
    },
  ]);

  const [filter, setFilter] = useState('All');
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'Unread') return matchesSearch && !notification.isRead;
    if (filter === 'Group') return matchesSearch && notification.type === 'group';
    if (filter === 'Personal') return matchesSearch && notification.type !== 'group';
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-[#2563EB] text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#2563EB] hover:bg-[#2563EB]/10 rounded-xl"
          >
            Clear All
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB] bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {['All', 'Unread', 'Group', 'Personal'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                filter === option
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/5'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="px-4 py-2 bg-white border-b border-gray-100">
          <p className="text-sm text-gray-600">
            Showing {filteredNotifications.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          
          return (
            <div
              key={notification.id}
              className={`flex items-start px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 ${notification.color}`}>
                <Icon size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className={`font-semibold text-sm ${!notification.isRead ? 'text-gray-800' : 'text-gray-700'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {notification.message}
                </p>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12 bg-white">
          {searchQuery ? (
            <>
              <Search size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">No notifications found</h3>
              <p className="text-gray-400">Try adjusting your search terms</p>
            </>
          ) : (
            <>
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">No notifications</h3>
              <p className="text-gray-400">You're all caught up!</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;
