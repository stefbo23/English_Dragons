/**
 * service-worker.js
 * Ermöglicht Offline-Nutzung durch Caching aller App-Dateien.
 * Verwendet ausschließlich relative Pfade, damit es auf GitHub Pages
 * (egal unter welchem Unterpfad) funktioniert.
 */
const CACHE_NAME = "pablo-quest-cache-v1";

// Pfade relativ zum Speicherort dieser Datei (Projekt-Root)
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/reset.css",
  "./css/variables.css",
  "./css/components.css",
  "./css/animations.css",
  "./css/style.css",
  "./js/storage.js",
  "./js/state.js",
  "./js/audio.js",
  "./js/speech.js",
  "./js/rewards.js",
  "./js/lessons.js",
  "./js/comics.js",
  "./js/quiz.js",
  "./js/memory.js",
  "./js/sentence-builder.js",
  "./js/dialogue-game.js",
  "./js/listening-game.js",
  "./js/speaking-game.js",
  "./js/parent-dashboard.js",
  "./js/settings.js",
  "./js/router.js",
  "./js/app.js",
  "./data/vocabulary.json",
  "./data/dialogues.json",
  "./data/comics.json",
  "./data/lessons.json",
  "./data/achievements.json",
  "./assets/icons/icon-192.svg",
  "./assets/icons/icon-512.svg",
  "./assets/icons/apple-touch-icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch((err) => console.warn("Pablo Quest SW: Cache-Installation teilweise fehlgeschlagen", err))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          // Erfolgreiche Antworten für spätere Offline-Nutzung im Cache ablegen
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline und nicht im Cache: für Navigationsanfragen die Startseite zurückgeben
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return undefined;
        });
    })
  );
});
