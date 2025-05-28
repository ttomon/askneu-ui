
import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsScreen = ({ onBack, onLogout }: SettingsScreenProps) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan.dela.cruz@neu.edu.ph',
    course: 'BS Computer Science',
    year: '3rd Year',
    bio: 'Computer Science student passionate about web development and AI.'
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

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-gray-600 hover:text-[#7B1F27] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#333]">Settings</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#333] flex items-center">
            <User size={20} className="mr-2" />
            Profile
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="border-[#7B1F27] text-[#7B1F27]"
          >
            <Edit size={16} className="mr-1" />
            {isEditingProfile ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        {isEditingProfile ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="mt-1"
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
              className="bg-[#7B1F27] hover:bg-[#5A1A1F] text-white"
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Name:</span> {profile.name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            <p><span className="font-medium">Course:</span> {profile.course}</p>
            <p><span className="font-medium">Year:</span> {profile.year}</p>
            <p><span className="font-medium">Bio:</span> {profile.bio}</p>
          </div>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-[#333] flex items-center mb-4">
          <Bell size={20} className="mr-2" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Push Notifications</span>
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
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-[#333] flex items-center mb-4">
          <Shield size={20} className="mr-2" />
          Privacy
        </h2>
        <div className="space-y-2 text-sm text-gray-600">
          <button className="text-left hover:text-[#7B1F27] transition-colors">
            Block Users
          </button>
          <button className="text-left hover:text-[#7B1F27] transition-colors">
            Privacy Policy
          </button>
          <button className="text-left hover:text-[#7B1F27] transition-colors">
            Terms of Service
          </button>
        </div>
      </div>

      {/* Logout Section */}
      <div className="mx-4 mt-4">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SettingsScreen;
