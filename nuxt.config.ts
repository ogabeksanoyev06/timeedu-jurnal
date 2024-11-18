export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  css: ['~/assets/tailwind.css'],
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-swiper', 'dayjs-nuxt'],
  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en', 'uz', 'ru'],
    defaultLocale: 'uz',
    vueI18n: './i18n.config.ts',
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://tmiadmin.ndc-agency.uz/api',
    },
  },
  build: {
    transpile: ['vue-toastification'],
  },
})