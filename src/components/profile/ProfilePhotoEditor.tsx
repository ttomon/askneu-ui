
import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Camera, Upload, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfilePhotoEditorProps {
  onBack: () => void;
  onSave: () => void;
}

const ProfilePhotoEditor = ({ onBack, onSave }: ProfilePhotoEditorProps) => {
  const { isDarkMode } = useTheme();
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@northeastern.edu',
    university: 'Northeastern University',
    major: 'Computer Science',
    graduationYear: '2025',
    bio: 'Passionate computer science student interested in software development and AI.',
    location: 'Boston, MA'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreviewUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', formData);
    onSave();
  };

  return (
    <div className={`min-h-screen pb-20 max-w-md mx-auto ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm px-4 py-3 border-b ${
        isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
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
              Edit Profile
            </h1>
          </div>
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save size={16} className="mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Photo Section */}
        <div className={`rounded-lg border p-6 ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Profile Photo
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center relative group cursor-pointer" onClick={triggerFileSelect}>
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-white" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={triggerFileSelect}
                className={`absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8 ${
                  isDarkMode 
                    ? 'bg-black border-gray-700 hover:bg-gray-900 text-gray-300' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Upload size={12} />
              </Button>
            </div>
            <div className="flex-1">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Upload a new profile photo. Recommended size: 400x400px
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={triggerFileSelect}
                className={`mt-2 ${
                  isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-900' : ''
                }`}
              >
                Choose File
              </Button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Personal Information */}
        <div className={`rounded-lg border p-6 ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  First Name
                </label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Last Name
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Bio
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
                className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className={`rounded-lg border p-6 ${
          isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Academic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                University
              </label>
              <Input
                value={formData.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Major
                </label>
                <Input
                  value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Graduation Year
                </label>
                <Input
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Location
              </label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={isDarkMode ? 'bg-black border-gray-800 text-white' : ''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoEditor;
