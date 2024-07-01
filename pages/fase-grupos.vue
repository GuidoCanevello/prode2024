<script setup lang="ts">
const { isGettingData, hasData, dataFaseGrupos } = storeToRefs(useProdeStore());

const tab = ref("");

const showLoadingCard = computed(() => {
  return isGettingData.value && !hasData.value;
})

const showGrupoCard = computed(() => {
  return !isGettingData.value && hasData.value;
})
</script>

<template>
  <v-card color="primary" rounded="0">
    <v-tabs v-model="tab" align-tabs="title">
      <v-tab v-for="nombreGrupo in ['0', 'A', 'B', 'C', 'D']">
        <template v-if="nombreGrupo == '0'">
          Todos
        </template>

        <template v-else>
          Grupo {{ nombreGrupo }}
        </template>
      </v-tab>
    </v-tabs>
  </v-card>

  <v-container id="page-container">
    <v-row v-if="showLoadingCard">
      <v-col>
        <LoadingCard />
      </v-col>
    </v-row>

    <v-tabs-window v-if="showGrupoCard" v-model="tab">
      <v-tabs-window-item v-for="nombreGrupo in ['0', 'A', 'B', 'C', 'D']" :value="nombreGrupo">
        <template v-if="nombreGrupo != '0'">
          <v-row>
            <v-col>
              <v-card>
                <v-container grid-list-xs>
                  <h1>Grupo {{ nombreGrupo }}</h1>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <FaseGruposFilaGrupoCard v-bind:grupo="dataFaseGrupos.find(g => g.nombre == nombreGrupo)" />
        </template>

        <template v-else v-for="grupo in dataFaseGrupos">
          <FaseGruposFilaGrupoCard v-bind:grupo="grupo" />
        </template>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<style scoped>
:deep(.v-card) {
  height: 100%;
  display: flex !important;
  flex-direction: column !important;
}
</style>
