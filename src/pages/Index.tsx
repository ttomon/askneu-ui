
import React, { useState } from 'react';
import LoginScreen from '@/components/auth/LoginScreen';
import HomeFeed from '@/components/feed/HomeFeed';
import MessagesScreen from '@/components/messages/MessagesScreen';
import GroupsScreen from '@/components/groups/GroupsScreen';
import NotificationsScreen from '@/components/notifications/NotificationsScreen';
import ProfileScreen from '@/components/profile/ProfileScreen';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
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

  const handleSignUp = () => {
    toast({
      title: "Sign Up",
      description: "Sign up functionality would be implemented here.",
    });
  };

  const handleCreatePost = () => {
    toast({
      title: "Create Post",
      description: "Post creation modal would open here.",
    });
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
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} onSignUp={handleSignUp} />;
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
    <div className="min-h-screen bg-gray-50">
      {renderActiveScreen()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
