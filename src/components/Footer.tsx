'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
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
            <li className="mb-1"><a href="#" className="hover:underline">Get Naughty</a></li>
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
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 p-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none" 
            />
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
  );
};
