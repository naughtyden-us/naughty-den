'use client';

import React, { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface MonitoringData {
  pageViews: number;
  userActions: number;
  errors: number;
  performance: {
    averageLoadTime: number;
    averageRenderTime: number;
    memoryUsage: number;
  };
}

export const MonitoringDashboard: React.FC = () => {
  const [data, setData] = useState<MonitoringData>({
    pageViews: 0,
    userActions: 0,
    errors: 0,
    performance: {
      averageLoadTime: 0,
      averageRenderTime: 0,
      memoryUsage: 0,
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or for admin users
    const shouldShow = process.env.NODE_ENV === 'development' || 
                      localStorage.getItem('admin_mode') === 'true';
    setIsVisible(shouldShow);

    if (!shouldShow) return;

    // Simulate monitoring data
    const interval = setInterval(() => {
      setData(prev => ({
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
        userActions: prev.userActions + Math.floor(Math.random() * 5),
        errors: prev.errors + (Math.random() > 0.9 ? 1 : 0),
        performance: {
          averageLoadTime: Math.random() * 1000 + 500,
          averageRenderTime: Math.random() * 100 + 50,
          memoryUsage: Math.random() * 50 + 10,
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs z-50 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Monitoring Dashboard</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Page Views:</span>
          <span className="text-green-400">{data.pageViews}</span>
        </div>
        
        <div className="flex justify-between">
          <span>User Actions:</span>
          <span className="text-blue-400">{data.userActions}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Errors:</span>
          <span className={data.errors > 0 ? 'text-red-400' : 'text-green-400'}>
            {data.errors}
          </span>
        </div>
        
        <div className="border-t border-gray-700 pt-2">
          <div className="text-gray-400 mb-1">Performance</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Load Time:</span>
              <span>{data.performance.averageLoadTime.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Render Time:</span>
              <span>{data.performance.averageRenderTime.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span>{data.performance.memoryUsage.toFixed(1)}MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
