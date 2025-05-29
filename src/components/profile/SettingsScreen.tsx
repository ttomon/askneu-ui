import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useTheme } from '@/contexts/ThemeContext';
import ProfilePhotoEditor from './ProfilePhotoEditor';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsScreen = ({ onBack, onLogout }: SettingsScreenProps) => {
  const { isDarkMode } = useTheme();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan.dela.cruz@neu.edu.ph',
    course: 'BS Computer Science',
    year: '3rd Year',
    bio: 'Computer Science student passionate about web development and AI.',
    profilePhoto: ''
  });

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailUpdates: false,
    groupInvites: true,
    postReplies: true
  });

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
  };

  const handlePhotoChange = (photoUrl: string) => {
    setProfile({...profile, profilePhoto: photoUrl});
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className={`min-h-screen pb-20 transition-colors max-w-md mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 transition-colors ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className={`mx-4 mt-4 rounded-lg shadow-sm border p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <User size={20} className="mr-2" />
            Profile
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className={`${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-red-600 text-red-600 hover:bg-red-50'
            }`}
          >
            <Edit size={16} className="mr-1" />
            {isEditingProfile ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        {isEditingProfile ? (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <ProfilePhotoEditor 
                onPhotoChange={handlePhotoChange}
                currentPhoto={profile.profilePhoto}
                isDarkMode={isDarkMode}
              />
            </div>
            <div>
              <Label htmlFor="name" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className={`mt-1 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={profile.course}
                onChange={(e) => setProfile({...profile, course: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="year">Year Level</Label>
              <Input
                id="year"
                value={profile.year}
                onChange={(e) => setProfile({...profile, year: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="mt-1"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <div className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p><span className="font-medium">Name:</span> {profile.name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            <p><span className="font-medium">Course:</span> {profile.course}</p>
            <p><span className="font-medium">Year:</span> {profile.year}</p>
            <p><span className="font-medium">Bio:</span> {profile.bio}</p>
          </div>
        )}
      </div>

      {/* Notifications Section */}
      <div className={`mx-4 mt-4 rounded-lg shadow-sm border p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-bold flex items-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <Bell size={20} className="mr-2" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Push Notifications</span>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Email Updates</span>
            <Switch
              checked={notifications.emailUpdates}
              onCheckedChange={(checked) => setNotifications({...notifications, emailUpdates: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Group Invites</span>
            <Switch
              checked={notifications.groupInvites}
              onCheckedChange={(checked) => setNotifications({...notifications, groupInvites: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Post Replies</span>
            <Switch
              checked={notifications.postReplies}
              onCheckedChange={(checked) => setNotifications({...notifications, postReplies: checked})}
            />
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className={`mx-4 mt-4 rounded-lg shadow-sm border p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-bold flex items-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <Shield size={20} className="mr-2" />
          Privacy
        </h2>
        <div className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <button className={`text-left transition-colors ${
            isDarkMode ? 'hover:text-red-400' : 'hover:text-red-600'
          }`}>
            Block Users
          </button>
          <button className={`text-left transition-colors ${
            isDarkMode ? 'hover:text-red-400' : 'hover:text-red-600'
          }`}>
            Privacy Policy
          </button>
          <button className={`text-left transition-colors ${
            isDarkMode ? 'hover:text-red-400' : 'hover:text-red-600'
          }`}>
            Terms of Service
          </button>
        </div>
      </div>

      {/* Logout Section */}
      <div className="mx-4 mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <AlertDialogHeader>
              <AlertDialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Are you sure you want to logout?
              </AlertDialogTitle>
              <AlertDialogDescription className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                You will be signed out of your account and redirected to the login screen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : ''}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SettingsScreen;
