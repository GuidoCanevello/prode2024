<script setup lang="ts">
const partidosAutocomplete = computed(() => {
  const partidos = useProdeStore().dataListado.filter(p => p.fecha < new Date());
  return partidos.map(p => `${p.equipo1} vs. ${p.equipo2} - ${darFormatoFecha(p.fecha)} -pid: ${p.partidoId}`)
})
const selectedPartido = ref("");

const golesEquipo1 = ref(0);
const labelEquipo1 = computed(() => {
  const partidos = useProdeStore().dataListado.filter(p => p.fecha < new Date());

  if (selectedPartido.value == "") return "equipo 1";

  return partidos.find(p => p.partidoId == selectedPartido.value.substring(selectedPartido.value.lastIndexOf('-pid:') + 6))?.equipo1;
});

const golesEquipo2 = ref(0);
const labelEquipo2 = computed(() => {
  const partidos = useProdeStore().dataListado.filter(p => p.fecha < new Date());

  if (selectedPartido.value == "") return "equipo 2";

  return partidos.find(p => p.partidoId == selectedPartido.value.substring(selectedPartido.value.lastIndexOf('-pid:') + 6))?.equipo2;
});

const isLoadingChanges = ref(false);
function handleGuardar() {
  // TODO implement
}
</script>

<template>
  <v-card>
    <v-card-title primary-title>
      Agregar Resultado a Partido de Fase de Grupos.
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          <v-autocomplete v-model="selectedPartido" label="Partido" :items="partidosAutocomplete" variant="outlined"
            hide-details="auto" />
        </v-col>
      </v-row>

      <template v-if="selectedPartido != undefined">
        <v-row>
          <v-col>
            <v-text-field v-model="golesEquipo1" :label="labelEquipo1" variant="outlined" hide-details="auto" />
          </v-col>

          <v-col cols="auto" align-self="center">
            vs.
          </v-col>

          <v-col>
            <v-text-field v-model="golesEquipo2" :label="labelEquipo2" variant="outlined" hide-details="auto" />
          </v-col>
        </v-row>
      </template>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-spacer />

        <v-col class="pa-4" cols="auto">
          <v-btn color="success" variant="outlined" @click="handleGuardar" :loading="isLoadingChanges">
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>