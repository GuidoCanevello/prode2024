<script setup lang="ts">
import { formatoCompleto } from '~/utils/fecha';

const partidosAutocomplete = computed(() => {
  const partidos = useProdeStore().dataListado.filter(p => p.fecha < new Date() && p.grupo == "");
  return partidos.map(p => `${p.equipo1} vs. ${p.equipo2} - ${formatoCompleto(p.fecha)} -pid: ${p.partidoId}`)
})
const selectedPartido = ref("");

const golesEquipo1 = ref(0);
const penalesEquipo1 = ref<number | undefined>(undefined);
const labelEquipo1 = computed(() => {
  const partidos = useProdeStore().dataListado.filter(p => p.fecha < new Date());

  if (selectedPartido.value == "") return "equipo 1";

  return partidos.find(p => p.partidoId == getSelectedPartidoId())?.equipo1;
});

const golesEquipo2 = ref(0);
const penalesEquipo2 = ref<number | undefined>(undefined);
const labelEquipo2 = computed(() => {
  const partidos = useProdeStore().dataListado.filter(p => p.fecha < new Date());

  if (selectedPartido.value == "") return "equipo 2";

  return partidos.find(p => p.partidoId == getSelectedPartidoId())?.equipo2;
});

const isLoadingChanges = ref(false);
function handleGuardar() {
  isLoadingChanges.value = true;
  
  useProdeStore().dispatchUpdateResultadoPartido(getSelectedPartidoId(), golesEquipo1.value, golesEquipo2.value, penalesEquipo1.value, penalesEquipo2.value)
    .finally(() => {
      isLoadingChanges.value = false;
    });
}

function getSelectedPartidoId() {
  return selectedPartido.value.substring(selectedPartido.value.lastIndexOf('-pid:') + 6);
}
</script>

<template>
  <v-card>
    <v-card-title primary-title>
      Agregar Resultado a Partido de Fase Final.
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

        <v-row>
          <v-col>
            <v-text-field v-model="penalesEquipo1" label="penales 1" variant="outlined" hide-details="auto" />
          </v-col>

          <v-col cols="auto" align-self="center">
            vs.
          </v-col>

          <v-col>
            <v-text-field v-model="penalesEquipo2" label="penales 2" variant="outlined" hide-details="auto" />
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