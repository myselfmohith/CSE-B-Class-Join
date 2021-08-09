// Service Worker Version 0.1
const CACHE_NAME = "cse-b-cache-v0.1";
const assets = ["./offline.html"]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(assets);
            })
    )
})

self.addEventListener('activate', event => {
    console.log('Activating Service Worker');
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => res || fetch(event.request).catch(() => caches.match("./offline.html")))
    )
})