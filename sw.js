importScripts('js/third-party/sw-toolbox.js');

/**
 * Images
 */
self.toolbox.router.get('images/(.*)', self.toolbox.networkFirst, {
  cache: {
    name: 'images-cache-v1',
    maxEntries: 10
  }
});

/**
 * CSS
 */
self.toolbox.router.get('css/(.*)', self.toolbox.networkFirst, {
  cache: {
    name: 'css-cache-v1',
    maxEntries: 50
  }
});

/**
 * JS
 */
self.toolbox.router.get('js/(.*)', self.toolbox.networkFirst, {
  cache: {
    name: 'js-cache-v1',
    maxEntries: 100
  }
});

/**
 * Locales
 */
self.toolbox.router.get('locales/(.*)', self.toolbox.networkFirst, {
  cache: {
    name: 'locales-cache-v1',
    maxEntries: 100
  }
});

/**
 * Vendors (cacheFirst)
 */
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /((fonts\.googleapis\.com)|(fonts\.gstatic\.com)|(code\.responsivevoice\.org))/,
  cache: {
    name: 'dynamic-vendor-cache-v1',
    maxEntries: 20
  }
});

/**
 * API (networkFirst)
 */
self.toolbox.router.get('/(.*)', self.toolbox.networkFirst, {
   origin: /((be\.welcome-to\.nrw)|(gsw\.pajowu\.de))/,
    cache: {
      name: 'api-cache-v1',
      maxEntries: 50
    }
  }
);

/**
 * Content
 */
self.toolbox.router.get('/', function(request, values, options) {
    if (request.headers.get('accept').includes('text/html')) {
      return self.toolbox.fastest(request, values, options);
    } else {
      return self.toolbox.networkOnly(request, values, options);
    }
  }, {
    cache: {
      name: 'content-cache-v1',
      maxEntries: 50
    }
  }
);
