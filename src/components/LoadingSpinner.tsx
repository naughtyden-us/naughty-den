'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'pink' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'pink',
  text,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    pink: 'text-pink-600',
    white: 'text-white',
    gray: 'text-gray-400',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {text && (
        <p className={`text-sm ${colorClasses[color]}`}>{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Skeleton loading components
export const SkeletonCard: React.FC = () => (
  <div className="bg-gray-900 rounded-xl p-6 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);

export const SkeletonCreatorCard: React.FC = () => (
  <div className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-700"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-10 bg-gray-700 rounded"></div>
    </div>
  </div>
);

// Loading states for different components
export const LoadingStates = {
  // Page loading
  Page: () => <LoadingSpinner size="lg" text="Loading..." fullScreen />,
  
  // Button loading
  Button: ({ text = "Loading..." }: { text?: string }) => (
    <div className="flex items-center justify-center space-x-2">
      <LoadingSpinner size="sm" color="white" />
      <span>{text}</span>
    </div>
  ),
  
  // Form loading
  Form: () => (
    <div className="space-y-4">
      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
    </div>
  ),
  
  // List loading
  List: ({ count = 3 }: { count?: number }) => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  ),
  
  // Creator grid loading
  CreatorGrid: ({ count = 8 }: { count?: number }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCreatorCard key={i} />
      ))}
    </div>
  ),
};