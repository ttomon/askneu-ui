import React, { useState } from 'react';
import { ArrowLeft, Camera, Bell, Users, MessageSquare, Moon, Sun, LogOut, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import ProfilePhotoEditor from './ProfilePhotoEditor';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsScreen = ({ onBack, onLogout }: SettingsScreenProps) => {
  const { toast } = useToast();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [settings, setSettings] = useState({
    emailUpdates: true,
    groupInvites: false,
    postReplies: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const handleLogoutConfirm = () => {
    onLogout();
    setShowLogoutConfirm(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  if (showLogoutConfirm) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 max-w-md mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`rounded-lg p-6 w-full max-w-sm shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle size={48} className="text-yellow-500" />
          </div>
          <h2 className={`text-xl font-bold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Confirm Logout
          </h2>
          <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Are you sure you want to log out of your account?
          </p>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowLogoutConfirm(false)}
              className={`flex-1 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLogoutConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          </div>
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            variant="outline"
            size="sm"
            className={isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' : ''}
          >
            {isEditMode ? 'Done' : 'Edit'}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Photo Editor - Only in Edit Mode */}
        {isEditMode && (
          <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Profile Photo
            </h3>
            <ProfilePhotoEditor />
          </div>
        )}

        {/* Dark Mode Toggle */}
        <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? <Moon size={20} className="text-gray-300" /> : <Sun size={20} className="text-gray-600" />}
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dark Mode
              </span>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Bell size={20} />
            <span>Notifications</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Updates</span>
              <Switch
                checked={settings.emailUpdates}
                onCheckedChange={(checked) => updateSetting('emailUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Group Invites</span>
              <Switch
                checked={settings.groupInvites}
                onCheckedChange={(checked) => updateSetting('groupInvites', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Post Replies</span>
              <Switch
                checked={settings.postReplies}
                onCheckedChange={(checked) => updateSetting('postReplies', checked)}
              />
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Account</h3>
          
          <Button
            onClick={() => setShowLogoutConfirm(true)}
            variant="destructive"
            className="w-full"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
