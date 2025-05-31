
import React from 'react';
import { ArrowLeft, Users, MessageSquare, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface FollowersViewProps {
  onBack: () => void;
}

const FollowersView = ({ onBack }: FollowersViewProps) => {
  const { isDarkMode } = useTheme();

  const followers = [
    {
      id: 1,
      name: "Sarah Chen",
      major: "Computer Science",
      year: "2024",
      avatar: "SC",
      mutualFollowers: 12
    },
    {
      id: 2,
      name: "Mike Johnson",
      major: "Data Science",
      year: "2025",
      avatar: "MJ",
      mutualFollowers: 8
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      major: "Software Engineering",
      year: "2026",
      avatar: "ER",
      mutualFollowers: 15
    }
  ];

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 border-b ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Followers (128)
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {followers.map((follower) => (
          <div
            key={follower.id}
            className={`rounded-lg border p-4 ${
              isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold">{follower.avatar}</span>
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {follower.name}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {follower.major} • Class of {follower.year}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {follower.mutualFollowers} mutual followers
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-900' : ''}
                >
                  <MessageSquare size={16} />
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <UserPlus size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersView;
