<script setup lang="ts">
const { isGettingData, hasData, dataFaseFinal } = storeToRefs(useProdeStore());

type TTab = '0' | 'Cuartos' | 'Semifinales' | 'Finales';

const tab = ref("");

const showLoadingCard = computed(() => {
  return isGettingData.value && !hasData.value;
})

const showFaseCard = computed(() => {
  return !isGettingData.value && hasData.value;
})

function getListaPartidos(tab: TTab) {
  switch (tab) {
    case "Cuartos":
      return dataFaseFinal.value.filter(p => p.tipoEliminatoria == "Cuartos");
    case "Semifinales":
      return dataFaseFinal.value.filter(p => p.tipoEliminatoria == "Semis");
    case "Finales":
      return dataFaseFinal.value.filter(p => p.tipoEliminatoria == "Final" || p.tipoEliminatoria == "Tercero");
    default:
      return dataFaseFinal.value
  }
}
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

    <template v-else>
      <v-tabs-window v-if="showFaseCard" v-model="tab">
        <v-tabs-window-item v-for="nombreFase in ['0', 'Cuartos', 'Semifinales', 'Finales']" :value="nombreFase">
          <template v-if="nombreFase != '0'">
            <v-row> <v-col> <v-card>
                  <v-container grid-list-xs>
                    <h1>{{ nombreFase }}</h1>
                  </v-container>
                </v-card> </v-col> </v-row>
          </template>

          <template v-else>
            <v-row> <v-col> <v-card>
                  <v-container grid-list-xs>
                    <h1>Todos los Partidos</h1>
                  </v-container>
                </v-card> </v-col> </v-row>
          </template>

          <v-row v-for="partido in getListaPartidos((nombreFase as TTab))">
            <v-col>
              <fase-final-partido-card :partido="partido" />
            </v-col>
          </v-row>
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </v-container>
</template>
