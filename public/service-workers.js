this.addEventListener('activate', event => {
  let cacheWhitelist = ['assets-v1'];
  event.waitUntill(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }));
    })).then(() => clients.claim())
  );
});

this.addEventListener('install', event => {
  event.waitUntill(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        '/js/scripts.js',
        '/css/styles/styles.css',
        '/images/garbage.png',
        '/images/interface.png',
        '/images/locked.png',
        '/images/unlocked.png',
        '/js/jquery.min.js'
      ])
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
