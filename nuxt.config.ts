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
      isDevelopment: process.env.IS_DEVELOPMENT,
      useTestData: process.env.USE_TEST_DATA,
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
    '@/assets/css/main.css'
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
