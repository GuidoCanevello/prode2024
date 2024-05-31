<script setup lang="ts">
import { storeToRefs } from "pinia";

const { isGettingInitialData, hasInitialData, dataFaseGrupos } = storeToRefs(useProdeStore());

const showLoadingCard = computed(() => {
  return isGettingInitialData.value && !hasInitialData.value;
})

const showGrupoCard = computed(() => {
  return !isGettingInitialData.value && hasInitialData.value;
})

// TODO add Usuarios de Prueba
// TODO add Horarios de Partidos
// TODO add desplegable a Partidos con la fecha y hora
</script>

<template>
  <v-container id="page-container">
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Fase de Grupos</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showLoadingCard">
      <v-col>
        <LoadingCard />
      </v-col>
    </v-row>

    <template v-if="showGrupoCard" v-for="grupo in dataFaseGrupos">
      <FaseGruposFilaGrupoCard v-bind:grupo="grupo" />
    </template>
  </v-container>
</template>

<style scoped>
:deep(.v-card) {
  height: 100%;
  display: flex !important;
  flex-direction: column !important;
}
</style>
