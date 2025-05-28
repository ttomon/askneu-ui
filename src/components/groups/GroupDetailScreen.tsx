
import React, { useState } from 'react';
import { ArrowLeft, Users, MessageCircle, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GroupDetailScreenProps {
  groupId: string;
  onBack: () => void;
}

const GroupDetailScreen = ({ groupId, onBack }: GroupDetailScreenProps) => {
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#333]">{group.name}</h1>
        </div>
      </div>

      {/* Group Info */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-3xl">{group.icon}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#333] mb-2">{group.name}</h2>
            <p className="text-gray-600 text-sm mb-3">{group.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
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
              ? 'border-[#7B1F27] text-[#7B1F27] hover:bg-[#7B1F27] hover:text-white' 
              : 'bg-[#7B1F27] hover:bg-[#5A1A1F] text-white'
            }
          >
            {group.isJoined ? 'Joined' : 'Join'}
          </Button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {group.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-[#F4C430]/20 text-[#7B1F27] text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Admins */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Admins:</span> {group.admins.join(', ')}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mx-4 mt-4">
        <h3 className="text-lg font-bold text-[#333] mb-3">Recent Posts</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h4 className="font-semibold text-[#333] mb-2">{post.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-500">
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
