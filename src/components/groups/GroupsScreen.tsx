
import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GroupDetailScreen from './GroupDetailScreen';

const GroupsScreen = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Groups</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search Group"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB] bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="px-4 py-3">
        <div className="flex space-x-2">
          {['Most Active', 'Newest', 'Recommended'].map((option) => (
            <button
              key={option}
              className="px-4 py-2 text-sm rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all duration-200 shadow-sm"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="px-4 pb-2">
          <p className="text-sm text-gray-600">
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
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleGroupClick(group.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                    <span className="text-2xl">{group.icon}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {group.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {group.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm">
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
                      ? 'border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white' 
                      : 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-md hover:shadow-lg'
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
          <Search size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No groups found</h3>
          <p className="text-gray-400">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default GroupsScreen;
