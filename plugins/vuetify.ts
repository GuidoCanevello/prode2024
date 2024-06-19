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

    //* Para Data table
    'data-table-first': '#fff176',
    'data-table-first-hover': '#ffc107',
    'data-table-second': '#b0bec5',
    'data-table-second-hover': '#78909c',
    'data-table-third': '#ffcc80',
    'data-table-third-hover': '#ff9800',
    'data-table-fourth-hover': '#b2ebf2',
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

    //* Para Data table
    'data-table-first': '#f57c00',
    'data-table-first-hover': '#ffa726',
    'data-table-second': '#757575',
    'data-table-second-hover': '#9e9e9e',
    'data-table-third': '#ff5722',
    'data-table-third-hover': '#ff8a65',
    'data-table-fourth-hover': '#455a64',
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
