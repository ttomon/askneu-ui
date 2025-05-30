
import React, { useState } from 'react';
import LoginScreen from '@/components/auth/LoginScreen';
import SignUpScreen from '@/components/auth/SignUpScreen';
import ForgotPasswordScreen from '@/components/auth/ForgotPasswordScreen';
import HomeFeed from '@/components/feed/HomeFeed';
import AskQuestionModal from '@/components/feed/AskQuestionModal';
import MessagesScreen from '@/components/messages/MessagesScreen';
import GroupsScreen from '@/components/groups/GroupsScreen';
import NotificationsScreen from '@/components/notifications/NotificationsScreen';
import ProfileScreen from '@/components/profile/ProfileScreen';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { isDarkMode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [authScreen, setAuthScreen] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const { toast } = useToast();

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log('Login attempt:', credentials);
    // Simulate login validation
    if (credentials.email && credentials.password) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome to AskNEU!",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignUp = (credentials: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log('Sign up attempt:', credentials);
    toast({
      title: "Account Created",
      description: "Your account has been created successfully. Please sign in.",
    });
    setAuthScreen('login');
  };

  const handleForgotPassword = (email: string) => {
    console.log('Forgot password for:', email);
    toast({
      title: "Reset Link Sent",
      description: "A password reset link has been sent to your email.",
    });
    setAuthScreen('login');
  };

  const handleCreatePost = () => {
    setShowAskQuestion(true);
  };

  const handleSubmitQuestion = (question: any) => {
    console.log('New question submitted:', question);
    // Here you would typically send the question to your backend
  };

  const handleOpenMessages = () => {
    setActiveTab('messages');
  };

  const handleOpenProfile = () => {
    setActiveTab('profile');
  };

  const handleLogout = () => {
    console.log('User logged out');
    setIsAuthenticated(false);
    setActiveTab('home');
    setAuthScreen('login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    switch (authScreen) {
      case 'signup':
        return (
          <SignUpScreen
            onBack={() => setAuthScreen('login')}
            onSubmit={handleSignUp}
          />
        );
      case 'forgot':
        return (
          <ForgotPasswordScreen
            onBack={() => setAuthScreen('login')}
            onSubmit={handleForgotPassword}
          />
        );
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onSignUp={() => setAuthScreen('signup')}
            onForgotPassword={() => setAuthScreen('forgot')}
          />
        );
    }
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeFeed
            onCreatePost={handleCreatePost}
            onOpenMessages={handleOpenMessages}
            onOpenProfile={handleOpenProfile}
          />
        );
      case 'messages':
        return <MessagesScreen />;
      case 'groups':
        return <GroupsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return (
          <HomeFeed
            onCreatePost={handleCreatePost}
            onOpenMessages={handleOpenMessages}
            onOpenProfile={handleOpenProfile}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {renderActiveScreen()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <AskQuestionModal
        isOpen={showAskQuestion}
        onClose={() => setShowAskQuestion(false)}
        onSubmit={handleSubmitQuestion}
      />
    </div>
  );
};

export default Index;
