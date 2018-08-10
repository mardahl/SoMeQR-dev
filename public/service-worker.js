var dataCacheName = 'someqr-pwa';
var cacheName = 'someqr-pwa';
var filesToCache = [
  '/',
 "https://fonts.googleapis.com/icon?family=Material+Icons",
 "https://fonts.googleapis.com/css?family=Questrial",
 "./fonts",
 "./fonts/roboto",
 "./fonts/roboto/Roboto-Bold.woff",
 "./fonts/roboto/Roboto-Bold.woff2",
 "./fonts/roboto/Roboto-Light.woff",
 "./fonts/roboto/Roboto-Light.woff2",
 "./fonts/roboto/Roboto-Medium.woff",
 "./fonts/roboto/Roboto-Medium.woff2",
 "./fonts/roboto/Roboto-Regular.woff",
 "./fonts/roboto/Roboto-Regular.woff2",
 "./fonts/roboto/Roboto-Thin.woff",
 "./fonts/roboto/Roboto-Thin.woff2",
 "./images",
 "./images/icons",
 "./images/icons/android-chrome-192x192.png",
 "./images/icons/android-chrome-512x512.png",
 "./images/icons/apple-touch-icon.png",
 "./images/icons/favicon-16x16.png",
 "./images/icons/favicon-32x32.png",
 "./images/icons/mstile-70x70.png",
 "./images/icons/safari-pinned-tab.svg",
 "./images/icons/site.webmanifest",
 "./images/icons/browserconfig.xml",
 "./images/icons/favicon.ico",
 "./index.html",
 "./manifest.json",
 "./scripts",
 "./scripts/app.js",
 "./scripts/jquery-3.3.1.js",
 "./scripts/jquery.qrcode.min.js",
 "./scripts/materialize.js",
 "./service-worker.js",
 "./styles",
 "./styles/materialize.css",
 "./styles/style.css"
];



self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
