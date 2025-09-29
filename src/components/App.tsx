'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FeaturedCreators } from './FeaturedCreators';
import { Footer } from './Footer';
import { LoginModal } from './LoginModal';
import { ProfileModal } from './ProfileModal';
import { DisclaimerModal } from './DisclaimerModal';
import { Profile } from '@/types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

  useEffect(() => {
    // Check age confirmation
    const ageConfirmed = localStorage.getItem('ageConfirmed');
    if (ageConfirmed === 'true') {
      setIsAgeConfirmed(true);
    }

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        setIsLoginModalOpen(false);
        const profileRef = doc(db, "profiles", currentUser.uid);
        const profileDoc = await getDoc(profileRef);
        const profileData = profileDoc.exists() ? profileDoc.data() as Profile : null;

        if (profileData) {
          setUserProfile(profileData);
          if (!profileData.isProfileComplete) {
            setIsProfileModalOpen(true);
          }
        } else {
          // Create a new default profile if one doesn't exist
          const newProfile: Profile = {
            uid: currentUser.uid,
            displayName: currentUser.displayName || 'Anonymous',
            email: currentUser.email || '',
            photoURL: currentUser.photoURL || 'https://placehold.co/100x100',
            isCreator: false,
            bio: '',
            categories: [],
            isProfileComplete: false,
          };
          await setDoc(profileRef, newProfile);
          setUserProfile(newProfile);
          setIsProfileModalOpen(true);
        }
      } else {
        setUserProfile(null);
      }
    });

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => unsubscribe();
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem('ageConfirmed', 'true');
    setIsAgeConfirmed(true);
  };

  const handleAgeExit = () => {
    window.location.href = 'https://www.google.com/';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = (isCreator: boolean) => {
    // Handle login logic
    console.log('User logged in as:', isCreator ? 'Creator' : 'User');
  };

  const handleProfileSave = async (updatedProfile: Partial<Profile>) => {
    if (db && user?.uid) {
      const profileRef = doc(db, "profiles", user.uid);
      try {
        // Update profile logic would go here
        setUserProfile(prevProfile => ({ ...prevProfile!, ...updatedProfile as Profile }));
        setIsProfileModalOpen(false);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading Naughty Den..." fullScreen />;
  }

  if (!isAgeConfirmed) {
    return <DisclaimerModal onConfirm={handleAgeConfirm} onExit={handleAgeExit} />;
  }

  return (
    <ErrorBoundary>
      <div className="bg-gray-950 text-white min-h-screen font-sans">
        <Header
          user={user}
          userProfile={userProfile}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />
        
        <HeroSection />
        
        <FeaturedCreators />
        
        <Footer />
        
        {isLoginModalOpen && (
          <LoginModal
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={handleLogin}
          />
        )}
        
        {isProfileModalOpen && userProfile && (
          <ProfileModal
            profile={userProfile}
            onClose={() => setIsProfileModalOpen(false)}
            onSave={handleProfileSave}
            isCreator={userProfile.isCreator}
            user={user}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
