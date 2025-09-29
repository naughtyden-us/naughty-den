import { AppError } from '@/types';

// Custom error class for application-specific errors
export class AppErrorClass extends Error {
  public code: string;
  public details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

// Error codes enum
export enum ErrorCodes {
  // Authentication errors
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  AUTH_EMAIL_ALREADY_EXISTS = 'AUTH_EMAIL_ALREADY_EXISTS',
  AUTH_WEAK_PASSWORD = 'AUTH_WEAK_PASSWORD',
  AUTH_USER_NOT_FOUND = 'AUTH_USER_NOT_FOUND',
  
  // Validation errors
  VALIDATION_REQUIRED_FIELD = 'VALIDATION_REQUIRED_FIELD',
  VALIDATION_INVALID_EMAIL = 'VALIDATION_INVALID_EMAIL',
  VALIDATION_INVALID_PASSWORD = 'VALIDATION_INVALID_PASSWORD',
  VALIDATION_FILE_TOO_LARGE = 'VALIDATION_FILE_TOO_LARGE',
  VALIDATION_INVALID_FILE_TYPE = 'VALIDATION_INVALID_FILE_TYPE',
  
  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  API_ERROR = 'API_ERROR',
  
  // Firebase errors
  FIREBASE_ERROR = 'FIREBASE_ERROR',
  FIREBASE_PERMISSION_DENIED = 'FIREBASE_PERMISSION_DENIED',
  FIREBASE_NOT_FOUND = 'FIREBASE_NOT_FOUND',
  
  // Content errors
  CONTENT_NOT_FOUND = 'CONTENT_NOT_FOUND',
  CONTENT_ACCESS_DENIED = 'CONTENT_ACCESS_DENIED',
  CONTENT_MODERATION_FAILED = 'CONTENT_MODERATION_FAILED',
  
  // System errors
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Error messages mapping
export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.AUTH_REQUIRED]: 'You must be logged in to perform this action',
  [ErrorCodes.AUTH_INVALID_CREDENTIALS]: 'Invalid email or password',
  [ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS]: 'An account with this email already exists',
  [ErrorCodes.AUTH_WEAK_PASSWORD]: 'Password must be at least 6 characters long',
  [ErrorCodes.AUTH_USER_NOT_FOUND]: 'No account found with this email',
  
  [ErrorCodes.VALIDATION_REQUIRED_FIELD]: 'This field is required',
  [ErrorCodes.VALIDATION_INVALID_EMAIL]: 'Please enter a valid email address',
  [ErrorCodes.VALIDATION_INVALID_PASSWORD]: 'Password must be at least 6 characters',
  [ErrorCodes.VALIDATION_FILE_TOO_LARGE]: 'File size must be less than 5MB',
  [ErrorCodes.VALIDATION_INVALID_FILE_TYPE]: 'Invalid file type. Only images are allowed',
  
  [ErrorCodes.NETWORK_ERROR]: 'Network error. Please check your connection',
  [ErrorCodes.NETWORK_TIMEOUT]: 'Request timed out. Please try again',
  [ErrorCodes.API_ERROR]: 'API error occurred. Please try again',
  
  [ErrorCodes.FIREBASE_ERROR]: 'Database error occurred',
  [ErrorCodes.FIREBASE_PERMISSION_DENIED]: 'You do not have permission to perform this action',
  [ErrorCodes.FIREBASE_NOT_FOUND]: 'Requested resource not found',
  
  [ErrorCodes.CONTENT_NOT_FOUND]: 'Content not found',
  [ErrorCodes.CONTENT_ACCESS_DENIED]: 'You do not have access to this content',
  [ErrorCodes.CONTENT_MODERATION_FAILED]: 'Content moderation failed',
  
  [ErrorCodes.SYSTEM_ERROR]: 'System error occurred',
  [ErrorCodes.UNKNOWN_ERROR]: 'An unexpected error occurred',
};

// Error handler function
export function handleError(error: any): AppError {
  console.error('Error occurred:', error);
  
  // Handle Firebase errors
  if (error?.code?.startsWith('auth/')) {
    switch (error.code) {
      case 'auth/user-not-found':
        return {
          code: ErrorCodes.AUTH_USER_NOT_FOUND,
          message: ErrorMessages[ErrorCodes.AUTH_USER_NOT_FOUND],
        };
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return {
          code: ErrorCodes.AUTH_INVALID_CREDENTIALS,
          message: ErrorMessages[ErrorCodes.AUTH_INVALID_CREDENTIALS],
        };
      case 'auth/email-already-in-use':
        return {
          code: ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS,
          message: ErrorMessages[ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS],
        };
      case 'auth/weak-password':
        return {
          code: ErrorCodes.AUTH_WEAK_PASSWORD,
          message: ErrorMessages[ErrorCodes.AUTH_WEAK_PASSWORD],
        };
      default:
        return {
          code: ErrorCodes.AUTH_REQUIRED,
          message: error.message || ErrorMessages[ErrorCodes.AUTH_REQUIRED],
        };
    }
  }
  
  // Handle Firebase Firestore errors
  if (error?.code?.startsWith('firestore/')) {
    switch (error.code) {
      case 'firestore/permission-denied':
        return {
          code: ErrorCodes.FIREBASE_PERMISSION_DENIED,
          message: ErrorMessages[ErrorCodes.FIREBASE_PERMISSION_DENIED],
        };
      case 'firestore/not-found':
        return {
          code: ErrorCodes.FIREBASE_NOT_FOUND,
          message: ErrorMessages[ErrorCodes.FIREBASE_NOT_FOUND],
        };
      default:
        return {
          code: ErrorCodes.FIREBASE_ERROR,
          message: ErrorMessages[ErrorCodes.FIREBASE_ERROR],
        };
    }
  }
  
  // Handle network errors
  if (error?.name === 'NetworkError' || error?.code === 'NETWORK_ERROR') {
    return {
      code: ErrorCodes.NETWORK_ERROR,
      message: ErrorMessages[ErrorCodes.NETWORK_ERROR],
    };
  }
  
  // Handle custom app errors
  if (error instanceof AppErrorClass) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }
  
  // Default error
  return {
    code: ErrorCodes.UNKNOWN_ERROR,
    message: error?.message || ErrorMessages[ErrorCodes.UNKNOWN_ERROR],
    details: error,
  };
}

// Validation functions
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (password.length < 6) {
    return {
      isValid: false,
      message: ErrorMessages[ErrorCodes.VALIDATION_INVALID_PASSWORD],
    };
  }
  return { isValid: true };
}

export function validateFile(file: File): { isValid: boolean; message?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: ErrorMessages[ErrorCodes.VALIDATION_FILE_TOO_LARGE],
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: ErrorMessages[ErrorCodes.VALIDATION_INVALID_FILE_TYPE],
    };
  }
  
  return { isValid: true };
}

// Retry function for failed operations
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}
