import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, Palette, HelpCircle, LogOut, Edit } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import ProfilePhotoEditor from './ProfilePhotoEditor';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsScreen = ({ onBack, onLogout }: SettingsScreenProps) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  if (showProfileEditor) {
    return (
      <ProfilePhotoEditor
        onBack={() => setShowProfileEditor(false)}
        onSave={() => setShowProfileEditor(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 ${
        isDarkMode ? 'bg-black border-b border-gray-800' : 'bg-white'
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
            Settings
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Account Settings */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Account
          </h2>
          <div className={`rounded-lg shadow-sm border ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <div className="flex items-center space-x-3">
                <Edit className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Edit Profile
                </span>
              </div>
              <button 
                onClick={() => setShowProfileEditor(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
            </div>
            
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <div className="flex items-center space-x-3">
                <User className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Profile Information
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Manage
              </button>
            </div>
            
            <div className={`flex items-center justify-between p-4 ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <div className="flex items-center space-x-3">
                <Shield className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Privacy & Security
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Notifications
          </h2>
          <div className={`rounded-lg shadow-sm border ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <div className="flex items-center space-x-3">
                <Bell className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Push Notifications
                </span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <span className={`text-sm ml-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Email Updates
              </span>
              <Switch defaultChecked />
            </div>
            
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <span className={`text-sm ml-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Group Invites
              </span>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <span className={`text-sm ml-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Post Replies
              </span>
              <Switch />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Appearance
          </h2>
          <div className={`rounded-lg shadow-sm border ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Palette className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Dark Mode
                </span>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Support
          </h2>
          <div className={`rounded-lg shadow-sm border ${
            isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <div className="flex items-center space-x-3">
                <HelpCircle className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Help & Support
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Contact
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <span className={`text-sm ml-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                About AskNEU
              </span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View
              </button>
            </div>
          </div>
        </div>

        {/* Logout with Confirmation */}
        <div className={`rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
            <DialogTrigger asChild>
              <button
                className={`flex items-center justify-center w-full p-4 space-x-3 ${
                  isDarkMode 
                    ? 'text-red-400 hover:bg-gray-900' 
                    : 'text-red-600 hover:bg-red-50'
                } transition-colors rounded-lg`}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </DialogTrigger>
            <DialogContent className={`${
              isDarkMode ? 'bg-black border-gray-800' : 'bg-white'
            }`}>
              <DialogHeader>
                <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Confirm Sign Out
                </DialogTitle>
                <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Are you sure you want to sign out? You'll need to sign in again to access your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowLogoutConfirm(false)}
                  className={isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-900' : ''}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleLogoutConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Sign Out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
