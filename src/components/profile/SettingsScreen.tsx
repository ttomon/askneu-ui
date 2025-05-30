
import React from 'react';
import { ArrowLeft, User, Bell, Shield, Palette, HelpCircle, LogOut } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsScreen = ({ onBack, onLogout }: SettingsScreenProps) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

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
                Edit Profile
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

        {/* Logout */}
        <div className={`rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={onLogout}
            className={`flex items-center justify-center w-full p-4 space-x-3 ${
              isDarkMode 
                ? 'text-red-400 hover:bg-gray-900' 
                : 'text-red-600 hover:bg-red-50'
            } transition-colors rounded-lg`}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
