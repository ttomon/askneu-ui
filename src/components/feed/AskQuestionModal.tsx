
import React, { useState } from 'react';
import { X, Paperclip, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: any) => void;
}

const AskQuestionModal = ({ isOpen, onClose, onSubmit }: AskQuestionModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [tags, setTags] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const groups = ['Research101', 'WebDev101', 'MathHelp', 'StudyGroup', 'Academic Writing'];

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !selectedGroup) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newQuestion = {
      title: title.trim(),
      description: description.trim(),
      group: selectedGroup,
      tags: tags.trim(),
      isAnonymous,
    };

    onSubmit(newQuestion);
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedGroup('');
    setTags('');
    setIsAnonymous(false);
    setShowPreview(false);
    
    toast({
      title: "Question Posted!",
      description: "Your question has been posted successfully.",
    });
    
    onClose();
  };

  if (!isOpen) return null;

  if (showPreview) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Preview Question</h2>
            <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="bg-white border rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="inline-block bg-[#2563EB] text-white text-xs px-2 py-1 rounded-full font-medium">
                  #{selectedGroup}
                </span>
              </div>
              <h3 className="font-bold text-[#333] text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-3">{description}</p>
              {tags && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tags.split(' ').map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500">
                by {isAnonymous ? 'Anonymous' : 'You'} • now
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={() => setShowPreview(false)} variant="outline" className="flex-1">
                Edit
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-[#7B1F27] hover:bg-[#5A1A1F] text-white">
                Submit Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Ask a Question</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., How do I properly cite an online journal in APA 7th edition?"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 150))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{title.length}/150 characters</div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details / Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Explain your question clearly. You may include examples, references, or specific issues you're facing."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px]"
            />
          </div>

          {/* Group Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post to Group <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="">Select a group...</option>
              {groups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Tags (Optional)
            </label>
            <Input
              placeholder="e.g., #APA #Citation #Research101"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full"
            />
          </div>

          {/* File Attachment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attach Files (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Paperclip size={20} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Drag & drop files or click to browse</p>
              <p className="text-xs text-gray-400">PNG, JPG, PDF, DOCX</p>
            </div>
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Post Anonymously
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={() => setShowPreview(true)} 
              variant="outline" 
              className="flex-1"
              disabled={!title.trim() || !description.trim() || !selectedGroup}
            >
              <Eye size={16} className="mr-1" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionModal;
