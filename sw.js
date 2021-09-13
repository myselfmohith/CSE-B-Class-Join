// Service Worker Version 0.1
const CACHE_NAME = "CACHE CHNAGES(User Name Field Edit)";

const assets = [
    "./",
    "./icons/icon.png",
    "./Scripts/cseB.js",
    "./Scripts/edit.js",
    "./Scripts/index.js",
    "./Scripts/ui.js",
    "./edit.html",
    "./index.html",
    "./style.css",
    "https://kit.fontawesome.com/f93025829a.js",
    "https://fonts.googleapis.com/css2?family=Poppins&display=swap"
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(assets);
            })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        // caches.match(event.request).then(res => res || fetch(event.request))
        (async () => {
            try {
                return await fetch(event.request);
            } catch (err) {
                try {
                    return await caches.match(event.request);
                } catch {
                    return err;
                }
            }
        })()
    )
})


self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ includeUncontrolled: true, type: 'window' })
            .then(clients => {
                clients.forEach(client => client.focus());
            })
    )
})
