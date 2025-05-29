import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import GroupDetailScreen from './GroupDetailScreen';

const GroupsScreen = () => {
  const { isDarkMode } = useTheme();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [groups] = useState([
    {
      id: '1',
      name: 'Research101',
      description: 'Academic writing and formatting support.',
      members: 528,
      isJoined: true,
      color: 'bg-blue-500',
      icon: '🧠',
    },
    {
      id: '2',
      name: 'WebDev101',
      description: 'HTML, CSS, JS for beginners.',
      members: 421,
      isJoined: true,
      color: 'bg-green-500',
      icon: '👩‍💻',
    },
    {
      id: '3',
      name: 'LitCrit NEU',
      description: 'Literary Theory & Criticism for HUMSS students.',
      members: 89,
      isJoined: false,
      color: 'bg-purple-500',
      icon: '📚',
    },
    {
      id: '4',
      name: 'MathHelp',
      description: 'Collaborative problem solving for all math levels.',
      members: 312,
      isJoined: false,
      color: 'bg-orange-500',
      icon: '🔢',
    },
    {
      id: '5',
      name: 'CS Careers',
      description: 'Internships, job hunting, and career advice.',
      members: 756,
      isJoined: false,
      color: 'bg-indigo-500',
      icon: '💼',
    },
  ]);

  const [joinedGroups, setJoinedGroups] = useState(
    groups.filter(group => group.isJoined).map(group => group.id)
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinToggle = (groupId: string) => {
    setJoinedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleGroupClick = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  const handleBackFromDetail = () => {
    setSelectedGroupId(null);
  };

  if (selectedGroupId) {
    return (
      <GroupDetailScreen
        groupId={selectedGroupId}
        onBack={handleBackFromDetail}
      />
    );
  }

  return (
    <div className={`min-h-screen pb-20 transition-colors max-w-md mx-auto ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-4 border-b transition-colors ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Groups</h1>
        </div>
        
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={16} />
          <Input
            placeholder="Search Group"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 transition-colors ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 bg-gray-50 hover:bg-white focus:border-blue-600 focus:ring-blue-600'
            }`}
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="px-4 py-3">
        <div className="flex space-x-2">
          {['Most Active', 'Newest', 'Recommended'].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 shadow-sm ${
                isDarkMode
                  ? 'bg-gray-800 border border-gray-600 text-gray-300 hover:text-blue-400 hover:border-blue-500 hover:bg-gray-700'
                  : 'bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="px-4 pb-2">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredGroups.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Groups List */}
      <div className="px-4 space-y-4">
        {filteredGroups.map((group) => {
          const isJoined = joinedGroups.includes(group.id);
          
          return (
            <div
              key={group.id}
              className={`rounded-xl shadow-sm border p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              onClick={() => handleGroupClick(group.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  }`}>
                    <span className="text-2xl">{group.icon}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {group.name}
                    </h3>
                    <p className={`text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {group.description}
                    </p>
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Users size={14} />
                      <span className="ml-1">{group.members} members</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinToggle(group.id);
                  }}
                  variant={isJoined ? "outline" : "default"}
                  className={`ml-3 rounded-xl transition-all duration-200 ${
                    isJoined 
                      ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGroups.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No groups found</h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default GroupsScreen;
