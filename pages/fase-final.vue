<script setup lang="ts">
const { isGettingData, hasData, dataFaseGrupos } = storeToRefs(useProdeStore());

const tab = ref("");

const showLoadingCard = computed(() => {
  return isGettingData.value && !hasData.value;
})

const showFaseCard = computed(() => {
  return !isGettingData.value && hasData.value;
})
</script>

<template>
  <v-card color="primary" rounded="0">
    <v-tabs v-model="tab" align-tabs="title">
      <v-tab v-for="nombreFase in ['0', 'Cuartos', 'Semifinales', 'Finales']">
        <template v-if="nombreFase == '0'">
          Todos
        </template>

        <template v-else>
          {{ nombreFase }}
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

    <v-tabs-window v-if="showFaseCard" v-model="tab">
      <v-tabs-window-item v-for="nombreFase in ['0', 'Cuartos', 'Semifinales', 'Finales']" :value="nombreFase">
        <template v-if="nombreFase != '0'">
          <v-row>
            <v-col>
              <v-card>
                <v-container grid-list-xs>
                  <h1>{{ nombreFase }}</h1>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <!-- TODO agregar Fase seleccionada -->
          <!-- <FaseGruposFilaGrupoCard v-bind:grupo="dataFaseGrupos.find(g => g.nombre == nombreGrupo)" /> -->
        </template>

        <!-- TODO Add Todas las Fases -->
        <!-- <template v-else v-for="grupo in dataFaseGrupos">

        </template> -->
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
