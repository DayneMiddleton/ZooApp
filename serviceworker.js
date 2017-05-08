

var BASE_PATH = '/ZooApp/';
var CACHE_NAME = 'gih-cache-v7';
var TEMP_IMAGE_CACHE_NAME = 'temp-cache-v1';
var CACHED_URLS = [
'offline.html'
'styles.css'
'Fox.PNG'
'FoxLogo.png'
'No-wifi.png'
'AfricanLion.PNG'
'BirdOnGlove.jpg'
'HoldSnake.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('offline.html');
        }
      });
    })
  );
});







