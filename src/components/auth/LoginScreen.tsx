
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '@/components/ui/logo';

interface LoginScreenProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

const LoginScreen = ({ onLogin, onSignUp, onForgotPassword }: LoginScreenProps) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
    }`}>
      <div className="max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connect. Learn. Grow together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-[#333]'}`}>
                Email or Username
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-[#1877F2] focus:ring-[#1877F2]'
                    : 'border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]'
                }`}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-[#333]'}`}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-[#1877F2] focus:ring-[#1877F2]'
                    : 'border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]'
                }`}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white py-3 rounded-lg font-medium transition-colors"
          >
            Sign In
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-[#1877F2] hover:underline text-sm font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <button
              onClick={onSignUp}
              className="text-[#1877F2] hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
