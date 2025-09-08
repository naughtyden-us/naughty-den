'use client';

import React from 'react';
import Image from 'next/image';
import { Creator } from './types';

interface CreatorCardProps {
  creator: Creator;
  onViewProfile: (creator: Creator) => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onViewProfile }) => (
  <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
    <Image src={creator.image} alt={creator.name} width={400} height={400} className="w-full h-auto object-cover" />
    <div className="absolute top-2 right-2 flex space-x-2">
      {creator.isAd && (
        <span className="text-xs font-semibold bg-pink-600 text-white px-2 py-1 rounded-full uppercase">Ad</span>
      )}
    </div>
    <div className="p-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{creator.name}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.936 0-3.694 1.353-4.321 3.235-.916-1.882-2.685-3.235-4.621-3.235C4.599 3.75 2.5 5.765 2.5 8.25c0 3.867 3.93 7.825 8.762 11.233a.5.5 0 00.5.158c.49 0 4.838-3.958 8.762-11.233z" />
        </svg>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
        <span>{creator.type}</span>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.63-0.921 1.932 0l1.258 3.864a1 1 0 00.95.691h4.072c.969 0 1.371 1.243.588 1.81l-3.297 2.388a1 1 0 00-.364 1.118l1.258 3.864c.3.921-.755 1.688-1.54 1.118l-3.297-2.388a1 1 0 00-1.176 0l-3.297 2.388c-.784.57-1.84-.197-1.54-1.118l1.258-3.864a1 1 0 00-.364-1.118L2.091 9.29c-.783-.567-.381-1.81.588-1.81h4.072a1 1 0 00.95-.691l1.258-3.864z" />
          </svg>
          <span>{creator.rating}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm font-bold text-white mb-4">
        <span>${creator.price}</span>
        <span className="text-gray-400">/hour</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onViewProfile(creator)}
          className="flex-1 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors"
        >
          View Profile
        </button>
        <button className="flex-1 py-2 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
          Chat
        </button>
      </div>
    </div>
  </div>
);

export default CreatorCard;