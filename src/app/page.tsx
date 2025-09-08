'use client';

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged, signInAnonymously, signOut, User } from 'firebase/auth';
import Image from 'next/image';

import Preloader from './components/Preloader';
import LoginModal from './components/LoginModal';
import CreatorCard from './components/CreatorCard';
import CreatorProfile from './components/CreatorProfile';
import { Creator } from './components/types';

// Mock data for featured creators
const creators: Creator[] = [
  {
    id: 1,
    name: 'Jon Ly',
    rating: 4.8,
    price: 34.50,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1630280717628-7d0d071cf2e3?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Landscape',
  },
  {
    id: 2,
    name: 'Seth Doyle',
    rating: 4.6,
    price: 32.00,
    isAd: true,
    image: 'https://images.unsplash.com/photo-1630520707335-9e4e79b731c3?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Portrait',
  },
  {
    id: 3,
    name: 'Riyaan Khan',
    rating: 4.9,
    price: 35.50,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1550428083-7019ebe39b45?q=80&w=1102&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Landscape',
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    rating: 4.7,
    price: 32.50,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1728463087178-a8c804a5eec2?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Architecture',
  },
  {
    id: 5,
    name: 'Sofia Mykyte',
    rating: 4.7,
    price: 37.00,
    isAd: true,
    image: 'https://images.unsplash.com/photo-1673379421016-b84b1dc410ca?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Architecture',
  },
  {
    id: 6,
    name: 'Hao Leong',
    rating: 4.8,
    price: 38.00,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1584996433468-6e702c8fc9d9?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Architecture',
  },
  {
    id: 7,
    name: 'Jordan Travers',
    rating: 4.5,
    price: 30.00,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1676328012648-ee16da2e08d8?q=80&w=1233&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Portrait',
  },
  {
    id: 8,
    name: 'Jordan Travers',
    rating: 4.5,
    price: 30.00,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1676328012648-ee16da2e08d8?q=80&w=1233&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Portrait',
  },
  
];

const firebaseConfig = {
  apiKey: "AIzaSyCQtWBB_PL4Gi8P5Td0RCgKc7tUQLzsATg",
  authDomain: "naughtyden-app.firebaseapp.com",
  projectId: "naughtyden-app",
  storageBucket: "naughtyden-app.firebasestorage.app",
  messagingSenderId: "1038096287210",
  appId: "1:1038096287210:web:e2f569629036cd00125e93",
  measurementId: "G-RYREQGMGB1"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

   const checkAuth = async () => {
  try {
    if (typeof (window as any).__initial_auth_token !== 'undefined') {
      await signInWithCustomToken(auth, (window as any).__initial_auth_token);
    }
  } catch (error) {
    console.error("Firebase auth setup failed:", error);
  }
};
    checkAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoginModal(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (selectedCreator) {
    return <CreatorProfile creator={selectedCreator} onClose={() => setSelectedCreator(null)} />;
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/npm/@geist-ui/fonts/geist/geist-bold.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/npm/@geist-ui/fonts/geist/geist-bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
        }
        body {
          font-family: 'Geist', sans-serif;
          font-weight: 700;
        }
        .logo-glow {
          box-shadow: 0 0 5px #ec4899, 0 0 20px #ec4899;
          filter: brightness(1.2);
        }
      ` }} />
      {/* Header */}
      <header className="relative z-50 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="h-10 w-auto">
          <Image src="/logo.png" alt="Naughty Den Logo" width={100} height={40} className="h-10 w-auto" />
        </div>
        <nav className="hidden md:flex space-x-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Creators</a>
          <a href="#" className="hover:text-white transition-colors">Search photos...</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
          <a href="#" className="hidden md:block text-gray-400 hover:text-white transition-colors">Creator dashboard</a>
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                {user.photoURL && (
                  <Image src={user.photoURL} alt="Profile" width={32} height={32} className="w-8 h-8 rounded-full border border-pink-600" />
                )}
                <span className="text-white">Hi, {user.displayName || 'User'}</span>
              </div>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsLoginModal(true)} className="px-4 py-2 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
                Login
              </button>
              <button className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors">
                Get Pro
              </button>
            </>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1648064139778-7ab990300d6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Hero Background" 
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-5xl font-extrabold mb-4">
            Capture the <span className="text-pink-600">Extraordinary</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Create stunning and unique content. Join thousands of photographers worldwide. Find the perfect image for your next project.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors">
              Creator Dashboard &rarr;
            </button>
            <button className="px-6 py-3 rounded-full border border-gray-400 text-gray-300 hover:text-white hover:border-white transition-colors">
              Browse Gallery &rarr;
            </button>
          </div>
        </div>
      </section>
      {/* Featured Creators Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-950">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-200">Featured Creators</h2>
          <div className="flex items-center space-x-2 text-sm text-pink-600">
            <span>All (15,000+)</span>
            <span>|</span>
            <a href="#" className="hover:underline">Browse all creators</a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} onViewProfile={setSelectedCreator} />
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-6 md:px-12 text-gray-400 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-bold text-white mb-2">Naughty Den</h4>
            <p>A global community for creators and photo seekers. Connect, create, and get inspired.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Explore</h4>
            <ul>
              <li className="mb-1"><a href="#" className="hover:underline">Gallery</a></li>
              <li className="mb-1"><a href="#" className="hover:underline">Blog</a></li>
              <li className="mb-1"><a href="#" className="hover:underline">Community</a></li>
              <li className="mb-1"><a href="#" className="hover:underline">Creator Events</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Resources</h4>
            <ul>
              <li className="mb-1"><a href="#" className="hover:underline">Help &amp; FAQs</a></li>
              <li className="mb-1"><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-1"><a href="#" className="hover:underline">Terms of Service</a></li>
              <li className="mb-1"><a href="#" className="hover:underline">Press &amp; Media</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Stay in the loop</h4>
            <p className="mb-2">Subscribe to our newsletter for exclusive content and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="flex-1 p-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none" />
              <button className="px-4 py-2 rounded-r-lg bg-pink-600 hover:bg-pink-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          &copy; 2025 Naughty Den. All rights reserved.
        </div>
      </footer>
      {isLoginModalOpen && <LoginModal auth={auth} onClose={() => setIsLoginModal(false)} />}
    </div>
  );
};

export default Home;