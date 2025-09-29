import { ApiResponse } from '@/types';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// API client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}/api${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
export const apiClient = new ApiClient();

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  
  // User management
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
    DELETE_ACCOUNT: '/user/delete',
  },
  
  // Content
  CONTENT: {
    POSTS: '/content/posts',
    CREATE_POST: '/content/posts/create',
    LIKE_POST: '/content/posts/like',
    COMMENT_POST: '/content/posts/comment',
  },
  
  // Creators
  CREATORS: {
    LIST: '/creators',
    PROFILE: '/creators/profile',
    VERIFY: '/creators/verify',
  },
  
  // Moderation
  MODERATION: {
    REPORT: '/moderation/report',
    REVIEW: '/moderation/review',
  },
  
  // Analytics
  ANALYTICS: {
    TRACK: '/analytics/track',
    EVENTS: '/analytics/events',
  },
} as const;

// API service functions
export class ApiService {
  // Authentication methods
  static async login(email: string, password: string) {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  }

  static async register(userData: {
    email: string;
    password: string;
    displayName: string;
    isCreator: boolean;
  }) {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  static async logout() {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {});
  }

  // User profile methods
  static async getProfile(userId: string) {
    return apiClient.get(`${API_ENDPOINTS.USER.PROFILE}/${userId}`);
  }

  static async updateProfile(userId: string, profileData: any) {
    return apiClient.put(`${API_ENDPOINTS.USER.UPDATE_PROFILE}/${userId}`, profileData);
  }

  // Content methods
  static async getPosts(page: number = 1, limit: number = 10) {
    return apiClient.get(`${API_ENDPOINTS.CONTENT.POSTS}?page=${page}&limit=${limit}`);
  }

  static async createPost(postData: {
    content: string;
    isPublic: boolean;
  }) {
    return apiClient.post(API_ENDPOINTS.CONTENT.CREATE_POST, postData);
  }

  static async likePost(postId: string) {
    return apiClient.post(`${API_ENDPOINTS.CONTENT.LIKE_POST}/${postId}`, {});
  }

  static async commentPost(postId: string, comment: string) {
    return apiClient.post(`${API_ENDPOINTS.CONTENT.COMMENT_POST}/${postId}`, {
      comment,
    });
  }

  // Creator methods
  static async getCreators(page: number = 1, limit: number = 10) {
    return apiClient.get(`${API_ENDPOINTS.CREATORS.LIST}?page=${page}&limit=${limit}`);
  }

  static async getCreatorProfile(creatorId: string) {
    return apiClient.get(`${API_ENDPOINTS.CREATORS.PROFILE}/${creatorId}`);
  }

  static async verifyCreator(creatorId: string, verificationData: any) {
    return apiClient.post(`${API_ENDPOINTS.CREATORS.VERIFY}/${creatorId}`, verificationData);
  }

  // Moderation methods
  static async reportContent(reportData: {
    contentId: string;
    contentType: string;
    reason: string;
    description: string;
  }) {
    return apiClient.post(API_ENDPOINTS.MODERATION.REPORT, reportData);
  }

  // Analytics methods
  static async trackEvent(event: string, properties?: Record<string, any>) {
    return apiClient.post(API_ENDPOINTS.ANALYTICS.TRACK, {
      event,
      properties,
      timestamp: new Date().toISOString(),
    });
  }
}

// Utility functions for API calls
export const apiUtils = {
  // Handle API responses
  handleResponse: <T>(response: ApiResponse<T>) => {
    if (response.success) {
      return response.data;
    }
    throw new Error(response.error || 'API request failed');
  },

  // Retry failed requests
  retry: async <T>(
    apiCall: () => Promise<ApiResponse<T>>,
    maxRetries: number = 3
  ): Promise<T> => {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await apiCall();
        if (response.success) {
          return response.data as T;
        }
        throw new Error(response.error || 'API request failed');
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
      }
    }
    
    throw lastError!;
  },

  // Batch API calls
  batch: async <T>(apiCalls: (() => Promise<ApiResponse<T>>)[]): Promise<T[]> => {
    const results = await Promise.allSettled(apiCalls.map(call => call()));
    return results.map(result => {
      if (result.status === 'fulfilled' && result.value.success) {
        return result.value.data as T;
      }
      throw new Error('Batch API call failed');
    });
  },
};
