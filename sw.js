// Service Worker Version 0.1
const CACHE_NAME = "10/08 - Added Notification Support 2.0";
const assets = [
    "./",
    "./icons/icon.png",
    "./index.html",
    "./index.js",
    "./style.css",
    "./timetable.json",
    "./ui.js",
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
            try{
                return await fetch(event.request);
            }catch(err){
                try{
                    return await caches.match(event.request);
                }catch{
                    return err;
                }
            }
        })()
    )
})