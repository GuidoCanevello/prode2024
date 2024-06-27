import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://www.the-koi.com/projects/how-to-set-up-a-project-with-nuxt3-and-vuetify3-with-a-quick-overview/
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  runtimeConfig: {
    public: {
      IS_DEVELOPMENT: process.env.IS_DEVELOPMENT,
      USE_TEST_DATA: process.env.USE_TEST_DATA,

      IS_BACKEND_ENABLED: process.env.IS_BACKEND_ENABLED,
      IS_FASE_FINAL_ENABLED: process.env.IS_FASE_FINAL_ENABLED,
      IS_FASE_GRUPOS_ENABLED: process.env.IS_FASE_GRUPOS_ENABLED,
      IS_HOME_ENABLED: process.env.IS_HOME_ENABLED,
      IS_MEJORES_JUGADORES_ENABLED: process.env.IS_MEJORES_JUGADORES_ENABLED,
      IS_REGLAMENTO_ENABLED: process.env.IS_REGLAMENTO_ENABLED,
      IS_CHAT_ENABLED: process.env.IS_CHAT_ENABLED,

      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
      MASTER_TOKEN: process.env.MASTER_TOKEN,
    }
  },

  hooks: {
    // Esencial para Mongoose y build/generate. https://stackoverflow.com/questions/77027136/nuxts-npm-run-build-stuck-because-of-nuxt-mongoose
    close: (nuxt) => {
      if (!nuxt.options._prepare)
        process.exit()
    }
  },

  build: {
    transpile: ['vuetify'], // Vuetify
  },

  css: [
    'vuetify/styles', // vuetify ships precompiled css, no need to import sass  
    '@/assets/css/main.css',
    '@/assets/css/fase-grupos.css',
  ],

  content: {
    markdown: {
      anchorLinks: false,
    }
  },

  modules: [
    // Content (usado para markdown)
    '@nuxt/content',
    // Vuetify
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    // Pinia
    '@pinia/nuxt',
    // Nuxt Server Utils
    "nuxt-server-utils",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
