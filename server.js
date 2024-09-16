import { createApp } from 'h3'
import { defineNuxtConfig } from 'nuxt/config'
import { createNuxt, loadNuxt } from 'nuxt'

const app = createApp()

async function start() {
  const nuxtConfig = defineNuxtConfig({
    // Your Nuxt config here
  })

  const nuxt = await loadNuxt(nuxtConfig)

  await nuxt.ready()

  app.use(nuxt.render)
}

start()

export default app