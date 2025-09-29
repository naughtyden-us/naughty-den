'use client';

import { useEffect, useState } from 'react';
import { performanceMonitor, analytics } from '@/lib/analytics';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    // Monitor page load time
    const loadTime = performance.now();
    performanceMonitor.start('page_load');

    // Monitor memory usage
    const getMemoryUsage = () => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
      }
      return 0;
    };

    // Track performance metrics
    const trackMetrics = () => {
      const loadTime = performanceMonitor.end('page_load');
      const memoryUsage = getMemoryUsage();

      const performanceMetrics: PerformanceMetrics = {
        loadTime,
        renderTime: 0, // Will be updated by components
        interactionTime: 0, // Will be updated by user interactions
        memoryUsage,
      };

      setMetrics(performanceMetrics);

      // Send to analytics
      analytics.trackPerformance('page_load_time', loadTime);
      analytics.trackPerformance('memory_usage', memoryUsage, 'MB');
    };

    // Track metrics after page load
    if (document.readyState === 'complete') {
      trackMetrics();
    } else {
      window.addEventListener('load', trackMetrics);
    }

    // Track user interactions
    const trackInteraction = () => {
      performanceMonitor.start('user_interaction');
    };

    const trackInteractionEnd = () => {
      const interactionTime = performanceMonitor.end('user_interaction');
      analytics.trackPerformance('user_interaction_time', interactionTime);
    };

    // Add event listeners for user interactions
    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
    document.addEventListener('scroll', trackInteraction);

    // Track interaction end
    document.addEventListener('click', trackInteractionEnd, { once: true });
    document.addEventListener('keydown', trackInteractionEnd, { once: true });

    return () => {
      window.removeEventListener('load', trackMetrics);
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
      document.removeEventListener('scroll', trackInteraction);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs z-50">
      <h3 className="font-bold mb-2">Performance Metrics</h3>
      <div className="space-y-1">
        <div>Load Time: {metrics.loadTime.toFixed(2)}ms</div>
        <div>Memory: {metrics.memoryUsage.toFixed(2)}MB</div>
        <div>Render Time: {metrics.renderTime.toFixed(2)}ms</div>
        <div>Interaction Time: {metrics.interactionTime.toFixed(2)}ms</div>
      </div>
    </div>
  );
};
