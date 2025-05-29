
import React, { useState } from 'react';
import { Search, Bell, Heart, MessageCircle, Users, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const NotificationsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    {
      id: '1',
      type: 'like',
      title: 'Ana Reyes liked your question',
      description: 'How do I cite an online journal in APA 7th edition?',
      time: '5m ago',
      isRead: false,
      icon: Heart,
    },
    {
      id: '2',
      type: 'comment',
      title: 'New reply to your question',
      description: 'Mark Santos replied to your React state management question',
      time: '1h ago',
      isRead: false,
      icon: MessageCircle,
    },
    {
      id: '3',
      type: 'group',
      title: 'New post in Research101',
      description: 'Sofia Chen posted: "Best practices for literature review"',
      time: '2h ago',
      isRead: true,
      icon: Users,
    },
    {
      id: '4',
      type: 'follow',
      title: 'Juan Carlos started following you',
      description: 'Check out their profile and questions',
      time: '3h ago',
      isRead: true,
      icon: User,
    },
    {
      id: '5',
      type: 'like',
      title: '10 people liked your answer',
      description: 'Your answer about database normalization is trending',
      time: '1d ago',
      isRead: true,
      icon: Heart,
    },
  ]);

  const filteredNotifications = notifications.filter(notif =>
    notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notif.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'text-red-500';
      case 'comment':
        return 'text-blue-500';
      case 'group':
        return 'text-green-500';
      case 'follow':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB] bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="divide-y divide-gray-100">
          {filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.isRead ? 'bg-blue-50 border-l-4 border-l-[#2563EB]' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${getIconColor(notification.type)}`}>
                    <IconComponent size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {filteredNotifications.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No notifications found</h3>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      )}

      {filteredNotifications.length === 0 && !searchQuery && (
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
