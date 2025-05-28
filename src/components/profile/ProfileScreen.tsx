
import React, { useState } from 'react';
import { User, Bookmark, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileScreen = () => {
  const [userStats] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan.dela.cruz@neu.edu.ph',
    course: 'BS Computer Science',
    year: '3rd Year',
    postsCount: 12,
    answersCount: 34,
    groupsCount: 8,
    reputation: 245,
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#333]">Profile</h1>
          <button className="p-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B1F27] to-[#A52A2A] flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#333]">{userStats.name}</h2>
            <p className="text-gray-600">{userStats.email}</p>
            <p className="text-sm text-gray-500">{userStats.course} • {userStats.year}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#7B1F27]">{userStats.postsCount}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#7B1F27]">{userStats.answersCount}</div>
            <div className="text-sm text-gray-600">Answers</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#7B1F27]">{userStats.groupsCount}</div>
            <div className="text-sm text-gray-600">Groups</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#F4C430]">{userStats.reputation}</div>
            <div className="text-sm text-gray-600">Reputation</div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mx-4 mt-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger value="posts" className="data-[state=active]:bg-[#7B1F27] data-[state=active]:text-white">
              My Posts
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-[#7B1F27] data-[state=active]:text-white">
              Saved
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-[#7B1F27] data-[state=active]:text-white">
              Groups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-[#333] mb-2">How to implement authentication in React?</h3>
              <p className="text-sm text-gray-600 mb-2">Working on a project and need help with JWT authentication...</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>#WebDev101 • 2 days ago</span>
                <span>15 likes • 8 replies</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            <div className="text-center py-8">
              <Bookmark size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">No saved posts</h3>
              <p className="text-gray-400">Save interesting posts to read them later</p>
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-4 space-y-3">
            {['Research101', 'WebDev101', 'MathHelp'].map((group) => (
              <div key={group} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#7B1F27] flex items-center justify-center">
                      <Users size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#333]">{group}</h3>
                      <p className="text-sm text-gray-600">Active member</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#7B1F27] text-[#7B1F27]">
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
