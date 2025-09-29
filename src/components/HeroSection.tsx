'use client';

import React from 'react';
import Image from 'next/image';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1648064139778-7ab990300d6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold mb-4">
          Capture the <span className="text-pink-600">Extraordinary</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Create stunning and unique content. Join thousands of photographers worldwide. 
          Find the perfect image for your next project.
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
  );
};
