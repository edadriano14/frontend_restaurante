// =============================================================================
// SERVICE WORKER ULTRA-RÁPIDO - CACHE-FIRST STALE-WHILE-REVALIDATE PARA PWA
// =============================================================================
var CACHE_NAME = 'rede-restaurante-v20261108';

var ASSETS_PRELOAD = [
    '/static/js/app-data.js?v=999',
    '/static/js/modals.js?v=999',
    '/static/manifest.json',
    '/favicon.ico',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', function(e) {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS_PRELOAD).catch(function(err) {
                console.warn('[SW] Pré-carregamento parcial:', err);
            });
        })
    );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) {
                    return caches.delete(k);
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(e) {
    var req = e.request;
    var url = new URL(req.url);

    // Métodos que alteram dados (POST, PUT, DELETE) e rotas de autenticação/API direta nunca devem passar por cache de navegação
    if (req.method !== 'GET' || url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/')) {
        return;
    }

    // 1. Assets Estáticos e CDNs: Cache-First com revalidação em background (Resposta em ~5ms)
    var isStatic = url.pathname.startsWith('/static/') ||
                   url.hostname.includes('cdn.') ||
                   url.hostname.includes('cdnjs.') ||
                   url.pathname.endsWith('.js') ||
                   url.pathname.endsWith('.css') ||
                   url.pathname.endsWith('.woff2') ||
                   url.pathname.endsWith('.png') ||
                   url.pathname.endsWith('.jpg') ||
                   url.pathname.endsWith('.ico');

    if (isStatic) {
        e.respondWith(
            caches.match(req).then(function(cached) {
                var fetchPromise = fetch(req).then(function(networkRes) {
                    if (networkRes && networkRes.status === 200) {
                        var clone = networkRes.clone();
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(req, clone);
                        });
                    }
                    return networkRes;
                }).catch(function() { return cached; });

                return cached || fetchPromise;
            })
        );
        return;
    }

    // 2. Navegação de Páginas HTML: Stale-While-Revalidate ultrarrápido
    if (req.mode === 'navigate' || (req.headers.get('accept') && req.headers.get('accept').includes('text/html'))) {
        e.respondWith(
            caches.match(req).then(function(cached) {
                var networkFetch = fetch(req).then(function(networkRes) {
                    if (networkRes && networkRes.status === 200) {
                        var clone = networkRes.clone();
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(req, clone);
                        });
                    }
                    return networkRes;
                }).catch(function(err) {
                    if (cached) return cached;
                    throw err;
                });

                // Se já temos a página em cache, retorna instantaneamente (0-10ms) e atualiza em background
                return cached || networkFetch;
            })
        );
        return;
    }
});
