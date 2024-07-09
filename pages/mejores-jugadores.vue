<script setup lang="ts">
// https://github.com/openfootball/copa-america
const { hasData: hasProdeData } = storeToRefs(useProdeStore());
const { hasData: hasUserData } = storeToRefs(useUserStore());
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
          <mejores-jugadores-card :tipo="'Jugador'" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <mejores-jugadores-card :tipo="'Goleador'" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <mejores-jugadores-card :tipo="'Arquero'" />
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
