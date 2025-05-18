const CACHE_NAME = 'house-loft-radio-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  // стили и скрипты, если будут вынесены в отдельные файлы, добавь их сюда
  // можно добавить иконки
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// При установке сервис-воркера кешируем нужные файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// При активации - удаляем старые кеши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Перехватываем запросы, отдаём из кеша или из сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});