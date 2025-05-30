import React, { useState } from 'react';
import { User, Search } from 'lucide-react';
import PostCard from './PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

interface HomeFeedProps {
  onCreatePost: () => void;
  onOpenMessages: () => void;
  onOpenProfile: () => void;
}

const HomeFeed = ({ onCreatePost, onOpenMessages, onOpenProfile }: HomeFeedProps) => {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'How do I cite an online journal in APA 7th edition?',
      content: "I'm finalizing my thesis and need clarification on how to cite online sources properly. The journal doesn't have a DOI, so I'm not sure about the format...",
      author: 'Ana Reyes',
      timeAgo: '2h ago',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
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
      timestamp: Date.now() - 4 * 60 * 60 * 1000,
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
      timestamp: Date.now() - 6 * 60 * 60 * 1000,
      group: 'MathHelp',
      likes: 31,
      comments: 8,
      isLiked: false,
      isSaved: false,
    },
  ]);

  const sortPosts = (posts: any[], sortType: string) => {
    switch (sortType) {
      case 'recent':
        return [...posts].sort((a, b) => b.timestamp - a.timestamp);
      case 'liked':
        return [...posts].sort((a, b) => b.likes - a.likes);
      case 'trending':
        return [...posts].sort((a, b) => (b.likes + b.comments * 2) - (a.likes + a.comments * 2));
      default:
        return posts;
    }
  };

  const filteredAndSortedPosts = sortPosts(
    posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.group.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    sortBy
  );

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
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast({
        title: "Opening Comments",
        description: `Viewing comments for "${post.title}".`,
      });
      // Here you would navigate to a comment detail view
      console.log('Opening comments for post:', postId);
    }
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
    <div className={`min-h-screen pb-20 transition-colors ${isDarkMode ? 'bg-black' : 'bg-gray-50'} max-w-md mx-auto`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-4 border-b transition-colors ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Feed</h1>
          <button 
            onClick={onOpenProfile}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <User size={20} />
          </button>
        </div>
        
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={16} />
          <Input
            placeholder="Search questions, topics, or groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 transition-colors ${
              isDarkMode 
                ? 'border-gray-800 bg-black text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 bg-gray-50 hover:bg-white focus:border-blue-600 focus:ring-blue-600'
            }`}
          />
        </div>
      </div>

      {/* Create Post Button - Removed glowing effect */}
      <div className="px-4 py-3">
        <Button
          onClick={onCreatePost}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          ✨ Ask a Question
        </Button>
      </div>

      {/* Sort Options */}
      <div className="px-4 pb-3">
        <div className="flex space-x-2">
          {[
            { id: 'recent', label: 'Most Recent' },
            { id: 'liked', label: 'Most Liked' },
            { id: 'trending', label: 'Trending' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 shadow-sm ${
                sortBy === option.id
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-blue-400 hover:border-blue-500 hover:bg-gray-800'
                    : 'bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-0">
        {filteredAndSortedPosts.map((post) => (
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

      {filteredAndSortedPosts.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No results found</h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
