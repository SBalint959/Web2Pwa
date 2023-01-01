self.addEventListener('install', event => {
    console.log('Service worker installing…');
    event.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["master.css", "logo1.png"])
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker installing…');
});

self.addEventListener('fetch', event => {
    event.respondWith(

        caches.match(event.request).then(response => {
            return response || fetch(event.request);
    }))
    console.log("fetch");
});