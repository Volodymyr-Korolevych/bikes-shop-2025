// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
        head: {
          title: 'Магазин велосипедов',
          htmlAttrs: {
            lang: 'en'
          },
          meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ],
      link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=EB Garamond' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" },
      { rel: 'stylesheet', href: "https://db.onlinewebfonts.com/c/79e4dc6a81171b1523795cb6b2bc7b2f?family=Avenir+LT+Pro+85+Heavy" }

      ],
    }
  },
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/styles/main.scss'
   , '~/assets/styles/gothamPro.css'
],
  build: { transpile: ['vuetify'] },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    logLevel: 'verbose',
    debug: true
  },
  compatibilityDate: '2024-11-02'
})
