import { ContentReport } from '@/types';

// Content moderation service
class ModerationService {
  private inappropriateWords: string[] = [
    'spam', 'scam', 'fake', 'bot', 'hack', 'phishing',
    'illegal', 'stolen', 'copyright', 'trademark'
  ];

  private adultContentKeywords: string[] = [
    'explicit', 'nsfw', 'adult', 'mature', 'sexual',
    'porn', 'xxx', 'nude', 'naked'
  ];

  // Check if content is appropriate
  isContentAppropriate(content: string): { isAppropriate: boolean; reasons: string[] } {
    const reasons: string[] = [];
    const lowerContent = content.toLowerCase();

    // Check for inappropriate words
    const foundInappropriateWords = this.inappropriateWords.filter(word => 
      lowerContent.includes(word)
    );

    if (foundInappropriateWords.length > 0) {
      reasons.push(`Contains inappropriate words: ${foundInappropriateWords.join(', ')}`);
    }

    // Check for excessive caps
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (capsRatio > 0.7 && content.length > 10) {
      reasons.push('Contains excessive capitalization');
    }

    // Check for spam patterns
    if (this.isSpam(content)) {
      reasons.push('Content appears to be spam');
    }

    // Check for adult content (if not in adult section)
    const hasAdultKeywords = this.adultContentKeywords.some(keyword => 
      lowerContent.includes(keyword)
    );

    if (hasAdultKeywords) {
      reasons.push('Contains adult content keywords');
    }

    return {
      isAppropriate: reasons.length === 0,
      reasons,
    };
  }

  // Check if content is spam
  private isSpam(content: string): boolean {
    // Check for repeated characters
    const repeatedChars = /(.)\1{4,}/.test(content);
    if (repeatedChars) return true;

    // Check for excessive links
    const linkCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
    if (linkCount > 3) return true;

    // Check for excessive special characters
    const specialCharCount = (content.match(/[!@#$%^&*()_+={}[\]|\\:";'<>?,./]/g) || []).length;
    if (specialCharCount > content.length * 0.3) return true;

    return false;
  }

  // Moderate user profile
  moderateProfile(profile: {
    displayName: string;
    bio?: string;
    categories?: string[];
  }): { isApproved: boolean; reasons: string[] } {
    const reasons: string[] = [];

    // Check display name
    const nameCheck = this.isContentAppropriate(profile.displayName);
    if (!nameCheck.isAppropriate) {
      reasons.push(`Display name: ${nameCheck.reasons.join(', ')}`);
    }

    // Check bio
    if (profile.bio) {
      const bioCheck = this.isContentAppropriate(profile.bio);
      if (!bioCheck.isAppropriate) {
        reasons.push(`Bio: ${bioCheck.reasons.join(', ')}`);
      }
    }

    // Check categories
    if (profile.categories) {
      const inappropriateCategories = profile.categories.filter(category => 
        this.inappropriateWords.some(word => 
          category.toLowerCase().includes(word)
        )
      );

      if (inappropriateCategories.length > 0) {
        reasons.push(`Inappropriate categories: ${inappropriateCategories.join(', ')}`);
      }
    }

    return {
      isApproved: reasons.length === 0,
      reasons,
    };
  }

  // Moderate post content
  moderatePost(content: string): { isApproved: boolean; reasons: string[] } {
    const result = this.isContentAppropriate(content);
    return {
      isApproved: result.isAppropriate,
      reasons: result.reasons,
    };
  }

  // Moderate comment
  moderateComment(content: string): { isApproved: boolean; reasons: string[] } {
    const result = this.isContentAppropriate(content);
    return {
      isApproved: result.isAppropriate,
      reasons: result.reasons,
    };
  }

  // Report content
  async reportContent(report: Omit<ContentReport, 'id' | 'createdAt'>): Promise<ContentReport> {
    const contentReport: ContentReport = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...report,
      createdAt: new Date(),
    };

    // In a real app, you would save this to a database
    console.log('Content reported:', contentReport);

    // Send to moderation queue
    await this.sendToModerationQueue(contentReport);

    return contentReport;
  }

  // Send to moderation queue
  private async sendToModerationQueue(report: ContentReport) {
    try {
      // In a real app, you would send this to a moderation service
      // like AWS Rekognition, Google Cloud Vision, or a custom moderation API
      console.log('Sending to moderation queue:', report);
    } catch (error) {
      console.error('Failed to send to moderation queue:', error);
    }
  }

  // Get moderation statistics
  async getModerationStats(): Promise<{
    totalReports: number;
    pendingReports: number;
    resolvedReports: number;
    averageResolutionTime: number;
  }> {
    // In a real app, you would fetch this from your database
    return {
      totalReports: 0,
      pendingReports: 0,
      resolvedReports: 0,
      averageResolutionTime: 0,
    };
  }

  // Auto-moderate content using AI
  async autoModerate(content: string): Promise<{
    isApproved: boolean;
    confidence: number;
    reasons: string[];
  }> {
    try {
      // In a real app, you would use an AI service like:
      // - OpenAI Moderation API
      // - Google Cloud Natural Language API
      // - AWS Comprehend
      // - Azure Content Moderator

      // For now, we'll use basic rule-based moderation
      const basicCheck = this.isContentAppropriate(content);
      
      return {
        isApproved: basicCheck.isAppropriate,
        confidence: basicCheck.isAppropriate ? 0.8 : 0.9,
        reasons: basicCheck.reasons,
      };
    } catch (error) {
      console.error('Auto-moderation failed:', error);
      return {
        isApproved: false,
        confidence: 0,
        reasons: ['Auto-moderation failed'],
      };
    }
  }
}

// Create singleton instance
export const moderationService = new ModerationService();

// React hook for moderation
export function useModeration() {
  return {
    moderateProfile: moderationService.moderateProfile.bind(moderationService),
    moderatePost: moderationService.moderatePost.bind(moderationService),
    moderateComment: moderationService.moderateComment.bind(moderationService),
    reportContent: moderationService.reportContent.bind(moderationService),
    autoModerate: moderationService.autoModerate.bind(moderationService),
  };
}
