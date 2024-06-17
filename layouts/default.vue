<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const store = useProdeStore();

interface ITabItem {
  title: string,
  value: string,
  icon: string,
  route: string,
  enabled: boolean,
  isAdmin?: boolean
}

const tabItems: ITabItem[] = [

  {
    title: "Inicio",
    value: "tab-0",
    icon: "mdi-soccer-field",
    enabled: useRuntimeConfig().public.IS_HOME_ENABLED == "true",
    route: "/",
  },
  {
    title: "Fase de Grupos",
    value: "tab-1",
    icon: "mdi-account-group-outline",
    enabled: useRuntimeConfig().public.IS_FASE_GRUPOS_ENABLED == "true",
    route: "/fase-grupos",
  },
  {
    title: "Fase Final",
    value: "tab-2",
    icon: "mdi-tournament",
    enabled: useRuntimeConfig().public.IS_FASE_FINAL_ENABLED == "true",
    route: "/fase-final",
  },
  {
    title: "Mejores Jugadores",
    value: "tab-3",
    icon: "mdi-soccer",
    enabled: useRuntimeConfig().public.IS_MEJORES_JUGADORES_ENABLED == "true",
    route: "/mejores-jugadores",
  },
  {
    title: "Reglamento",
    value: "tab-4",
    icon: "mdi-book-open-page-variant-outline",
    enabled: useRuntimeConfig().public.IS_REGLAMENTO_ENABLED == "true",
    route: "/reglamento",
  },
  {
    title: "Backend",
    value: "tab-5",
    icon: "mdi-shield-crown-outline",
    enabled: useRuntimeConfig().public.IS_BACKEND_ENABLED == "true",
    route: "/backend",
    isAdmin: true,
  }]

const currentTab = ref();

const theme = useTheme();
const onChangeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

onNuxtReady(() => {
  // REVIEW ver como voy a hacer si quiero que guarde la config de modo oscuro
  if (useRuntimeConfig().public.IS_DEVELOPMENT == "true") {
    theme.global.name.value = "dark";
  }

  store.dispatchGetInitialData();
})

const checkPermissions = (item: ITabItem) => {
  // REVIEW - fix when i have a store with the User Name
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
          <!-- Agrego una columna fija para acomodar el Titulo -->
          <v-col cols="auto" style="width: 230px;" />

          <v-col>
            <h1 style="text-align: center;">Prode 2024</h1>
          </v-col>

          <v-btn color="success" @click="onChangeTheme">Change Theme</v-btn>
          <v-col sm="auto" >
            <v-container class="px-2 py-1">
              <user-box />
            </v-container>
          </v-col>
        </v-row>

        <v-tabs v-model="currentTab" align-tabs="title">
          <template v-for="item in tabItems.filter(i => i.enabled)">
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
