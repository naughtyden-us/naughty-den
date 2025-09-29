import { AnalyticsEvent } from '@/types';

// Analytics service class
class AnalyticsService {
  private isEnabled: boolean;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  // Track page views
  trackPageView(page: string, properties?: Record<string, any>) {
    this.track('page_view', {
      page,
      ...properties,
    });
  }

  // Track user actions
  trackUserAction(action: string, properties?: Record<string, any>) {
    this.track('user_action', {
      action,
      ...properties,
    });
  }

  // Track authentication events
  trackAuth(event: 'login' | 'logout' | 'signup', method?: string) {
    this.track('auth', {
      event,
      method,
    });
  }

  // Track content interactions
  trackContent(type: 'creator' | 'post' | 'comment', action: string, id: string | number) {
    this.track('content_interaction', {
      type,
      action,
      content_id: id,
    });
  }

  // Track errors
  trackError(error: Error, context?: string) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  // Track performance
  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    this.track('performance', {
      metric,
      value,
      unit,
    });
  }

  // Generic track method
  track(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log('Analytics (dev):', event, properties);
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date(),
    };

    this.events.push(analyticsEvent);

    // Send to analytics service (Google Analytics, Mixpanel, etc.)
    this.sendToAnalytics(analyticsEvent);
  }

  // Send event to analytics service
  private sendToAnalytics(event: AnalyticsEvent) {
    try {
      // Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.event, event.properties);
      }

      // Mixpanel
      if (typeof window !== 'undefined' && (window as any).mixpanel) {
        (window as any).mixpanel.track(event.event, event.properties);
      }

      // Custom analytics endpoint
      if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }).catch(error => {
          console.error('Failed to send analytics event:', error);
        });
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  // Get analytics events (for debugging)
  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// React hook for analytics
export function useAnalytics() {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserAction: analytics.trackUserAction.bind(analytics),
    trackAuth: analytics.trackAuth.bind(analytics),
    trackContent: analytics.trackContent.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    track: analytics.track.bind(analytics),
  };
}

// Performance monitoring
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  // Start timing
  start(name: string) {
    this.marks.set(name, performance.now());
  }

  // End timing and track
  end(name: string) {
    const startTime = this.marks.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      analytics.trackPerformance(name, duration);
      this.marks.delete(name);
      return duration;
    }
    return 0;
  }

  // Measure function execution
  measure<T>(name: string, fn: () => T): T {
    this.start(name);
    const result = fn();
    this.end(name);
    return result;
  }

  // Measure async function execution
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.start(name);
    const result = await fn();
    this.end(name);
    return result;
  }
}

export const performanceMonitor = new PerformanceMonitor();
