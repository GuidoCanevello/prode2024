import { createResolver, defineNuxtModule, addServerHandler } from 'nuxt/kit';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  runtimeConfig: {
    mongoURI: process.env.MONGO_URI,
    isPipeline: process.env.IS_PIPELINE,
  },

  // Nitro
  nitro: {
    plugins: ['~/server/index.ts']
  },

  // Vuetify
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    // Pinia
    '@pinia/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
