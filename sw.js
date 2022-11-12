importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);
workbox.precaching.precacheAndRoute([
  "index.html",
  "conversion.html",
  "offline.html",
  "icons/offline.png",
]);
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.NetworkOnly()
);
workbox.routing.registerRoute(
  ({ request }) => request.destination === "document",
  new workbox.strategies.NetworkFirst() // Primero la red, luego el cache
);
// Si hay una respuesta que genere error
workbox.routing.setCatchHandler(async (context) => {
  console.log("entro");
  console.log(context);
  console.log(context.request);
  if (context.request.destination === "image") {
    return workbox.precaching.matchPrecache("icons/offline.png");
  } else if (context.request.destination === "document") {
    return workbox.precaching.matchPrecache("offline.html");
  }
  return Response.error();
});
// var cacheName = "monedaV1";
// var contenidoCache = [
//   "index.html",
//   "conversion.html",
//   "sw.js",
//   "app.js",
//   "manifest.webmanifest",
//   "css/bootstrap.css",
//   "css/bootstrap.min.css.map",
//   "css/style.css",
//   "conversion.js",
//   "bd/data.json",
// ];

// self.addEventListener("install", (e) => {
//   console.log("instalado");
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(cacheName);
//       await cache.addAll(contenidoCache);
//     })()
//   );
// });

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     (async () => {
//       const r = await caches.match(e.request);
//       if (r) return r;
//       const response = await fetch(e.request);
//       const cache = await caches.open(cacheName);
//       cache.put(e.request, response.clone());
//       return response;
//     })()
//   );
// });
