export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2048-2732.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2732-2048.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1668-2388.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2388-1668.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1668-2224.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2224-1668.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1536-2048.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2048-1536.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1242-2688.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2688-1242.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1125-2436.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2436-1125.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-828-1792.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1792-828.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1242-2208.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-2208-1242.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-750-1334.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1334-750.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-640-1136.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        rel: 'apple-touch-startup-image',
        href: '/splash/apple-splash-1136-640.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      }
    ],
    bodyAttrs: {
      class:
        'antialiased text-gray-900 bg-gray-100 max-h-screen h-screen w-screen overflow-hidden select-none'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['typeface-inter'],
  /*
   ** purgeCSS
   */
  purgeCSS: {
    extractors: [
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
          }
        }
      }
    ],
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^nuxt-link(|-exact)-active$/
    ]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/globalComponents.js' },
    { src: '~/plugins/persistedState.js', mode: 'client' },
    { src: '~/plugins/fetchData.js', mode: 'client' },
    { src: '~/plugins/pwaBanner.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios'],
    ['@nuxtjs/pwa'],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCSXFHPsCaf9XAuMVIiQcPkMFkdGop-gsM',
          authDomain: 'eeenan-dcf66.firebaseapp.com',
          databaseURL: 'https://eeenan-dcf66.firebaseio.com',
          projectId: 'eeenan-dcf66',
          storageBucket: 'eeenan-dcf66.appspot.com',
          messagingSenderId: '138888121820',
          appId: '1:138888121820:web:5759a41811d733786cd319'
        },
        services: {
          auth: true,
          firestore: true
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Nuxt PWA module configuration
   ** See https://pwa.nuxtjs.org/
   */
  pwa: {
    manifest: {
      name: 'eeenan',
      short_name: 'eeenan',
      lang: 'de',
      description: 'eeenan App',
      theme_color: '#00C58E',
      background_color: '#ffffff',
      display: 'fullscreen'
      // start_url: 'https://eeenan.ch/'
    },
    meta: {
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
      mobileAppIOS: true,
      appleStatusBarStyle: 'default',
      theme_color: '#ffffff'
    }
  },
  /*
   ** Dev server configuration
   */
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
