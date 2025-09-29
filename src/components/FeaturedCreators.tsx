'use client';

import React, { useState } from 'react';
import { Creator } from '@/types';
import { CreatorCard } from './CreatorCard';
import { LoadingStates } from './LoadingSpinner';

// Initial creators data
const initialCreators: Creator[] = [
  {
    id: 1,
    name: 'Jon Ly',
    rating: 4.8,
    price: 34.50,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1630280717628-7d0d071cf2e3?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 124,
  },
  {
    id: 2,
    name: 'Seth Doyle',
    rating: 4.6,
    price: 32.00,
    isAd: true,
    image: 'https://images.unsplash.com/photo-1630520707335-9d4e79b731c3?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 210,
  },
  {
    id: 3,
    name: 'Riyaan Khan',
    rating: 4.9,
    price: 35.50,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1550428083-7019ebe39b45?q=80&w=1102&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 315,
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    rating: 4.7,
    price: 32.50,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1728463087178-a8c804a5eec2?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 98,
  },
  {
    id: 5,
    name: 'Sofia Mykyte',
    rating: 4.7,
    price: 37.00,
    isAd: true,
    image: 'https://images.unsplash.com/photo-1673379421016-b84b1dc410ca?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 156,
  },
  {
    id: 6,
    name: 'Hao Leong',
    rating: 4.8,
    price: 38.00,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1584996433468-6e702c8fc9d9?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 421,
  },
  {
    id: 7,
    name: 'Jordan Travers',
    rating: 4.5,
    price: 30.00,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1676328012648-ee16da2e08d8?q=80&w=1233&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 85,
  },
  {
    id: 8,
    name: 'Jordan Travers',
    rating: 4.5,
    price: 30.00,
    isAd: false,
    image: 'https://images.unsplash.com/photo-1676328012648-ee16da2e08d8?q=80&w=1233&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Subscription',
    likes: 150,
  },
];

export const FeaturedCreators: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = (id: number) => {
    setCreators(prevCreators =>
      prevCreators.map(creator =>
        creator.id === id ? { ...creator, likes: creator.likes + 1 } : creator
      )
    );
  };

  const handleViewProfile = (creator: Creator) => {
    // Handle view profile logic
    console.log('Viewing profile:', creator.name);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-6 md:px-12 bg-gray-950">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-200">Featured Creators</h2>
        </div>
        <LoadingStates.CreatorGrid count={8} />
      </section>
    );
  }

  return (
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
          <CreatorCard
            key={creator.id}
            creator={creator}
            onViewProfile={handleViewProfile}
            onLike={handleLike}
          />
        ))}
      </div>
    </section>
  );
};
