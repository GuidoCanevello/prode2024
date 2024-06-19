<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(["grupo"])

// REVIEW change when i add responsive
const IS_SCREEN_BEYOND_MEDIUM = ref(true)

</script>

<template>
  <!-- Screen size >= Medium -->
  <v-row v-if="IS_SCREEN_BEYOND_MEDIUM">
    <v-col cols="12" md="4">
      <FaseGruposGrupoCard :nombre="grupo.nombre" :equipos="grupo.equipos" v-bind:partidos="grupo.partidos" />
    </v-col>

    <v-col cols="12" md="8">
      <FaseGruposPartidosCard :nombre="grupo.nombre" v-bind:partidos="grupo.partidos"
        @prediccion-actualizada="$emit('prediccion-actualizada')" />
    </v-col>
  </v-row>

  <!-- Screen size < Medium -->
  <v-row v-else>
    <v-col>
      <!-- <carta-partidos-small :nombre="grupo.nombre" :equipos="grupo.equipos" v-bind:partidos="grupo.partidos"
        @prediccion-actualizada="$emit('prediccion-actualizada')" /> -->
    </v-col>
  </v-row>
</template>