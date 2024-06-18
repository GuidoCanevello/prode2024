<script setup lang="ts">

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