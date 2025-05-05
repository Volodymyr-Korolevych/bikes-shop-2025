// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import DateFnsAdapter from '@date-io/date-fns'
import { uk }  from 'vuetify/locale'
import ukUA from 'date-fns/locale/uk'
import enUS from 'date-fns/locale/en-US'

import "vuetify/styles"
import '~/assets/styles/settings.scss'
import { createVuetify } from 'vuetify'


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    date: {
      adapter: DateFnsAdapter,
      locale: {
        uk: ukUA,
        en: enUS,
      },
    },
    locale: {
      locale: "uk",
      fallback: "en",
      messages: { uk }
    },
  })
  app.vueApp.use(vuetify)
})
