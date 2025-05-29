
import React, { useState, useRef } from 'react';
import { User, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfilePhotoEditorProps {
  onPhotoChange: (photoUrl: string) => void;
  currentPhoto?: string;
  isDarkMode: boolean;
}

const ProfilePhotoEditor = ({ onPhotoChange, currentPhoto, isDarkMode }: ProfilePhotoEditorProps) => {
  const [previewUrl, setPreviewUrl] = useState(currentPhoto || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreviewUrl(url);
        onPhotoChange(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
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
            ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' 
            : 'bg-white border-gray-300 hover:bg-gray-50'
        }`}
      >
        <Upload size={12} />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoEditor;
