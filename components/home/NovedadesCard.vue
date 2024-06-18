<script setup lang="ts">
const { data } = await useAsyncData('novedades', () => queryContent('/novedades').findOne())
</script>

<template>
  <v-card>
    <v-card-title primary-title style="word-break: break-word;"> Novedades </v-card-title>

    <v-card-text>
      <v-card class="content-card" variant="outlined">
        <ContentRenderer :value="data" />
      </v-card>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.content-card {
  padding: 16px;
  padding-left: 32px;
  overflow-y: auto;
  max-height: 250px;
}
</style>