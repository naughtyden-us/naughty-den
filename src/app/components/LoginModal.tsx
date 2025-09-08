'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, Auth } from 'firebase/auth';

interface LoginModalProps {
  onClose: () => void;
  auth: Auth;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, auth }) => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100]">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md mx-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg transition-colors ${activeTab === 'user' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveTab('user')}
          >
            Login as a User
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg transition-colors ${activeTab === 'creator' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveTab('creator')}
          >
            Login as a Creator
          </button>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl font-bold text-white text-center">Log In</h2>
          <div>
            <label className="sr-only" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-pink-600"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-pink-600"
              />
              <a href="#" className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-gray-500 hover:underline">Forgot</a>
            </div>
          </div>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors font-bold text-lg"
          >
            LOG IN
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-5 h-5 mr-2">
            <path d="M22.675 12.012c0-.503-.043-.997-.123-1.48H12.287v2.8H19.034c-.309 1.583-1.259 2.92-2.585 3.86v2.33h2.99c1.758-1.614 2.772-3.992 2.772-6.61Z" fill="#4285F4" />
            <path d="M12.287 23.996c2.724 0 5.006-.902 6.674-2.433L15.97 19.233c-1.07.72-2.45 1.148-3.683 1.148-2.84 0-5.26-1.92-6.115-4.524H3.01v2.417C4.77 21.365 8.16 23.996 12.287 23.996Z" fill="#34A853" />
            <path d="M6.172 14.542c-.22-.61-.34-1.258-.34-1.927s.12-1.317.34-1.927V8.27h-3.16C2.39 9.53 2.014 10.74 2.014 12.016s.376 2.486 1.002 3.743l3.156-2.217Z" fill="#FBBC04" />
            <path d="M12.287 5.75c1.47 0 2.784.507 3.824 1.492l2.673-2.673C17.3 2.75 15.004 1.996 12.287 1.996c-4.127 0-7.517 2.63-9.28 6.58L6.172 10.8c.854-2.604 3.274-4.523 6.115-4.523Z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>
        <div className="text-center mt-6 text-sm">
          Don&apos;t have an account yet? <a href="#" className="text-pink-600 font-bold hover:underline">CREATE ONE NOW</a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;