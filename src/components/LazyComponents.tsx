'use client';

import { lazy, Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

// Lazy load heavy components
export const LazyCreatorProfile = lazy(() => import('./CreatorProfile'));
export const LazyLivePosts = lazy(() => import('./LivePosts'));
export const LazyProfilePage = lazy(() => import('./ProfilePage'));
export const LazyKYCVerification = lazy(() => import('./KYCVerification'));

// Lazy component wrappers with loading states
export const CreatorProfile = (props: any) => (
  <Suspense fallback={<LoadingSpinner size="lg" text="Loading profile..." fullScreen />}>
    <LazyCreatorProfile {...props} />
  </Suspense>
);

export const LivePosts = (props: any) => (
  <Suspense fallback={<LoadingSpinner size="lg" text="Loading posts..." fullScreen />}>
    <LazyLivePosts {...props} />
  </Suspense>
);

export const ProfilePage = (props: any) => (
  <Suspense fallback={<LoadingSpinner size="lg" text="Loading profile..." fullScreen />}>
    <LazyProfilePage {...props} />
  </Suspense>
);

export const KYCVerification = (props: any) => (
  <Suspense fallback={<LoadingSpinner size="lg" text="Loading verification..." fullScreen />}>
    <LazyKYCVerification {...props} />
  </Suspense>
);
