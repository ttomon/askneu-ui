import React, { useState } from 'react';
import { MessageCircle, User, Search } from 'lucide-react';
import PostCard from './PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HomeFeedProps {
  onCreatePost: () => void;
  onOpenMessages: () => void;
  onOpenProfile: () => void;
}

const HomeFeed = ({ onCreatePost, onOpenMessages, onOpenProfile }: HomeFeedProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      toast({
        title: "Search Results",
        description: `Found ${filteredPosts.length} results for "${query}"`,
      });
    }
  };

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

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast({
        title: "Post Shared",
        description: `"${post.title}" has been shared to your timeline.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Feed</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={onOpenMessages}
              className="p-2 rounded-lg text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-200"
            >
              <MessageCircle size={20} />
            </button>
            <button 
              onClick={onOpenProfile}
              className="p-2 rounded-lg text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-200"
            >
              <User size={20} />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search questions, topics, or groups..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB] bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Create Post Button */}
      <div className="px-4 py-3">
        <Button
          onClick={onCreatePost}
          className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
            Showing {filteredPosts.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-0">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onSave={handleSave}
            onComment={handleComment}
            onShare={handleShare}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No results found</h3>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
