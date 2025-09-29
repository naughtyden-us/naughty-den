'use client';

import React from 'react';
import { User, Profile } from '@/types';

interface HeaderProps {
  user: User | null;
  userProfile: Profile | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  userProfile,
  onLoginClick,
  onLogout,
}) => {
  return (
    <header className="relative z-50 py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="h-10 w-auto">
        <img 
          src="/logo.png" 
          alt="Naughty Den Logo" 
          width={100} 
          height={40} 
          className="h-10 w-auto" 
        />
      </div>
      
      <nav className="hidden md:flex space-x-6 text-gray-400">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="hover:text-white transition-colors">Creators</a>
        <a href="#" className="hover:text-white transition-colors">Search photos...</a>
        <a href="#" className="hover:text-white transition-colors">Get Naughty</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </nav>
      
      <div className="flex items-center space-x-4">
        {user && userProfile?.isCreator && (
          <a 
            href="#" 
            className="hidden md:block text-gray-400 hover:text-white transition-colors"
          >
            Creator dashboard
          </a>
        )}
        
        {user ? (
          <>
            <div className="flex items-center space-x-2 cursor-pointer">
              {userProfile?.photoURL && (
                <img 
                  src={userProfile.photoURL} 
                  alt="Profile" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 rounded-full border border-pink-600" 
                />
              )}
              <span className="text-white">
                Hi, {userProfile?.displayName || user.displayName || 'User'}
              </span>
              {userProfile?.isProfileComplete && (
                <span className="text-green-500 text-lg">✅</span>
              )}
            </div>
            
            <button 
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors hidden md:block"
            >
              View My Profile
            </button>
            
            <button 
              onClick={onLogout}
              className="px-4 py-2 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={onLoginClick}
              className="px-4 py-2 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
            >
              Login
            </button>
            <button className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors">
              Get Pro
            </button>
          </>
        )}
      </div>
    </header>
  );
};


