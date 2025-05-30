
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '@/components/ui/logo';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSubmit: (email: string) => void;
}

const ForgotPasswordScreen = ({ onBack, onSubmit }: ForgotPasswordScreenProps) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto ${
      isDarkMode ? 'bg-black' : 'bg-gradient-to-br from-white to-gray-50'
    }`}>
      <div className="max-w-sm mx-auto w-full">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-900'
                : 'text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
            Forgot Password
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your email to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-[#333]'}`}>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 ${
                isDarkMode 
                  ? 'border-gray-800 bg-black text-white placeholder-gray-500 focus:border-[#1877F2] focus:ring-[#1877F2]'
                  : 'border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]'
              }`}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white py-3 rounded-lg font-medium transition-colors"
          >
            Send Reset Link
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-[#1877F2] hover:underline text-sm font-medium"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
