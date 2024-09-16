// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  nitro: {
    preset: 'netlify', // Ensures proper handling of API routes in Netlify
  },
  runtimeConfig: {
    public: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
  ssr: true,
})