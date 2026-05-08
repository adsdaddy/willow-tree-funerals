// Service Worker — Willow Tree Funerals
// Cache-first strategy for fonts, images, and JS chunks
// Stale-while-revalidate for HTML pages
// Network-first for API calls

const CACHE_VERSION = 'wtf-v3';
const CDN_HOST = 'd2xsxph8kpxj0f.cloudfront.net';

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

  // Cache-first for fonts (CDN-hosted woff2 files)
  if (
    url.hostname === CDN_HOST &&
    (url.pathname.endsWith('.woff2') || url.pathname.endsWith('.woff'))
  ) {
    event.respondWith(cacheFirst(request, CACHE_VERSION));
    return;
  }

  // Cache-first for images (CDN + any image destination)
  if (
    url.hostname === CDN_HOST ||
    request.destination === 'image'
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

  // Stale-while-revalidate for HTML pages
  if (request.destination === 'document' || url.pathname === '/') {
    event.respondWith(staleWhileRevalidate(request, CACHE_VERSION));
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
