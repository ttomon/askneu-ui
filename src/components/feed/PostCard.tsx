
import React, { useState } from 'react';
import { MessageCircle, Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}

const PostCard = ({ post, onLike, onSave, onComment }: PostCardProps) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 mx-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-block bg-[#7B1F27] text-white text-xs px-2 py-1 rounded-full font-medium">
              #{post.group}
            </span>
          </div>
          <h3 className="font-bold text-[#333] text-lg mb-2 leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {post.content}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div className="flex items-center space-x-1">
          <User size={14} />
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.timeAgo}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              isLiked 
                ? 'text-[#7B1F27] bg-[#F4C430]/10' 
                : 'text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50'
            }`}
          >
            <span className={`text-lg ${isLiked ? 'text-[#7B1F27]' : ''}`}>👍</span>
            <span className="text-sm font-medium">{localLikes}</span>
          </button>

          <button
            onClick={() => onComment(post.id)}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors"
          >
            <MessageCircle size={16} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          className={`p-2 rounded-lg transition-colors ${
            isSaved 
              ? 'text-[#F4C430] bg-[#F4C430]/10' 
              : 'text-gray-600 hover:text-[#F4C430] hover:bg-gray-50'
          }`}
        >
          <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
