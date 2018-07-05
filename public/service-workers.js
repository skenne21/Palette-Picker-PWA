this.addEventListener('install', event => {
  event.waitUntill(
    caches.open('images-v1').then(cache => {
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

