<script setup lang="ts">
import { formatoCompleto } from '~/utils/fecha';

const partidosAutocomplete = computed(() => {
  const partidos = useProdeStore().dataListado.filter(p => p.grupo == "");
  return partidos.map(p => `${p.descripcionPartido} - ${formatoCompleto(p.fecha)} -pid: ${p.partidoId}`)
})
const selectedPartido = ref("");

const dia = ref(0);
const hora = ref(0);

const equiposAutocomplete = computed(() => {
  const equipos = useProdeStore().equipos;

  return equipos.map(e => `${e.nombre} -pid: ${e._id}`)
})
const nomEquipo1 = ref("");
const nomEquipo2 = ref("");

const isLoadingChanges = ref(false);
function handleGuardar() {
  isLoadingChanges.value = true;

  useProdeStore().dispatchUpdateFechaEquipoPartido(getSelectedPartidoId(), new Date(2024, 6, dia.value, hora.value), getSelectedEquipo1(), getSelectedEquipo2())
    .finally(() => {
      isLoadingChanges.value = false;
    });
}

function onSelectPartido() {
  const partido = useProdeStore().partidos.find(p => p._id == getSelectedPartidoId())
  const equipos = useProdeStore().equipos;

  const equipo1 = equipos.find(e => e._id == partido?.equipo1);
  const equipo2 = equipos.find(e => e._id == partido?.equipo2);

  dia.value = partido?.fecha != undefined ? new Date(partido?.fecha).getDate() : 0;
  hora.value = partido?.fecha != undefined ? new Date(partido?.fecha).getHours() : 0;
  nomEquipo1.value = equipo1 != undefined ? `${equipo1.nombre} -pid: ${equipo1._id}` : "";
  nomEquipo2.value = equipo2 != undefined ? `${equipo2.nombre} -pid: ${equipo2._id}` : "";
}

function getSelectedPartidoId() {
  return selectedPartido.value.substring(selectedPartido.value.lastIndexOf('-pid:') + 6);
}

function getSelectedEquipo1() {
  return nomEquipo1.value.substring(nomEquipo1.value.lastIndexOf('-pid:') + 6);
}

function getSelectedEquipo2() {
  return nomEquipo2.value.substring(nomEquipo2.value.lastIndexOf('-pid:') + 6);
}
</script>

<template>
  <v-card>
    <v-card-title primary-title>
      Agregar Fecha a Partido de Fase Final.
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          <v-autocomplete v-model="selectedPartido" label="Partido" :items="partidosAutocomplete" variant="outlined"
            hide-details="auto" @update:model-value="onSelectPartido" />
        </v-col>
      </v-row>

      <template v-if="selectedPartido != undefined">
        <v-row>
          <v-col>
            <v-text-field v-model="dia" label="Dia" variant="outlined" hide-details="auto" />
          </v-col>

          <v-col>
            <v-text-field v-model="hora" label="Hora" variant="outlined" hide-details="auto" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete v-model="nomEquipo1" label="Equipo 1" :items="equiposAutocomplete" variant="outlined"
              hide-details="auto" />
          </v-col>

          <v-col>
            <v-autocomplete v-model="nomEquipo2" label="Equipo 2" :items="equiposAutocomplete" variant="outlined"
              hide-details="auto" />
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