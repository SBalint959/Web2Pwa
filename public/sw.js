self.addEventListener('install', event => {
    console.log('Service worker installing…');
    event.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["index.ejs", "logo1.png"])
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker installing…');
});
const staticCacheName = "static-cache-v1";

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            console.log("fetch");
            if(response) {
                return response;
            }
            return fetch(event.request).then((response) => {
                if (response.status === 404) {
                    return caches.match("404.ejs")
                }
                return caches.open(staticCacheName).then((cache) => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            });
        })
        .catch((error) => {
            console.log("Error", event.request.url, error);
            return caches.match("offline.ejs");
        })
    );
});