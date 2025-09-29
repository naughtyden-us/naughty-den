const CACHE_NAME = 'naughty-den-v1';
const STATIC_CACHE = 'naughty-den-static-v1';
const DYNAMIC_CACHE = 'naughty-den-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/manifest.webmanifest',
  '/favicon.png',
  '/logo.png',
  '/pl.gif',
  '/sw.js'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        console.log('Service Worker: Fetching from network', request.url);
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache dynamic content
            if (shouldCache(request)) {
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseToCache);
                });
            }

            return response;
          })
          .catch(error => {
            console.log('Service Worker: Network request failed', error);
            
            // Return offline fallback for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // Return offline fallback for images
            if (request.destination === 'image') {
              return caches.match('/logo.png');
            }
            
            throw error;
          });
      })
  );
});

// Helper function to determine if request should be cached
function shouldCache(request) {
  const url = new URL(request.url);
  
  // Cache API requests
  if (url.pathname.startsWith('/api/')) {
    return true;
  }
  
  // Cache images
  if (request.destination === 'image') {
    return true;
  }
  
  // Cache static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$/)) {
    return true;
  }
  
  return false;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received', event);
  
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      tag: data.tag,
      data: data.data,
      actions: data.actions || []
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event);
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function for background sync
async function doBackgroundSync() {
  try {
    // Sync offline data when connection is restored
    console.log('Service Worker: Syncing offline data');
    
    // In a real app, you would sync:
    // - Offline posts
    // - User interactions
    // - Analytics data
    // - Cached content updates
    
    return Promise.resolve();
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
    throw error;
  }
}


