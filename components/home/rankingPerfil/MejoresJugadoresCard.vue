<script setup lang="ts">
const props = defineProps(["nombreCuenta"]);
const store = useProdeStore();

const mejorArquero = ref<IJugador | undefined>()
const mejorGoleador = ref<IJugador | undefined>()
const mejorJugador = ref<IJugador | undefined>()

onMounted(() => {
  const user = store.usuarios.find(u => u.nombreCuenta == props.nombreCuenta);

  mejorArquero.value = store.jugadores.find(j => j._id == user?.prediccionMejorArquero);
  mejorGoleador.value = store.jugadores.find(j => j._id == user?.prediccionMejorGoleador);
  mejorJugador.value = store.jugadores.find(j => j._id == user?.prediccionMejorJugador);
})

function getEquipo(jugador: IJugador | undefined) {
  if (jugador == undefined) return "";

  return store.equipos.find(e => e._id == jugador.equipo)?.nombre;
}
</script>

<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col v-if="mejorJugador == undefined">
          Mejor Jugador: Sin Predicción
        </v-col>

        <v-col v-else>
          Mejor Jugador: {{ getEquipo(mejorJugador) }}: {{ mejorJugador?.numero }} - {{ mejorJugador?.nombre }}
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="mejorGoleador == undefined">
          Mejor Goleador: Sin Predicción
        </v-col>

        <v-col v-else>
          Mejor Goleador: {{ getEquipo(mejorGoleador) }}: {{ mejorGoleador?.numero }} - {{ mejorGoleador?.nombre }}
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="mejorArquero == undefined">
          Mejor Arquero: Sin Predicción
        </v-col>

        <v-col v-else>
          Mejor Arquero: {{ getEquipo(mejorArquero) }}: {{ mejorArquero?.numero }} - {{ mejorArquero?.nombre }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>