<script setup lang="ts">
const { data } = await useAsyncData('reglamento', () => queryContent('/reglamento').findOne())
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Reglamento</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-container class="mx-4">
            <ContentRenderer :value="data" />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
