
import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const GroupsScreen = () => {
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

  const handleJoinToggle = (groupId: string) => {
    setJoinedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-[#333]">Groups</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search Group"
            className="pl-10 border-gray-300 focus:border-[#7B1F27] focus:ring-[#7B1F27]"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="px-4 py-3">
        <div className="flex space-x-2">
          {['Most Active', 'Newest', 'Recommended'].map((option) => (
            <button
              key={option}
              className="px-3 py-2 text-sm rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#7B1F27] hover:border-[#7B1F27] transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Groups List */}
      <div className="px-4 space-y-4">
        {groups.map((group) => {
          const isJoined = joinedGroups.includes(group.id);
          
          return (
            <div
              key={group.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl">{group.icon}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#333] text-lg mb-1">
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
                  onClick={() => handleJoinToggle(group.id)}
                  variant={isJoined ? "outline" : "default"}
                  className={`ml-3 ${
                    isJoined 
                      ? 'border-[#7B1F27] text-[#7B1F27] hover:bg-[#7B1F27] hover:text-white' 
                      : 'bg-[#7B1F27] hover:bg-[#5A1A1F] text-white'
                  }`}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupsScreen;
