'use client';

import React from 'react';
import { Profile, User } from '@/types';

interface ProfilePageProps {
  userProfile: Profile;
  onClose: () => void;
  onVerifyKYC: () => void;
  onToggleCreatorStatus: () => void;
}

export default function ProfilePage({ userProfile, onClose, onVerifyKYC, onToggleCreatorStatus }: ProfilePageProps) {
  return (
    <div className="fixed inset-0 bg-gray-950 text-white overflow-y-auto z-[100] p-6 md:p-12">
      <button onClick={onClose} className="py-2 px-4 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors mb-8">
        Back
      </button>

      <div className={`max-w-3xl mx-auto rounded-xl p-6 shadow-lg space-y-6 ${userProfile.isCreator ? 'bg-gray-900' : 'bg-gray-800'}`}>
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-4">
            <img src={userProfile.photoURL} alt="Profile" className={`w-24 h-24 rounded-full object-cover border-4 ${userProfile.isCreator ? 'border-pink-600' : 'border-purple-600'}`} />
            <div>
              <h2 className={`text-3xl font-bold ${userProfile.isCreator ? 'text-white' : 'text-gray-100'}`}>{userProfile.displayName}</h2>
              <p className="text-gray-400">@{userProfile.displayName.toLowerCase().replace(' ', '_')}</p>
              <p className={`text-sm mt-1 ${userProfile.isCreator ? 'text-green-400' : 'text-blue-400'}`}>{userProfile.isCreator ? 'Creator' : 'User'}</p>
            </div>
          </div>
        </div>
        
        {!userProfile.isCreator && (
          <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
            <div>
              <h3 className="text-lg font-bold">Become a Creator</h3>
              <p className="text-sm text-gray-400">Unlock features like live streaming and exclusive content.</p>
            </div>
            <button
              onClick={onToggleCreatorStatus}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-bold"
            >
              Start Now
            </button>
          </div>
        )}
        
        {userProfile.isCreator && (
          <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg">
            <div>
              <h3 className="text-lg font-bold">KYC Verification</h3>
              <p className="text-sm text-gray-400">Verify your identity to unlock creator features.</p>
            </div>
            <button
              onClick={onVerifyKYC}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
            >
              Verify Yourself
            </button>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-bold mb-2">About Me</h3>
          <p className="text-gray-300">{userProfile.bio || 'No bio set yet.'}</p>
        </div>

        {userProfile.isCreator && (
          <div>
            <h3 className="text-lg font-bold mb-2">My Interests</h3>
            <div className="flex flex-wrap gap-2">
              {(userProfile.categories ?? []).length > 0 ? (
                (userProfile.categories ?? []).map(category => (
                  <span key={category} className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm">
                    {category}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No categories selected yet.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
