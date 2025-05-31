
import React from 'react';
import { ArrowLeft, MessageSquare, Clock, Heart, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AnswersViewProps {
  onBack: () => void;
}

const AnswersView = ({ onBack }: AnswersViewProps) => {
  const { isDarkMode } = useTheme();

  const answers = [
    {
      id: 1,
      question: "How to optimize React performance?",
      answer: "Use React.memo for component memoization, useMemo for expensive calculations, and useCallback for function memoization...",
      timestamp: "1 hour ago",
      likes: 25,
      isAccepted: true
    },
    {
      id: 2,
      question: "Explain closure in JavaScript",
      answer: "A closure is created when a function is defined inside another function and has access to the outer function's variables...",
      timestamp: "4 hours ago",
      likes: 18,
      isAccepted: false
    },
    {
      id: 3,
      question: "What is the difference between SQL and NoSQL?",
      answer: "SQL databases are relational and use structured schemas, while NoSQL databases are non-relational and more flexible...",
      timestamp: "1 day ago",
      likes: 32,
      isAccepted: true
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
            My Answers (56)
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`rounded-lg border p-4 ${
              isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start space-x-2 mb-2">
              {answer.isAccepted && (
                <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
              )}
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {answer.question}
              </h3>
            </div>
            
            <p className={`text-sm mb-3 ml-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {answer.answer}
            </p>

            <div className="flex items-center justify-between ml-6">
              <div className={`flex items-center space-x-1 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Heart size={16} />
                <span>{answer.likes} likes</span>
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                <Clock size={14} />
                <span>{answer.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswersView;
