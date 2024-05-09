<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify'

const theme = useTheme();

const tabItems: {
  name: string,
  route: string
}[] = [{
  name: "Inicio",
  route: "Inicio"
}]

const tab = ref(tabItems[0].name);

const onChangeTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "myLightTheme" : "myDarkTheme";
}
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

        <v-tabs v-model="tab" align-tabs="title">
          <v-tab v-for="item in tabItems" :key="item.name" :value="item" :to="item.route">
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </v-card>
    </header>

    <v-main id="main-app">

    <slot />

    </v-main>
  </v-app>
</template>
