'use client';

import React from 'react';
import { Creator } from './types';

interface CreatorProfileProps {
  creator: Creator;
  onClose: () => void;
}

const CreatorProfile: React.FC<CreatorProfileProps> = ({ creator, onClose }) => {
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
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.385a.75.75 0 0 1 .15-1.048l3.12-2.34a.75.75 0 0 1 1.04-.15l3.12 2.34a.75.75 0 0 1-.15 1.048l-3.12 2.34a.75.75 0 0 1-1.04.15l-3.12-2.34z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 20.25a.75.75 0 0 0 0-1.5.75.75 0 0 0 0 1.5z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.936 0-3.694 1.353-4.321 3.235-.916-1.882-2.685-3.235-4.621-3.235C4.599 3.75 2.5 5.765 2.5 8.25c0 3.867 3.93 7.825 8.762 11.233a.5.5 0 00.5.158c.49 0 4.838-3.958 8.762-11.233z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* About Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg space-y-4">
              <h3 className="font-semibold text-lg">Hola! I&apos;m {creator.name}, 22yo - Currently taking boyfriend applications 😉</h3>
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <p className="text-gray-400">A few details abt myself:</p>
                <p className="text-gray-300">
                  I&apos;m 5&apos;2 ft, 32 D. I&apos;m passionate about scuba diving, snowboarding, and capturing life&apos;s beautiful moments through my lens.
                </p>
                <a href="#" className="text-pink-600 font-bold hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  More info
                </a>
              </div>
            </div>

            {/* Recent Photos Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Recent Photos</h3>
                <span className="text-pink-600 text-sm">4 <span className="text-gray-400">new</span> &middot; 4 total</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Dynamically render recent photos */}
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden cursor-pointer">
                    <img src={creator.image} alt="Recent photo" width={200} height={200} className="w-full h-auto object-cover" />
                    <span className="absolute top-2 left-2 text-xs font-semibold bg-pink-600 text-white px-2 py-1 rounded-full uppercase">New</span>
                    <span className="absolute bottom-2 left-2 text-sm font-bold text-white px-1 py-0.5 rounded-full">#{index + 1}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
                View All Photos (100)
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-8">
            {/* Subscription Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg space-y-4">
              <h3 className="font-semibold text-lg">SUBSCRIPTION</h3>
              <div className="relative p-3 rounded-lg bg-pink-700 text-white font-bold text-center">
                Limited offer -70% off for 31 days!
              </div>
              <div className="flex items-center space-x-3">
                <img src={creator.image} alt={creator.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <p className="text-gray-300 text-sm">Hey, baby! I&apos;m treating you to 70% Off&mdash;don&apos;t miss out! Hit that button to SUB, and let&apos;s turn up the heat to-</p>
              </div>
              <a href="#" className="text-gray-400 hover:underline text-sm">Read more</a>
              <button className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors font-bold text-lg">
                SUBSCRIBE &middot; ${creator.price} for 31 days
              </button>
              <p className="text-center text-gray-500 text-xs">Regular price: $10 /month</p>
              <div className="text-center text-gray-600 text-xs flex justify-around">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Cookie Notice</a>
                <a href="#" className="hover:underline">Terms of Service</a>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg space-y-3">
              <h3 className="font-semibold text-lg">Quick Actions</h3>
              <button className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.636 1.006 3.064 2.378 3.518A3.011 3.011 0 0 0 7.5 17.25H9.75c1.125 0 2.16-.584 2.722-1.518L15 12.75M12 21.75c-2.485 0-4.5-2.015-4.5-4.5H4.5c-2.485 0-4.5-2.015-4.5-4.5S2.015 7.5 4.5 7.5h3C9.75 7.5 11.25 8.75 11.25 10.5V12M18 12.76a4.5 4.5 0 0 1-9 0" />
                </svg>
                <span>Chat Live</span>
              </button>
              <button className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-4.142 0-7.5-3.358-7.5-7.5S7.858 6.75 12 6.75s7.5 3.358 7.5 7.5-3.358 7.5-7.5 7.5zM12 9.75v3l-2.25 2.25" />
                </svg>
                <span>Send Gift</span>
              </button>
              <button className="w-full py-3 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-4.142 0-7.5-3.358-7.5-7.5S7.858 6.75 12 6.75s7.5 3.358 7.5 7.5-3.358 7.5-7.5 7.5zM12 9.75v3l-2.25 2.25" />
                </svg>
                <span>Leave Tip</span>
              </button>
              <button className="w-full py-3 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 0 1 .75.75v3.75h3.75a.75.75 0 0 1 0 1.5h-3.75v3.75a.75.75 0 0 1-1.5 0v-3.75h-3.75a.75.75 0 0 1 0-1.5h3.75V7.5a.75.75 0 0 1 .75-.75z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75a9.75 9.75 0 1 1 0-19.5 9.75 9.75 0 0 1 0 19.5z" />
                </svg>
                <span>Follow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
