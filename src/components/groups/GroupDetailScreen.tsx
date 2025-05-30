
import React, { useState } from 'react';
import { ArrowLeft, Users, MessageCircle, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface GroupDetailScreenProps {
  groupId: string;
  onBack: () => void;
}

const GroupDetailScreen = ({ groupId, onBack }: GroupDetailScreenProps) => {
  const { isDarkMode } = useTheme();
  const [group] = useState({
    id: groupId,
    name: 'Research101',
    description: 'Academic writing and formatting support for all students. Share resources, ask questions about citation styles, research methodologies, and get peer feedback on your academic work.',
    members: 528,
    posts: 342,
    isJoined: true,
    icon: '🧠',
    admins: ['Prof. Martinez', 'Dr. Santos'],
    tags: ['Academic Writing', 'Research', 'APA', 'MLA', 'Citations']
  });

  const [recentPosts] = useState([
    {
      id: '1',
      title: 'How to properly cite online sources in APA 7th edition?',
      author: 'Maria Santos',
      time: '2h ago',
      replies: 8,
      likes: 15
    },
    {
      id: '2',
      title: 'Best practices for literature review organization',
      author: 'Juan Dela Cruz',
      time: '5h ago',
      replies: 12,
      likes: 23
    }
  ]);

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 ${isDarkMode ? 'bg-black border-b border-gray-800' : 'bg-white'}`}>
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
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{group.name}</h1>
        </div>
      </div>

      {/* Group Info */}
      <div className={`mx-4 mt-4 rounded-lg shadow-sm border p-6 ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <span className="text-3xl">{group.icon}</span>
          </div>
          <div className="flex-1">
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{group.name}</h2>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{group.description}</p>
            <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <div className="flex items-center">
                <Users size={14} />
                <span className="ml-1">{group.members} members</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={14} />
                <span className="ml-1">{group.posts} posts</span>
              </div>
            </div>
          </div>
          <Button
            variant={group.isJoined ? "outline" : "default"}
            className={group.isJoined 
              ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          >
            {group.isJoined ? 'Joined' : 'Join'}
          </Button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {group.tags.map((tag) => (
            <span key={tag} className={`px-2 py-1 text-xs rounded-full ${
              isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
            }`}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Admins */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <span className="font-medium">Admins:</span> {group.admins.join(', ')}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mx-4 mt-4">
        <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Posts</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <div key={post.id} className={`rounded-lg shadow-sm border p-4 ${
              isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{post.title}</h4>
              <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>by {post.author} • {post.time}</span>
                <span>{post.likes} likes • {post.replies} replies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailScreen;
