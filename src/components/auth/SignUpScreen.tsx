
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/ui/logo';

interface SignUpScreenProps {
  onBack: () => void;
  onSubmit: (credentials: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string; 
    confirmPassword: string; 
  }) => void;
}

const SignUpScreen = ({ onBack, onSubmit }: SignUpScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit({ firstName, lastName, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col justify-center px-6">
      <div className="max-w-sm mx-auto w-full">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <h2 className="text-2xl font-bold text-[#333] mb-2">Create Account</h2>
          <p className="text-gray-600">Join the AskNEU community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName" className="text-[#333] font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Juan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-[#333] font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Dela Cruz"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-[#333] font-medium">
              NEU Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="juan.dela.cruz@neu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-[#333] font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-[#333] font-medium">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 border-gray-300 focus:border-[#1877F2] focus:ring-[#1877F2]"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white py-3 rounded-lg font-medium transition-colors"
          >
            Create Account
          </Button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={onBack}
                className="text-[#1877F2] hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;
