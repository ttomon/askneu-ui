
import React, { useState } from 'react';
import { Bell, MessageCircle, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationsScreen = () => {
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
      color: 'text-[#7B1F27]',
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-[#333]">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-[#7B1F27] text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#7B1F27] hover:bg-[#7B1F27]/10"
          >
            Clear All
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {['All', 'Unread', 'Group', 'Personal'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filter === option
                  ? 'bg-[#7B1F27] text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-[#7B1F27]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white">
        {notifications.map((notification) => {
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
                  <h3 className={`font-semibold text-sm ${!notification.isRead ? 'text-[#333]' : 'text-gray-700'}`}>
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
                  <div className="w-2 h-2 bg-[#7B1F27] rounded-full mt-2"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No notifications</h3>
          <p className="text-gray-400">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;
