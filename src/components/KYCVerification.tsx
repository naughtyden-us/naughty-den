'use client';

import React, { useState, useEffect } from 'react';

interface KYCVerificationProps {
  onClose: () => void;
}

export default function KYCVerification({ onClose }: KYCVerificationProps) {
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <div className="text-center p-8 bg-gray-900 rounded-lg shadow-xl max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4">KYC Verification</h1>
        <div className="mb-6">
          {status === 'pending' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Verification in progress...</p>
            </>
          )}
          {status === 'success' && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-400 font-semibold text-xl">Verification Successful!</p>
              <p className="text-gray-400 text-sm mt-2">You are now a verified creator.</p>
            </>
          )}
          {status === 'failed' && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-400 font-semibold text-xl">Verification Failed</p>
              <p className="text-gray-400 text-sm mt-2">Please try again later.</p>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-8 px-6 py-3 rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}
