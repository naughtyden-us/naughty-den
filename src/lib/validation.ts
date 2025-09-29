import { validateEmail, validatePassword, validateFile } from './error-handler';
import { ErrorCodes } from './error-handler';

// Form validation schemas
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Login form validation
export function validateLoginForm(data: { email: string; password: string }): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.password.trim()) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Signup form validation
export function validateSignupForm(data: {
  email: string;
  password: string;
  displayName: string;
  isCreator: boolean;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.password.trim()) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message || 'Invalid password';
    }
  }
  
  if (!data.displayName.trim()) {
    errors.displayName = 'Display name is required';
  } else if (data.displayName.trim().length < 2) {
    errors.displayName = 'Display name must be at least 2 characters';
  } else if (data.displayName.trim().length > 50) {
    errors.displayName = 'Display name must be less than 50 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Profile form validation
export function validateProfileForm(data: {
  displayName: string;
  bio?: string;
  categories?: string[];
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.displayName.trim()) {
    errors.displayName = 'Display name is required';
  } else if (data.displayName.trim().length < 2) {
    errors.displayName = 'Display name must be at least 2 characters';
  } else if (data.displayName.trim().length > 50) {
    errors.displayName = 'Display name must be less than 50 characters';
  }
  
  if (data.bio && data.bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters';
  }
  
  if (data.categories && data.categories.length > 10) {
    errors.categories = 'You can select up to 10 categories';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Post content validation
export function validatePostContent(content: string): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!content.trim()) {
    errors.content = 'Post content is required';
  } else if (content.trim().length < 10) {
    errors.content = 'Post content must be at least 10 characters';
  } else if (content.trim().length > 1000) {
    errors.content = 'Post content must be less than 1000 characters';
  }
  
  // Check for inappropriate content (basic check)
  const inappropriateWords = ['spam', 'scam', 'fake'];
  const hasInappropriateContent = inappropriateWords.some(word => 
    content.toLowerCase().includes(word)
  );
  
  if (hasInappropriateContent) {
    errors.content = 'Content contains inappropriate language';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Comment validation
export function validateComment(text: string): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!text.trim()) {
    errors.text = 'Comment is required';
  } else if (text.trim().length < 1) {
    errors.text = 'Comment cannot be empty';
  } else if (text.trim().length > 500) {
    errors.text = 'Comment must be less than 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// File upload validation
export function validateFileUpload(file: File): ValidationResult {
  const errors: Record<string, string> = {};
  
  const fileValidation = validateFile(file);
  if (!fileValidation.isValid) {
    errors.file = fileValidation.message || 'Invalid file';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Age verification validation
export function validateAgeVerification(birthDate: Date): ValidationResult {
  const errors: Record<string, string> = {};
  
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
    ? age - 1 
    : age;
  
  if (actualAge < 18) {
    errors.age = 'You must be at least 18 years old to use this service';
  }
  
  if (birthDate > today) {
    errors.birthDate = 'Birth date cannot be in the future';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

// Validate URL
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Validate phone number (basic)
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}
