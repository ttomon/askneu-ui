
import React, { useState } from 'react';
import { MessageCircle, Bookmark, User, Share, Heart } from 'lucide-react';

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
    <div className="bg-white shadow-sm border-b border-gray-100 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-block bg-[#2563EB] text-white text-xs px-2 py-1 rounded-full font-medium">
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
            className={`flex items-center space-x-1 transition-colors ${
              isLiked 
                ? 'text-red-500' 
                : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{localLikes}</span>
          </button>

          <button
            onClick={() => onComment(post.id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-[#2563EB] transition-colors"
          >
            <MessageCircle size={16} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button
            onClick={() => onShare(post.id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-[#2563EB] transition-colors"
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
