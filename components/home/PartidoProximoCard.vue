<script setup lang="ts">

const fechaFormateada = computed(() => {
  // TODO implement
  // if (this.DATA_PROX_PARTIDO) {
  //     const fecha = this.DATA_PROX_PARTIDO.fecha;
  //     const nombreDia = obtenerNombreDia(fecha.getDay()),
  //         dia = addCero(fecha.getDate()),
  //         mes = addCero(fecha.getMonth() + 1);

  //     return `${nombreDia} ${dia}/${mes}`;
  // } else {
  return "";
  // }
})

const horaFormateada = computed(() => {
  // TODO implement
  //   if (this.DATA_PROX_PARTIDO) {
  //     const fecha = this.DATA_PROX_PARTIDO.fecha;
  //     const hora = addCero(fecha.getHours()),
  //       minutos = addCero(fecha.getMinutes());

  //     return `${hora}:${minutos}`;
  //   } else {
  return "";
  //   }
})
</script>

<template>
  <v-card>
    <v-card-title primary-title style="word-break: break-word;"> Proximo Partido </v-card-title>

    <v-card-subtitle>
      Fecha: {{ fechaFormateada }} - Hora: {{ horaFormateada }}
    </v-card-subtitle>

    <v-card-text>
      <!-- TODO traer de viejo cuando tenga datos de los partidos -->
      <under-construction-card />
    </v-card-text>
  </v-card>
</template>
