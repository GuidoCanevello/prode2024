<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay, useTheme } from 'vuetify';

const store = useProdeStore();
const { mdAndUp } = useDisplay();

interface ITabItem {
  title: string,
  value: string,
  icon: string,
  route: string,
  enabled: boolean,
  isAdmin?: boolean,
  isForLogged?: boolean
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
    title: "Chat",
    value: "tab-4",
    icon: "mdi-message-text",
    enabled: useRuntimeConfig().public.IS_CHAT_ENABLED == "true",
    route: "/chat",

  },
  {
    title: "Reglamento",
    value: "tab-5",
    icon: "mdi-book-open-page-variant-outline",
    enabled: useRuntimeConfig().public.IS_REGLAMENTO_ENABLED == "true",
    route: "/reglamento",
  },
  {
    title: "Backend",
    value: "tab-6",
    icon: "mdi-shield-crown-outline",
    enabled: useRuntimeConfig().public.IS_BACKEND_ENABLED == "true",
    route: "/backend",
    isAdmin: true,
  }]

const currentTab = ref();

const theme = useTheme();
const onChangeTheme = () => {
  const newTheme = theme.global.current.value.dark ? "light" : "dark";

  theme.global.name.value = newTheme;
  localStorage.setItem('prodeChosenTheme', newTheme);
}

onNuxtReady(async () => {
  theme.global.name.value = localStorage.getItem('prodeChosenTheme') ?? "light";

  await store.dispatchGetInitialData();

  const authStore = useAuthStore();
  if (authStore.hasSavedLogin)
    await authStore.dispatchLogin(
      localStorage.getItem('prodeLoginDataU') ?? "",
      localStorage.getItem('prodeLoginDataP') ?? ""
    );
})

const checkPermissions = (item: ITabItem) => {
  return (
    !item.isAdmin ||
    (item.isAdmin && useUserStore().isAdmin)
  );
};

</script>

<template>
  <v-app>
    <header>
      <v-card color="primary" rounded="0">
        <v-row>
          <!-- Agrego una columna fija para acomodar el Titulo -->
          <v-col v-if="mdAndUp" cols="auto" style="width: 352px;" />

          <v-col class="titulo-col">
            <h1>Prode 2024</h1>
          </v-col>

          <v-col class="pr-0" cols="auto">
            <v-container class="px-2 py-1">
              <v-card class="change-theme-card" variant="outlined" @click="onChangeTheme">
                <v-avatar color="secondary">
                  <v-icon>mdi-theme-light-dark</v-icon>
                </v-avatar>
              </v-card>
            </v-container>
          </v-col>

          <v-col class="pl-0" cols="auto">
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

      <correct-update-snackbar />
    </v-main>
  </v-app>
</template>

<style scoped>
.change-theme-card {
  height: 66px;
  width: 66px;
  padding: 12px;
  border-color: rgb(var(--v-theme-primary-darken-1));
}

.titulo-col {
  text-align: center;
}

@media (max-width: 960px) {
  .titulo-col {
    text-align: left;
    padding-left: 24px;
  }
}
</style>
