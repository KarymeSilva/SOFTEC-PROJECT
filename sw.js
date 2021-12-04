;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cachess',
  urlsToCache = [
    './',
    './html/',
    './assets/',
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
    'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    './assets/css/bootstrap.css',
    './assets/css/floating-wpp.css',
    './assets/css/maicons.css',
    './assets/css/theme.css',
    './assets/css/theme.css.map',
    './assets/sass/_breadcrumb.scss',
    './assets/sass/_buttons.scss',
    './assets/sass/_color-systems.scss',
    './assets/sass/_functions.scss',
    './assets/sass/_images.scss',
    './assets/sass/_input.scss',
    './assets/sass/_mixins.scss',
    './assets/sass/_navbar.scss',
    './assets/sass/_pagination.scss',
    './assets/sass/_plugins.scss',
    './assets/sass/_variable.scss',
    './assets/sass/_theme.scss',
    './assets/vendor/animate/animate.css',
    './assets/vendor/fancybox/css/jquery.fancybox.css',

    './assets/vendor/fancybox/css/jquery.fancybox.min.css',
    './assets/vendor/owl-carousel/css/owl.carousel.css',
    './assets/vendor/owl-carousel/css/owl.carousel.min.css',
    './assets/vendor/owl-carousel/css/owl.theme.default.css',
    './assets/vendor/owl-carousel/css/owl.theme.default.min.css',


    './script.js',
    './assets/img/1024.png',
    './assets/img/512.png',
    './assets/img/384.png',
    './assets/img/256.png',
    './assets/img/192.png',
    './assets/img/128.png',
    './assets/img/96.png',
    './assets/img/64.png',
    './assets/img/32.png',

    './assets/img/16.png'

  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
