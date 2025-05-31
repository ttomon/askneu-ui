
import React from 'react';
import { ArrowLeft, MessageSquare, Clock, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface QuestionsViewProps {
  onBack: () => void;
}

const QuestionsView = ({ onBack }: QuestionsViewProps) => {
  const { isDarkMode } = useTheme();

  const questions = [
    {
      id: 1,
      title: "How do I implement a binary search tree in JavaScript?",
      content: "I'm struggling with understanding the implementation details...",
      timestamp: "2 hours ago",
      likes: 12,
      answers: 5,
      tags: ["JavaScript", "Data Structures"]
    },
    {
      id: 2,
      title: "What's the difference between React hooks and class components?",
      content: "Can someone explain when to use each approach?",
      timestamp: "1 day ago",
      likes: 8,
      answers: 3,
      tags: ["React", "JavaScript"]
    },
    {
      id: 3,
      title: "Best practices for database normalization?",
      content: "Working on a project and need guidance on proper database design...",
      timestamp: "3 days ago",
      likes: 15,
      answers: 7,
      tags: ["Database", "SQL"]
    }
  ];

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 border-b ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My Questions (24)
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`rounded-lg border p-4 ${
              isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
            }`}
          >
            <h3 className={`font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {question.title}
            </h3>
            <p className={`text-sm mb-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {question.content}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className={`flex items-center space-x-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Heart size={16} />
                  <span>{question.likes}</span>
                </div>
                <div className={`flex items-center space-x-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <MessageSquare size={16} />
                  <span>{question.answers} answers</span>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                <Clock size={14} />
                <span>{question.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsView;
