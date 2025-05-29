
import React, { useState } from 'react';
import { User, Bookmark, Users, Settings, LogOut, Moon, Sun, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/contexts/ThemeContext';
import ProfilePhotoEditor from './ProfilePhotoEditor';
import SettingsScreen from './SettingsScreen';
import GroupDetailScreen from '../groups/GroupDetailScreen';

interface ProfileScreenProps {
  onLogout?: () => void;
}

const ProfileScreen = ({ onLogout }: ProfileScreenProps) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [userStats] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan.dela.cruz@neu.edu.ph',
    course: 'BS Computer Science',
    year: '3rd Year',
    postsCount: 12,
    answersCount: 34,
    groupsCount: 8,
    reputation: 245,
    profilePhoto: '',
  });

  const [userPosts] = useState([
    {
      id: '1',
      title: 'How to implement authentication in React?',
      content: 'Working on a project and need help with JWT authentication...',
      group: 'WebDev101',
      timeAgo: '2 days ago',
      likes: 15,
      replies: 8
    },
    {
      id: '2',
      title: 'Best practices for database design?',
      content: 'Looking for advice on normalizing my database schema...',
      group: 'Database101',
      timeAgo: '5 days ago',
      likes: 23,
      replies: 12
    }
  ]);

  const [userGroups] = useState([
    { id: 'research101', name: 'Research101', description: 'Academic research and writing support', members: 528 },
    { id: 'webdev101', name: 'WebDev101', description: 'Web development discussions', members: 342 },
    { id: 'mathhelp', name: 'MathHelp', description: 'Mathematics study group', members: 189 }
  ]);

  const handleLogout = () => {
    console.log('User logging out');
    if (onLogout) {
      onLogout();
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  const handleViewGroup = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  const handleBackFromGroup = () => {
    setSelectedGroup(null);
  };

  const handlePhotoChange = (photoUrl: string) => {
    // Here you would typically update the user's profile photo
    console.log('Profile photo updated:', photoUrl);
  };

  if (showSettings) {
    return (
      <SettingsScreen
        onBack={handleBackFromSettings}
        onLogout={handleLogout}
      />
    );
  }

  if (selectedGroup) {
    return (
      <GroupDetailScreen
        groupId={selectedGroup}
        onBack={handleBackFromGroup}
      />
    );
  }

  return (
    <div className={`min-h-screen pb-20 transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile</h1>
          <div className="flex space-x-2">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={handleSettingsClick}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-red-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
              }`}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className={`mx-4 mt-4 rounded-lg shadow-sm border p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center space-x-4 mb-4">
          <ProfilePhotoEditor 
            onPhotoChange={handlePhotoChange}
            currentPhoto={userStats.profilePhoto}
            isDarkMode={isDarkMode}
          />
          <div className="flex-1">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{userStats.name}</h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{userStats.email}</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userStats.course} • {userStats.year}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className={`text-center p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.postsCount}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions</div>
          </div>
          <div className={`text-center p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.answersCount}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Answers</div>
          </div>
          <div className={`text-center p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.groupsCount}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Groups</div>
          </div>
          <div className={`text-center p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{userStats.reputation}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Reputation</div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mx-4 mt-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <TabsTrigger value="posts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              My Posts
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Saved
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Groups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4 space-y-4">
            {userPosts.map((post) => (
              <div key={post.id} className={`rounded-lg shadow-sm border p-4 transition-colors ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.content}</p>
                <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span>#{post.group} • {post.timeAgo}</span>
                  <span>{post.likes} likes • {post.replies} replies</span>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            <div className="text-center py-8">
              <Bookmark size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No saved posts</h3>
              <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Save interesting posts to read them later</p>
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-4 space-y-3">
            {userGroups.map((group) => (
              <div key={group.id} className={`rounded-lg shadow-sm border p-4 transition-colors ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Users size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{group.name}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{group.members} members</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleViewGroup(group.id)}
                    variant="outline" 
                    size="sm" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Eye size={14} className="mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileScreen;
