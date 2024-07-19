<script setup lang="ts">
// https://github.com/openfootball/copa-america
const { hasData: hasProdeData } = storeToRefs(useProdeStore());
const { hasData: hasUserData } = storeToRefs(useUserStore());

const mejorJugadorId = computed(() => {
  return useProdeStore().jugadores.find(j => j.esMejorJugador)?._id;
})
const mejorGoleadorId = computed(() => {
  return useProdeStore().jugadores.find(j => j.esMejorGoleador)?._id;
})
const mejorArqueroId = computed(() => {
  return useProdeStore().jugadores.find(j => j.esMejorArquero)?._id;
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Votar Mejores Jugadores</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="hasProdeData && hasUserData">
      <v-row>
        <v-col>
          <mejores-jugadores-card :tipo="'Jugador'" :winningJugadorId="mejorJugadorId" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <mejores-jugadores-card :tipo="'Goleador'" :winningJugadorId="mejorGoleadorId" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <mejores-jugadores-card :tipo="'Arquero'" :winningJugadorId="mejorArqueroId" />
        </v-col>
      </v-row>
    </template>

    <v-row v-else>
      <v-col>
        <loading-card />
      </v-col>
    </v-row>
  </v-container>
</template>
