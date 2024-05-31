<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const store = useProdeStore();

interface ITabItem {
  title: string,
  value: string,
  icon: string,
  route: string,
  isAdmin?: boolean
}

const tabItems: ITabItem[] = [

  {
    title: "Inicio",
    value: "tab-0",
    icon: "mdi-soccer-field",
    route: "/",
  },
  {
    title: "Fase de Grupos",
    value: "tab-1",
    icon: "mdi-account-group-outline",
    route: "/fase-grupos",
  },
  {
    title: "Fase Final",
    value: "tab-2",
    icon: "mdi-tournament",
    route: "/fase-final",
  },
  {
    title: "Mejores Jugadores",
    value: "tab-3",
    icon: "mdi-soccer",
    route: "/mejores-jugadores",
  },
  {
    title: "Reglamento",
    value: "tab-4",
    icon: "mdi-book-open-page-variant-outline",
    route: "/reglamento",
  },
  {
    title: "Backend",
    value: "tab-5",
    icon: "mdi-shield-crown-outline",
    route: "/backend",
    isAdmin: true,
  }]

const currentTab = ref();

const theme = useTheme();
const onChangeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "myLightTheme" : "myDarkTheme";
}

onNuxtReady(() => {
  // REVIEW ver como voy a hacer si quiero que guarde la config de modo oscuro
  if (useRuntimeConfig().public.isDevelopment == "true") {
    theme.global.name.value = "myDarkTheme";
  }

  store.dispatchGetInitialData();
})

const checkPermissions = (item: ITabItem) => {
  // TODO - fix when i have a store with the User Name
  return true;
  // return (
  //   !item.isAdmin ||
  //   (item.isAdmin && this.USUARIO_NOMBRE_CUENTA === "ADMIN")
  // );
};

</script>

<template>
  <v-app>
    <header>
      <v-card color="primary">
        <v-row>
          <v-col>
            <h1 style="text-align: center;">Prode 2024</h1>
          </v-col>

          <v-col sm="auto">
            <v-btn color="success" @click="onChangeTheme">Change Theme</v-btn>
          </v-col>
        </v-row>

        <v-tabs v-model="currentTab" align-tabs="title">
          <template v-for="item in tabItems">
            <v-tab :key="item.title" v-if="checkPermissions(item)" :value="item.value" :text="item.title"
              :prepend-icon="item.icon" :to="item.route" router>
              {{ item.title }}
            </v-tab>
          </template>
        </v-tabs>
      </v-card>
    </header>

    <v-main id="main-app">
      <slot />
    </v-main>
  </v-app>
</template>
