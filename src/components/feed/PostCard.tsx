
import React, { useState } from 'react';
import { MessageCircle, Bookmark, User, Share, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timeAgo: string;
  group: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostCard = ({ post, onLike, onSave, onComment, onShare }: PostCardProps) => {
  const { isDarkMode } = useTheme();
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikes(isLiked ? localLikes - 1 : localLikes + 1);
    onLike(post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(post.id);
  };

  return (
    <div className={`shadow-sm border-b p-4 transition-colors ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              #{post.group}
            </span>
          </div>
          <h3 className={`font-bold text-lg mb-2 leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h3>
          <p className={`text-sm line-clamp-3 mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {post.content}
          </p>
        </div>
      </div>

      <div className={`flex items-center justify-between text-sm mb-3 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <div className="flex items-center space-x-1">
          <User size={14} />
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.timeAgo}</span>
        </div>
      </div>

      <div className={`flex items-center justify-between pt-3 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-colors ${
              isLiked 
                ? 'text-red-500' 
                : isDarkMode 
                  ? 'text-gray-400 hover:text-red-500'
                  : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{localLikes}</span>
          </button>

          <button
            onClick={() => onComment(post.id)}
            className={`flex items-center space-x-1 transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <MessageCircle size={16} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button
            onClick={() => onShare(post.id)}
            className={`flex items-center space-x-1 transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Share size={16} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          className={`transition-colors ${
            isSaved 
              ? 'text-blue-500' 
              : isDarkMode 
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
