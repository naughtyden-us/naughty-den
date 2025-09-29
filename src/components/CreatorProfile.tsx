'use client';

import React, { useState } from 'react';
import { Creator } from '@/types';

interface CreatorProfileProps {
  creator: Creator;
  onClose: () => void;
}

export default function CreatorProfile({ creator, onClose }: CreatorProfileProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-gray-950 text-white overflow-y-auto z-[100]">
      {/* Background Image and Header */}
      <div className="relative h-64 md:h-96">
        <img
          src={creator.image}
          alt={`${creator.name}'s banner`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="blur-sm brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative -mt-24 md:-mt-32 px-4 md:px-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Profile Header Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-600">
                  <img src={creator.image} alt={creator.name} width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold">{creator.name}</h2>
                    <span className="text-pink-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M8.614 1.24c.23.01.438.163.518.375a4.011 4.011 0 0 1 5.756 0c.08-.212.288-.365.518-.375a4.122 4.122 0 0 1 .472 0c2.812.083 5.093 2.59 5.093 5.483V16.5c0 3.016-2.614 5.5-5.625 5.5s-5.625-2.484-5.625-5.5V6.723A5.44 5.44 0 0 0 8.614 1.24Zm6.561 2.9c-.313-.85-.889-1.547-1.616-2.081a2.622 2.622 0 0 0-3.328 0c-.727.534-1.303 1.23-1.616 2.081A4.011 4.011 0 0 1 12 3.5a4.011 4.011 0 0 1 3.175.64Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">@{creator.name.toLowerCase().replace(' ', '_')}</p>
                  <p className="text-green-400 text-sm mt-1">Available now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
