<script setup lang="ts">
const { data } = await useFetch('/api/equipos')
</script>

<template>
  <v-app>
    <v-card>
      {{ data }}
    </v-card>
  </v-app>
</template>
