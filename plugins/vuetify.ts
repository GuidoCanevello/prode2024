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
    'chat-card-user': '#fff59d',

    'chat-card-1': '#90a4ae',
    'chat-card-2': '#f8bbd0',
    'chat-card-3': '#ce93d8',
    'chat-card-4': '#9575cd',
    'chat-card-5': '#42a5f5',
    'chat-card-6': '#80cbc4',
    'chat-card-7': '#66bb6a',
    'chat-card-8': '#c5e1a5',
    'chat-card-9': '#d4e157',
    'chat-card-10': '#f5f5f5',
    'chat-card-11': '#a1887f',
    'chat-card-12': '#ff8a65',
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
    'chat-card-user': '#f57f17',

    'chat-card-1': '#c62828',
    'chat-card-2': '#ad1457',
    'chat-card-3': '#7e57c2',
    'chat-card-4': '#1565c0',
    'chat-card-5': '#00838f',
    'chat-card-6': '#212121',
    'chat-card-7': '#6a1b9a',
    'chat-card-8': '#4e342e',
    'chat-card-9': '#616161',
    'chat-card-10': '#558b2f',
    'chat-card-11': '#9e9d24',
    'chat-card-12': '#00695c',
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
