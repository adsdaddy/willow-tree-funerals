// Service Worker — Willow Tree Funerals
// Cache-first strategy for fonts, images, and JS chunks
// Network-first for HTML pages
// Network-first for API calls

// v4: Railway move. Bumping the version purges every cache the Manus-era worker made.
const CACHE_VERSION = 'wtf-v4';

// Critical assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
];

// Install — pre-cache shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate — purge old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n !== CACHE_VERSION)
          .map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin non-CDN requests
  if (request.method !== 'GET') return;

  // Skip API calls — always network-first, no caching
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // Skip analytics / tracking — never cache
  if (
    url.hostname.includes('googletagmanager') ||
    url.hostname.includes('google-analytics') ||
    url.hostname.includes('facebook.net') ||
    url.hostname.includes('connect.facebook')
  ) {
    return;
  }

  // Only same-origin files are cached
  if (url.origin !== self.location.origin) return;

  // Cache-first for self-hosted fonts and images
  if (
    url.pathname.startsWith('/media/') ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request, CACHE_VERSION));
    return;
  }

  // Cache-first for JS/CSS chunks (content-hashed, safe to cache forever)
  if (
    url.pathname.startsWith('/assets/') &&
    (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))
  ) {
    event.respondWith(cacheFirst(request, CACHE_VERSION));
    return;
  }

  // Network-first for HTML pages
  if (request.destination === 'document' || url.pathname === '/') {
    event.respondWith(networkWithCacheFallback(request, CACHE_VERSION));
    return;
  }

  // Default: network with cache fallback
  event.respondWith(networkWithCacheFallback(request, CACHE_VERSION));
});

// ── Strategies ────────────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Asset unavailable offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}

async function networkWithCacheFallback(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
