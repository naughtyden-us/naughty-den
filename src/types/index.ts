// User and Profile Types
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Profile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  isCreator: boolean;
  bio?: string;
  categories?: string[];
  isProfileComplete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isVerified?: boolean;
  isActive?: boolean;
}

// Creator Types
export interface Creator {
  id: number;
  name: string;
  rating: number;
  price: number;
  isAd: boolean;
  image: string;
  type: string;
  likes: number;
  isVerified?: boolean;
  isOnline?: boolean;
  lastActive?: Date;
}

// Post Types
export interface Post {
  id: number;
  creatorName: string;
  creatorImage: string;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  createdAt: Date;
  likes: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  displayName: string;
  isCreator: boolean;
}

export interface ProfileForm {
  displayName: string;
  bio: string;
  categories: string[];
  photoURL?: string;
}

// Component Props Types
export interface CreatorCardProps {
  creator: Creator;
  onViewProfile: (creator: Creator) => void;
  onLike: (creatorId: number) => void;
}

export interface LoginModalProps {
  onClose: () => void;
  onLogin: (isCreator: boolean) => void;
}

export interface ProfilePageProps {
  userProfile: Profile;
  onClose: () => void;
  onVerifyKYC: () => void;
  onToggleCreatorStatus: () => void;
}

// State Types
export interface AppState {
  user: User | null;
  userProfile: Profile | null;
  isLoading: boolean;
  error: AppError | null;
}

// Navigation Types
export type PageType = 'home' | 'live-posts' | 'my-profile' | 'creator-profile';

// KYC Types
export interface KYCStatus {
  status: 'pending' | 'approved' | 'rejected' | 'not_started';
  submittedAt?: Date;
  approvedAt?: Date;
  rejectionReason?: string;
}

// Content Moderation Types
export interface ContentReport {
  id: string;
  reporterId: string;
  contentId: string;
  contentType: 'post' | 'comment' | 'profile';
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp: Date;
}
