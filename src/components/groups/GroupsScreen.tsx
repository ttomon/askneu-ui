
import React, { useState } from 'react';
import { Search, Users, Hash, TrendingUp, Star, Calendar, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import GroupDetailScreen from './GroupDetailScreen';

const GroupsScreen = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('discover');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [joinedGroups, setJoinedGroups] = useState<string[]>(['1', '3']);

  const groups = [
    {
      id: '1',
      name: 'Research101',
      description: 'Academic research and citation help',
      members: 1234,
      posts: 89,
      category: 'Academic',
      isPopular: true,
      recentActivity: '2m ago',
      image: '📚'
    },
    {
      id: '2',
      name: 'WebDev101',
      description: 'Learn web development together',
      members: 987,
      posts: 156,
      category: 'Technology',
      isPopular: true,
      recentActivity: '5m ago',
      image: '💻'
    },
    {
      id: '3',
      name: 'MathHelp',
      description: 'Mathematics study group and homework help',
      members: 756,
      posts: 234,
      category: 'Academic',
      isPopular: false,
      recentActivity: '10m ago',
      image: '🔢'
    },
    {
      id: '4',
      name: 'Career Advice',
      description: 'Professional development and career guidance',
      members: 543,
      posts: 67,
      category: 'Professional',
      isPopular: false,
      recentActivity: '15m ago',
      image: '💼'
    }
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleJoin = (groupId: string) => {
    setJoinedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  if (selectedGroup) {
    return (
      <GroupDetailScreen 
        groupId={selectedGroup} 
        onBack={() => setSelectedGroup(null)} 
      />
    );
  }

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-4 border-b ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Groups</h1>
        
        <div className="relative mb-4">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={16} />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 ${
              isDarkMode 
                ? 'border-gray-800 bg-black text-white placeholder-gray-400 focus:border-blue-500'
                : 'border-gray-300 bg-gray-50 hover:bg-white focus:border-blue-600'
            }`}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {[
            { id: 'discover', label: 'Discover', icon: Hash },
            { id: 'joined', label: 'Joined', icon: Users },
            { id: 'popular', label: 'Popular', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-1 px-4 py-2 text-sm rounded-lg transition-colors ${
                selectedTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Groups List */}
      <div className="p-4 space-y-3">
        {filteredGroups
          .filter(group => {
            if (selectedTab === 'joined') return joinedGroups.includes(group.id);
            if (selectedTab === 'popular') return group.isPopular;
            return true;
          })
          .map((group) => (
            <div
              key={group.id}
              className={`rounded-lg border p-4 transition-colors ${
                isDarkMode ? 'bg-black border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-2xl">{group.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {group.name}
                      </h3>
                      {group.isPopular && (
                        <Star size={16} className="text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {group.description}
                    </p>
                    <div className={`flex items-center space-x-4 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{group.members.toLocaleString()} members</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle size={12} />
                        <span>{group.posts} posts</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{group.recentActivity}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-900 text-gray-400' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {group.category}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedGroup(group.id)}
                    className={`${
                      isDarkMode 
                        ? 'border-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => toggleJoin(group.id)}
                    className={
                      joinedGroups.includes(group.id)
                        ? isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }
                  >
                    {joinedGroups.includes(group.id) ? 'Joined' : 'Join'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Hash size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No groups found</h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default GroupsScreen;
