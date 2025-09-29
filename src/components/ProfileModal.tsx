'use client';

import React, { useState } from 'react';
import { Profile, User } from '@/types';
import { validateProfileForm } from '@/lib/validation';
import { handleError } from '@/lib/error-handler';
import { LoadingSpinner, LoadingStates } from './LoadingSpinner';

interface ProfileModalProps {
  profile: Profile;
  onClose: () => void;
  onSave: (updatedProfile: Partial<Profile>) => void;
  isCreator: boolean;
  user: User | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onClose,
  onSave,
  isCreator,
  user,
}) => {
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    bio: profile.bio || '',
    categories: profile.categories || [],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const allCategories = [
    'Popular / Trending',
    'New Releases',
    'Amateur',
    'Professional Studio',
    'Solo Performances',
    'Couples',
    'Group',
    'Live Streams',
    'Virtual Reality (VR)',
    'Romantic',
    'Hardcore',
    'Roleplay / Fantasy',
    'Fetish / Kink',
    'Softcore / Artistic',
    'Straight',
    'LGBTQ+',
    'Men-focused',
    'Women-focused',
    'Mixed',
    'Short Clips',
    'Full-Length Videos',
    'Premium Only',
    'Free Content'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const validation = validateProfileForm(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      // Simulate file upload if file is selected
      let photoURL = profile.photoURL;
      if (selectedFile) {
        // In a real app, you would upload the file here
        await new Promise(resolve => setTimeout(resolve, 1000));
        photoURL = URL.createObjectURL(selectedFile);
      }

      await onSave({
        ...formData,
        photoURL,
        isProfileComplete: true,
      });
      
      onClose();
    } catch (error) {
      const appError = handleError(error);
      setErrors({ general: appError.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[101] p-4">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-lg relative text-white max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium mb-1">Display Name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={formData.displayName}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-600"
              disabled={isLoading}
            />
            {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              id="photoURL"
              name="photoURL"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700"
              disabled={isLoading}
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-400">Selected file: {selectedFile.name}</p>
            )}
            <p className="mt-2 text-sm text-gray-400">Current photo: {profile.photoURL}</p>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 resize-none focus:outline-none focus:border-pink-600"
              disabled={isLoading}
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
          </div>

          {isCreator && (
            <div>
              <h3 className="text-lg font-bold mb-2">Interests</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {allCategories.map(category => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="form-checkbox text-pink-600 bg-gray-800 border-gray-600 rounded"
                      disabled={isLoading}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
              {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories}</p>}
            </div>
          )}

          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingStates.Button text="Saving..." />
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
