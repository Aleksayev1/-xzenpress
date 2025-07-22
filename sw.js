const CACHE_NAME = 'xzenpress-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/privacy-policy.html',
  'https://cdn.tailwindcss.com'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background Sync (for future offline actions)
self.addEventListener('sync', event => {
  if (event.tag === 'xzenpress-sync') {
    event.waitUntil(
      console.log('Background sync triggered')
    );
  }
});
