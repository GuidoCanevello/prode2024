import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify';

//* Colors Theme
const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#eeeeee",
    surface: '#e0f7fa',

    primary: '#03a9f4',
    'primary-darken-1': '#01579b',
    secondary: '#ffeb3b',
    'secondary-darken-1': '#fbc02d',

    // error: '#ffffff',
    info: '#1565C0',
    // success: '#ffffff',
    // warning: '#ffffff',

    //* Para Ranking table
    'data-ranking-first': '#fff176',
    'data-ranking-first-hover': '#ffc107',
    'data-ranking-second': '#b0bec5',
    'data-ranking-second-hover': '#78909c',
    'data-ranking-third': '#ffcc80',
    'data-ranking-third-hover': '#ff9800',
    'data-ranking-fourth-hover': '#b2ebf2',

    //* Para Predicciones table
    'data-predict-correct': '#80cbc4',
    'data-predict-correct-hover': '#26a69a',
    'data-predict-wrong': '#ef9a9a',
    'data-predict-wrong-hover': '#ef5350',
    'data-predict-very-correct': '#a5d6a7',
    'data-predict-very-correct-hover': '#66bb6a',
    'data-predict-hover': '#b2ebf2',

    //* Para Chat
    'chat-card-user': '#b2ebf2',

    'chat-card-1': '#b2ebf2',
    'chat-card-2': '#b2ebf2',
    'chat-card-3': '#b2ebf2',
    'chat-card-4': '#b2ebf2',
    'chat-card-5': '#b2ebf2',
    'chat-card-6': '#b2ebf2',
    'chat-card-7': '#b2ebf2',
    'chat-card-8': '#b2ebf2',
    'chat-card-9': '#b2ebf2',
    'chat-card-10': '#b2ebf2',
    'chat-card-11': '#b2ebf2',
    'chat-card-12': '#b2ebf2',
  }
}

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#212121",
    surface: '#37474f',

    primary: '#1565c0',
    'primary-darken-1': '#1a237e',
    secondary: '#fbc02d',
    'secondary-darken-1': '#f57f17',

    // error: '#ffffff',
    // info: '#ffffff',
    // success: '#ffffff',
    // warning: '#ffffff',

    //* Para Ranking table
    'data-ranking-first': '#f57c00',
    'data-ranking-first-hover': '#ffa726',
    'data-ranking-second': '#757575',
    'data-ranking-second-hover': '#9e9e9e',
    'data-ranking-third': '#ff5722',
    'data-ranking-third-hover': '#ff8a65',
    'data-ranking-fourth-hover': '#455a64',

    //* Para Predicciones table
    'data-predict-correct': '#006064',
    'data-predict-correct-hover': '#0097a7',
    'data-predict-wrong': '#c62828',
    'data-predict-wrong-hover': '#f44336',
    'data-predict-very-correct': '#1b5e20',
    'data-predict-very-correct-hover': '#388e3c',
    'data-predict-hover': '#455a64',

    //* Para Chat
    'chat-card-user': '#b2ebf2',

    'chat-card-1': '#b2ebf2',
    'chat-card-2': '#b2ebf2',
    'chat-card-3': '#b2ebf2',
    'chat-card-4': '#b2ebf2',
    'chat-card-5': '#b2ebf2',
    'chat-card-6': '#b2ebf2',
    'chat-card-7': '#b2ebf2',
    'chat-card-8': '#b2ebf2',
    'chat-card-9': '#b2ebf2',
    'chat-card-10': '#b2ebf2',
    'chat-card-11': '#b2ebf2',
    'chat-card-12': '#b2ebf2',
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'light',
      themes: { light, dark }
    },
  })
  app.vueApp.use(vuetify)
})
