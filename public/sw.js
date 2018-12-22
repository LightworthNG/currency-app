
/****
 * Offline First SW
 * This SW stores staticResources in cache
 * Listens to fetch events =>
 * First check in cache => if not available => fetch from 
 * network => if network is not available => serve offline.html
 */
const cacheName = "currency-converter-cache-v1";
const staticResources = [
    "/offline.html",
    "/index.html",
    "/css/main.css",
    "/js/main.js",
    "/js/functions.js",
    "/manifest.json",
	"https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css",
    "https://code.jquery.com/jquery-3.3.1.slim.min.js",
    "https://fonts.googleapis.com/css?family=Montserrat:400,700,900",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js",
    "https://free.currencyconverterapi.com/api/v6/currencies"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName)
         .then((cache) => {
             return cache.addAll(staticResources);
              
         })
    );
});

self.addEventListener("fetch", (e) => {
    const options = {
        headers : {"Content-Type" : "text/html"},
        mode: "no-cors"
    };
    e.respondWith(
        caches.match(e.request).then( response => {
            return response || fetch(e.request).then(res =>{
               return caches.open(cacheName).then(cache => {
                    cache.put(e.request, res.clone());
                    return res;
                })
            }).catch(() => {
                // Offline.html fallback
                return caches.match(new Request("/offline.html"));
             })
            }
        )
    );
    
 
});

self.addEventListener("activate", (e) => {
    console.log("[SW] activating...");
    
});
 
