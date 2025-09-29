'use client';

import React, { useState } from 'react';
import { User, Post } from '@/types';

interface LivePostsProps {
  onClose: () => void;
  user: User | null;
}

export default function LivePosts({ onClose, user }: LivePostsProps) {
  const [posts] = useState<Post[]>([
    {
      id: 1,
      creatorName: 'Jon Ly',
      creatorImage: 'https://images.unsplash.com/photo-1630280717628-7d0d071cf2e3?q=80&w=1160&auto=format&fit=crop',
      content: "Live from the studio! Working on some new looks for my next project. What do you think?",
      likes: 58,
      comments: [
        { id: '1', user: 'User1', text: 'This is amazing! ❤️', createdAt: new Date(), likes: 0 },
        { id: '2', user: 'User2', text: 'Love the creativity!', createdAt: new Date(), likes: 0 },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: true,
    },
  ]);

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">
      <div className="p-6 md:p-12">
        <div className="flex justify-between items-center mb-6 md:mb-12 relative">
          <button onClick={onClose} className="py-2 px-4 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
            Back
          </button>
          <div className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2">
            <img src="/logo.png" alt="Naughty Den Logo" width={80} height={32} className="w-auto h-8 md:h-10" />
            <h1 className="text-3xl font-bold mt-2 text-pink-600">Naughty Talks</h1>
          </div>
        </div>

        {/* Live Posts */}
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={post.creatorImage}
                  alt={post.creatorName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-600"
                />
                <div>
                  <p className="font-semibold">{post.creatorName}</p>
                  <p className="text-sm text-gray-400">posted live</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{post.content}</p>
              <div className="flex items-center space-x-4 text-gray-400">
                <button className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.936 0-3.694 1.353-4.321 3.235-.916-1.882-2.685-3.235-4.621-3.235C4.599 3.75 2.5 5.765 2.5 8.25c0 3.867 3.93 7.825 8.762 11.233a.5.5 0 00.5.158c.49 0 4.838-3.958 8.762-11.233z" />
                  </svg>
                  <span>{post.likes}</span>
                </button>
                <span className="text-sm">{post.comments.length} Comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
