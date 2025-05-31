
import React, { useState } from 'react';
import { Search, Bell, Heart, MessageCircle, Users, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/contexts/ThemeContext';
import NotificationDetailScreen from './NotificationDetailScreen';

const NotificationsScreen = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);
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
        return isDarkMode ? 'text-gray-400' : 'text-gray-500';
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    setSelectedNotificationId(notificationId);
  };

  if (selectedNotificationId) {
    return (
      <NotificationDetailScreen
        notificationId={selectedNotificationId}
        onBack={() => setSelectedNotificationId(null)}
      />
    );
  }

  return (
    <div className={`min-h-screen pb-20 transition-colors max-w-md mx-auto ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-4 border-b transition-colors ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h1>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={16} />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 transition-colors ${
              isDarkMode 
                ? 'border-gray-800 bg-black text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 bg-gray-50 hover:bg-white focus:border-blue-600 focus:ring-blue-600'
            }`}
          />
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
          {filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  !notification.isRead 
                    ? isDarkMode 
                      ? 'bg-blue-900/20 border-l-4 border-l-blue-500' 
                      : 'bg-blue-50 border-l-4 border-l-blue-600'
                    : isDarkMode 
                      ? 'hover:bg-gray-900' 
                      : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                  } ${getIconColor(notification.type)}`}>
                    <IconComponent size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium ${
                        !notification.isRead 
                          ? isDarkMode ? 'text-white' : 'text-gray-900'
                          : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{notification.time}</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{notification.description}</p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {filteredNotifications.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No notifications found</h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Try adjusting your search terms</p>
        </div>
      )}

      {filteredNotifications.length === 0 && !searchQuery && (
        <div className="text-center py-12">
          <Bell size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No notifications</h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;
