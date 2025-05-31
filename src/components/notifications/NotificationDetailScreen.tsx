import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Users, User, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface NotificationDetailScreenProps {
  notificationId: string;
  onBack: () => void;
}

const NotificationDetailScreen = ({ notificationId, onBack }: NotificationDetailScreenProps) => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);
  const [notification] = useState({
    id: notificationId,
    type: 'like',
    title: 'Ana Reyes liked your question',
    description: 'How do I cite an online journal in APA 7th edition?',
    time: '5m ago',
    isRead: false,
    fullContent: 'Ana Reyes and 3 others liked your question about APA citation. Your question has received positive feedback from the Research101 community.',
    relatedPost: {
      title: 'How do I cite an online journal in APA 7th edition?',
      content: "I'm finalizing my thesis and need clarification on how to cite online sources properly. The journal doesn't have a DOI, so I'm not sure about the format. Should I include the URL? What about the access date? Any help would be appreciated!",
      group: 'Research101',
      author: 'You',
      likes: 24,
      comments: 5,
      replies: [
        {
          id: '1',
          author: 'Ana Reyes',
          content: 'For APA 7th edition, if there\'s no DOI, you should include the URL. The format is: Author, A. A. (Year). Title of article. Title of Journal, Volume(Issue), pages. URL',
          time: '3m ago'
        },
        {
          id: '2',
          author: 'Mark Santos',
          content: 'Also, you don\'t need to include the access date unless the content is likely to change over time.',
          time: '2m ago'
        }
      ]
    }
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return Heart;
      case 'comment':
        return MessageCircle;
      case 'group':
        return Users;
      case 'follow':
        return User;
      default:
        return Heart;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'text-red-500';
      case 'comment':
        return 'text-blue-500';
      case 'group':
        return 'text-green-500';
      case 'follow':
        return 'text-purple-500';
      default:
        return isDarkMode ? 'text-gray-400' : 'text-gray-500';
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      toast({
        title: "Reply sent",
        description: "Your reply has been posted successfully.",
      });
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  const handleViewPost = () => {
    setShowFullPost(true);
    toast({
      title: "Viewing Post",
      description: "Opening full post view with all comments and details.",
    });
  };

  const IconComponent = getIcon(notification.type);

  if (showFullPost) {
    return (
      <div className={`min-h-screen pb-20 max-w-md mx-auto ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        {/* Full Post View Header */}
        <div className={`shadow-sm px-4 py-3 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFullPost(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-900' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Post</h1>
            </div>
          </div>
        </div>

        {/* Full Post Content */}
        <div className="p-4 space-y-4">
          <div className={`rounded-lg border p-4 ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="mb-3">
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
              }`}>
                #{notification.relatedPost.group}
              </span>
            </div>
            <h2 className={`font-bold text-xl mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {notification.relatedPost.title}
            </h2>
            <p className={`text-base mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {notification.relatedPost.content}
            </p>
            <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <span>by {notification.relatedPost.author}</span>
              <span>{notification.relatedPost.likes} likes • {notification.relatedPost.comments} comments</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className={`rounded-lg border p-4 ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Comments ({notification.relatedPost.replies.length})
            </h3>
            <div className="space-y-4">
              {notification.relatedPost.replies.map((reply) => (
                <div key={reply.id} className={`border-l-2 pl-4 ${
                  isDarkMode ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {reply.author}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {reply.time}
                    </span>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment */}
          <div className={`rounded-lg border p-4 ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Add a Comment
            </h4>
            <div className="flex space-x-2">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your comment..."
                className={`flex-1 ${
                  isDarkMode 
                    ? 'border-gray-800 bg-black text-white placeholder-gray-400 focus:border-blue-500'
                    : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && handleReply()}
              />
              <Button
                onClick={handleReply}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-900' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notification</h1>
          </div>
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-900' 
              : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
          }`}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Notification Content */}
      <div className="p-4 space-y-4">
        {/* Main Notification */}
        <div className={`rounded-lg border p-4 ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
            } ${getIconColor(notification.type)}`}>
              <IconComponent size={20} />
            </div>
            <div className="flex-1">
              <h2 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {notification.title}
              </h2>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {notification.fullContent}
              </p>
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {notification.time}
              </span>
            </div>
          </div>
        </div>

        {/* Related Post */}
        {notification.relatedPost && (
          <div className={`rounded-lg border p-4 ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="mb-3">
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
              }`}>
                #{notification.relatedPost.group}
              </span>
            </div>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {notification.relatedPost.title}
            </h3>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {notification.relatedPost.content}
            </p>
            <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <span>by {notification.relatedPost.author}</span>
              <span>{notification.relatedPost.likes} likes • {notification.relatedPost.comments} comments</span>
            </div>
          </div>
        )}

        {/* Existing Replies */}
        {notification.relatedPost?.replies && (
          <div className={`rounded-lg border p-4 ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Replies ({notification.relatedPost.replies.length})
            </h4>
            <div className="space-y-3">
              {notification.relatedPost.replies.map((reply) => (
                <div key={reply.id} className={`border-l-2 pl-3 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {reply.author}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {reply.time}
                    </span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reply Box */}
        {showReplyBox && (
          <div className={`rounded-lg border p-4 ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Add a Reply
            </h4>
            <div className="flex space-x-2">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className={`flex-1 ${
                  isDarkMode 
                    ? 'border-gray-800 bg-black text-white placeholder-gray-400 focus:border-blue-500'
                    : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && handleReply()}
              />
              <Button
                onClick={handleReply}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className={`flex-1 ${
              isDarkMode 
                ? 'border-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={handleViewPost}
          >
            View Post
          </Button>
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            {showReplyBox ? 'Cancel' : 'Reply'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailScreen;
