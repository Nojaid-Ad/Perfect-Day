'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "2e005fd128cb2e4a733da75c4632bf4e",
"assets/AssetManifest.bin.json": "10ce90e0fd394df8c8f2631f58d254a2",
"assets/AssetManifest.json": "7a22c3bdccc7edb626233fa9d99b6283",
"assets/assets/img/applogo.png": "8d3d07252282811a2d8588c415bb9389",
"assets/assets/img/bg.png": "488dfa459e7dab87dade875022af0303",
"assets/assets/img/github.png": "4eba0506a8abe693d6c9a3a0273e1af9",
"assets/assets/img/gmail.png": "ffdf9f689ad790b60503978680ed0d34",
"assets/assets/img/home_bg.png": "c6de031e3bcba1aa26a628e5e05cb888",
"assets/assets/img/logo.png": "3a6ed4778b137a3673e5bf35cd1daa18",
"assets/assets/img/splashlogo.png": "257f6d10dce0bd5b33ce1e5c1136b0d0",
"assets/assets/img/tele.png": "2db28a8c576f78e62032408b0a29ec9e",
"assets/assets/lottie/1.json": "82f253b8376798baee16d2a2d4b372f8",
"assets/assets/lottie/2.json": "628931f9bbe0eb10c1037f0043fef7b2",
"assets/assets/lottie/t1.json": "e2c8122ce7e2b71c7bf0543325dd623a",
"assets/assets/lottie/t2.json": "ac6e6c08cfb7752af5791f36cd613a81",
"assets/assets/lottie/t3.json": "9630f068f63a953a9f17ce3a13af14d6",
"assets/assets/lottie/t4.json": "b067e4fe61cdf43f5cd7b388e3c568bf",
"assets/assets/lottie/t5.json": "b56d163647fdf32e86f306f022a53969",
"assets/assets/lottie/t6.json": "095a59b3c149c9badc57a8f5190a1c25",
"assets/assets/lottie/t8.json": "a0fb886c08a19874dae7277c33fe6748",
"assets/FontManifest.json": "bb38571869c8ca11a475661a69b8294b",
"assets/fonts/Almarai-Regular.ttf": "4fcf563640cefe40b7474aec4f966c0a",
"assets/fonts/JF-Flat-Regular.ttf": "a742499d94a75f0b9a87b620f5f2acec",
"assets/fonts/MaterialIcons-Regular.otf": "a0ff34578efc6134627c44fe1d6c84d3",
"assets/NOTICES": "1f7c21f1f99011625b48b0fa6091eace",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "3463610f655763fd780086b1906c172f",
"assets/packages/panara_dialogs/assets/confirm.png": "acf806139cb7c12e09fc5ca1185b8a2f",
"assets/packages/panara_dialogs/assets/info.png": "e4bb5858c90ab48c72f11ba44bb26b5b",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "e2eaf29cd3ad711cfaf3bb581bcaed92",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "3a6ed4778b137a3673e5bf35cd1daa18",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "697fa9309de4eed4b671a75f20f0deb7",
"/": "697fa9309de4eed4b671a75f20f0deb7",
"logo.png": "3a6ed4778b137a3673e5bf35cd1daa18",
"main.dart.js": "1c281c876c97a5c06dffcad899269a14",
"manifest.json": "3781dac72550d6763c3b352a6feb741b",
"version.json": "3f7c89d5d4fe876440143af813ccc8f2"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
