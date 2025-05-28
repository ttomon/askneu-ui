
import React, { useState } from 'react';
import { MessageCircle, User, Search } from 'lucide-react';
import PostCard from './PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HomeFeedProps {
  onCreatePost: () => void;
  onOpenMessages: () => void;
  onOpenProfile: () => void;
}

const HomeFeed = ({ onCreatePost, onOpenMessages, onOpenProfile }: HomeFeedProps) => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'How do I cite an online journal in APA 7th edition?',
      content: "I'm finalizing my thesis and need clarification on how to cite online sources properly. The journal doesn't have a DOI, so I'm not sure about the format...",
      author: 'Ana Reyes',
      timeAgo: '2h ago',
      group: 'Research101',
      likes: 24,
      comments: 5,
      isLiked: false,
      isSaved: false,
    },
    {
      id: '2',
      title: 'Best practices for React state management?',
      content: "Working on a group project and we're debating between Redux, Zustand, or Context API. What would you recommend for a medium-sized app?",
      author: 'Mark Santos',
      timeAgo: '4h ago',
      group: 'WebDev101',
      likes: 18,
      comments: 12,
      isLiked: true,
      isSaved: true,
    },
    {
      id: '3',
      title: 'Study group for Calculus 2 midterms?',
      content: "Anyone interested in forming a study group for next week's midterms? I'm struggling with integration by parts and partial fractions.",
      author: 'Sofia Chen',
      timeAgo: '6h ago',
      group: 'MathHelp',
      likes: 31,
      comments: 8,
      isLiked: false,
      isSaved: false,
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    console.log('Opening comments for post:', postId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-[#333]">Feed</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={onOpenMessages}
              className="p-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors"
            >
              <MessageCircle size={20} />
            </button>
            <button 
              onClick={onOpenProfile}
              className="p-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors"
            >
              <User size={20} />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search questions, topics, or groups..."
            className="pl-10 border-gray-300 focus:border-[#7B1F27] focus:ring-[#7B1F27]"
          />
        </div>
      </div>

      {/* Create Post Button */}
      <div className="px-4 py-3">
        <Button
          onClick={onCreatePost}
          className="w-full bg-[#7B1F27] hover:bg-[#5A1A1F] text-white py-3 rounded-lg font-medium transition-colors"
        >
          Ask a Question
        </Button>
      </div>

      {/* Sort Options */}
      <div className="px-4 pb-3">
        <div className="flex space-x-2">
          {['Most Recent', 'Most Liked', 'Trending'].map((option) => (
            <button
              key={option}
              className="px-3 py-2 text-sm rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#7B1F27] hover:border-[#7B1F27] transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-0">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onSave={handleSave}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
