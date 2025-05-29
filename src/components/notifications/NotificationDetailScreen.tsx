
import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Users, User, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface NotificationDetailScreenProps {
  notificationId: string;
  onBack: () => void;
}

const NotificationDetailScreen = ({ notificationId, onBack }: NotificationDetailScreenProps) => {
  const { isDarkMode } = useTheme();
  const [notification] = useState({
    id: notificationId,
    type: 'like',
    title: 'Ana Reyes liked your question',
    description: 'How do I cite an online journal in APA 7th edition?',
    time: '5m ago',
    isRead: false,
    fullContent: 'Ana Reyes and 3 others liked your question about APA citation. Your question has received positive feedback from the Research101 community.',
    relatedPost: {
      title: 'How do I cite an online journal in APA 7th edition?',
      content: "I'm finalizing my thesis and need clarification on how to cite online sources properly. The journal doesn't have a DOI, so I'm not sure about the format...",
      group: 'Research101',
      author: 'You',
      likes: 24,
      comments: 5
    }
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return Heart;
      case 'comment':
        return MessageCircle;
      case 'group':
        return Users;
      case 'follow':
        return User;
      default:
        return Heart;
    }
  };

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

  const IconComponent = getIcon(notification.type);

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center justify-between">
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
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notification</h1>
          </div>
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
              : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
          }`}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Notification Content */}
      <div className="p-4 space-y-4">
        {/* Main Notification */}
        <div className={`rounded-lg border p-4 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            } ${getIconColor(notification.type)}`}>
              <IconComponent size={20} />
            </div>
            <div className="flex-1">
              <h2 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {notification.title}
              </h2>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {notification.fullContent}
              </p>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {notification.time}
              </span>
            </div>
          </div>
        </div>

        {/* Related Post */}
        {notification.relatedPost && (
          <div className={`rounded-lg border p-4 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mb-3">
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
              }`}>
                #{notification.relatedPost.group}
              </span>
            </div>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {notification.relatedPost.title}
            </h3>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {notification.relatedPost.content}
            </p>
            <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>by {notification.relatedPost.author}</span>
              <span>{notification.relatedPost.likes} likes • {notification.relatedPost.comments} comments</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => console.log('View post')}
          >
            View Post
          </Button>
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => console.log('Reply')}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailScreen;
