const config = {
  gqlEndpoint:
    process.env.NODE_ENV !== 'production'
      ? 'http://mobl-app.test/graphql'
      : 'https://api-eeenan.ch/graphql'
}

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
  plugins: ['~/plugins/globalComponents.js'],
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
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo'
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
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'default',
      theme_color: '#000000'
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
  },
  /*
   ** Give apollo module options
   */
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: config.gqlEndpoint
      }
    }
  }
}
