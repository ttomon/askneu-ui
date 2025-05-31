
import React, { useState } from 'react';
import { Settings, ChevronRight, Award, Users, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import SettingsScreen from './SettingsScreen';
import QuestionsView from './QuestionsView';
import AnswersView from './AnswersView';
import FollowersView from './FollowersView';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen = ({ onLogout }: ProfileScreenProps) => {
  const { isDarkMode } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [activeView, setActiveView] = useState<'profile' | 'questions' | 'answers' | 'followers' | 'settings'>('profile');

  const stats = [
    { label: 'Questions', value: '24', icon: MessageSquare, view: 'questions' as const },
    { label: 'Answers', value: '56', icon: Award, view: 'answers' as const },
    { label: 'Followers', value: '128', icon: Users, view: 'followers' as const },
    { label: 'Likes', value: '342', icon: Heart, view: null },
  ];

  const menuItems = [
    { label: 'Academic History', icon: Award, description: 'View your academic achievements and courses' },
    { label: 'Study Groups', icon: Users, description: 'Manage your study groups and collaborations' },
    { label: 'Achievements', icon: Award, description: 'See your badges and accomplishments' },
  ];

  if (showSettings || activeView === 'settings') {
    return (
      <SettingsScreen
        onBack={() => {
          setShowSettings(false);
          setActiveView('profile');
        }}
        onLogout={onLogout}
      />
    );
  }

  if (activeView === 'questions') {
    return <QuestionsView onBack={() => setActiveView('profile')} />;
  }

  if (activeView === 'answers') {
    return <AnswersView onBack={() => setActiveView('profile')} />;
  }

  if (activeView === 'followers') {
    return <FollowersView onBack={() => setActiveView('profile')} />;
  }

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-4 border-b ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Profile
          </h1>
          <button
            onClick={() => setShowSettings(true)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Info */}
        <div className={`rounded-lg shadow-sm border p-6 text-center ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="w-24 h-24 rounded-full bg-blue-600 mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">JD</span>
          </div>
          <h2 className={`text-xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            John Doe
          </h2>
          <p className={`mb-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Computer Science Student
          </p>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Northeastern University • Class of 2025
          </p>
        </div>

        {/* Stats */}
        <div className={`rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-gray-800">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`p-4 text-center transition-colors ${
                    stat.view ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900' : ''
                  }`}
                  onClick={() => stat.view && setActiveView(stat.view)}
                >
                  <IconComponent className={`w-5 h-5 mx-auto mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <div className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu Items */}
        <div className={`rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${
                  index !== menuItems.length - 1 
                    ? `border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}` 
                    : ''
                } ${
                  isDarkMode 
                    ? 'hover:bg-gray-900' 
                    : 'hover:bg-gray-50'
                } transition-colors cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <div>
                    <span className={`font-medium block ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.label}
                    </span>
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
