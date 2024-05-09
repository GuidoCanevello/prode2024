import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify';

//* Colors Theme
const myLightTheme: ThemeDefinition = {
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
  }
}

const myDarkTheme: ThemeDefinition = {
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
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'myLightTheme',
      themes: { myLightTheme, myDarkTheme }
    },
  })
  app.vueApp.use(vuetify)
})
