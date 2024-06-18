<script setup lang="ts">
// TODO permitir que vea datos de Equipos, Partidos y Jugadores pero no de Predicciones (asi permito que entren incluso sin estar logueado)
</script>

<template>
  <v-container id="page-container">
    <v-row>
      <v-col>
        <v-container>
          <HomeDondeEmpezarCard />
        </v-container>

        <v-container>
          <HomePartidoProximoCard />
        </v-container>

        <v-container>
          <HomeListadoPartidosCard />
        </v-container>
      </v-col>

      <v-col>
        <v-container>
          <HomeRankingCard />
        </v-container>

        <!-- <v-container>
          <HomeNovedadesCard />
        </v-container> -->
      </v-col>
    </v-row>
  </v-container>
</template>