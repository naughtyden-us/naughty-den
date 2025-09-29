'use client';

import React from 'react';

interface DisclaimerModalProps {
  onConfirm: () => void;
  onExit: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onConfirm, onExit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100]">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md mx-4 text-white text-center shadow-lg border border-pink-600">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Naughty Den Logo" className="w-24 h-auto" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Adult Content Warning</h2>
        
        <p className="mb-4">
          This app contains adult content. You must be 18+ (or legal age in your region) to enter.
        </p>
        
        <p className="mb-6">
          By continuing, you confirm that you meet the age requirement and consent to view explicit material.
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors font-bold"
          >
            I Am 18+
          </button>
          <button
            onClick={onExit}
            className="px-6 py-3 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors font-bold"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};
