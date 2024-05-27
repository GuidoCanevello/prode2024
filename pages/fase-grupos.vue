<script setup lang="ts">
// TODO ver porque no actualiza cuando termina de traer
const { isGettingInitialData, hasInitialData, dataFaseGrupos } = useProdeStore();

const showLoadingCard = computed(() => {
  return isGettingInitialData && !hasInitialData;
})

const showGrupoCard = computed(() => {
  console.log("show Grupo", isGettingInitialData, hasInitialData)
  return !isGettingInitialData && hasInitialData;
})
</script>

<template>
  <v-container>
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

    {{ hasInitialData }}

    <div v-if="showGrupoCard" v-for="grupo in dataFaseGrupos">
      <v-row>
        <v-col>
          <FaseGruposFilaGrupoCard v-bind:grupo="grupo" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
