<script setup lang="ts">
import { useDisplay } from 'vuetify';

type TTipoMejorJugador = "Jugador" | "Goleador" | "Arquero";

const props = defineProps<{ tipo: TTipoMejorJugador, isEnabled: boolean }>()
const { mdAndUp } = useDisplay();

onMounted(() => {
  const jugadorId = props.tipo == "Arquero" ? useUserStore().prediccionMejorArquero :
    (props.tipo == "Goleador" ? useUserStore().prediccionMejorGoleador :
      useUserStore().prediccionMejorJugador);

  if (jugadorId == undefined) return;

  const { jugadores, equipos } = useProdeStore();

  const jugador = jugadores.find(j => j._id == jugadorId);

  selectedEquipoName.value = equipos.find(e => e._id == jugador?.equipo)?.nombre;
  selectedJugador = jugadores.find(j => j._id == jugadorId);
  if (selectedJugador != undefined)
    selectedJugadorName.value = `${selectedJugador.numero?.toString().padStart(2, "0")} - ${selectedJugador.posicion} - ${selectedJugador.nombre?.toUpperCase()}`
})

const isDisabled = ref(false);
const isSavingData = ref(false);
const isShowError = ref(false);

const selectedEquipo = computed(() => {
  if (selectedEquipoName.value == undefined) return;

  return useProdeStore().equipos.find(e => e.nombre == selectedEquipoName.value);
})
const selectedEquipoName = ref<string | undefined>(undefined);
const equiposAutocomplete = computed(() => {
  const equipos = useProdeStore().equipos;

  return equipos.map(e => `${e.nombre}`)
})

let selectedJugador: IJugador | undefined;
const selectedJugadorName = ref<string | undefined>(undefined);
const jugadoresAutocomplete = computed(() => {
  const jugadores = useProdeStore().jugadores.filter(j => j.equipo == selectedEquipo.value?._id && (props.tipo != "Arquero" || j.posicion == "Arquero"));

  return jugadores.map(e => `${e.numero?.toString().padStart(2, "0")} - ${e.posicion} - ${e.nombre?.toUpperCase()}`).sort();
});

function onSelectEquipo() {
  isShowError.value = false;
  selectedJugador = undefined;
  selectedJugadorName.value = undefined;
}

function onSelectJugador() {
  isShowError.value = false;
  selectedJugador = undefined;
  if (selectedJugadorName.value != undefined) {
    selectedJugador = useProdeStore().jugadores.find(j =>
      j.equipo == selectedEquipo.value?._id &&
      selectedJugadorName.value != undefined &&
      j.nombre?.toUpperCase().trim() == selectedJugadorName.value.substring(selectedJugadorName.value.lastIndexOf("-") + 1).trim());
  }
}

function guardarCambios() {
  if (selectedJugador == undefined) {
    isShowError.value = true;
    return;
  }

  isSavingData.value = true;
  const body: IUsuario = {
    prediccionMejorArquero: props.tipo == "Arquero" ? selectedJugador._id : undefined,
    prediccionMejorGoleador: props.tipo == "Goleador" ? selectedJugador._id : undefined,
    prediccionMejorJugador: props.tipo == "Jugador" ? selectedJugador._id : undefined,
  };

  useUserStore().updateUsuario(body)
    .finally(() => {
      isSavingData.value = false;
    });
}
</script>

<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          Mejor {{ tipo }}
        </v-col>

        <v-col v-if="mdAndUp" cols="auto">
          <v-btn color="success" variant="elevated" :disabled="isDisabled || isSavingData || !isEnabled"
            @click="guardarCambios">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="10" sm="5">
          <v-autocomplete v-model="selectedEquipoName" label="Equipo" :items="equiposAutocomplete" variant="outlined"
            hide-details="auto" @update:model-value="onSelectEquipo" :disabled="!isEnabled" />
        </v-col>

        <template v-if="selectedEquipo != undefined">
          <v-col cols="auto" align-self="center">
            <BanderaImg :code="selectedEquipo.code" />
          </v-col>

          <v-spacer />

          <v-col cols="12" sm="6">
            <v-autocomplete v-model="selectedJugadorName" label="Jugador" :items="jugadoresAutocomplete"
              variant="outlined" hide-details="auto" @update:model-value="onSelectJugador" :disabled="!isEnabled" />
          </v-col>
        </template>
      </v-row>

      <v-row v-if="isShowError">
        <v-col>
          <v-alert v-model="isShowError" text="Debe Seleccionar un Jugador" type="error"></v-alert>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions v-if="!mdAndUp">
      <v-row>
        <v-spacer />

        <v-col cols="auto">
          <v-btn color="success" variant="elevated" :disabled="isDisabled || isSavingData || !isEnabled"
            @click="guardarCambios">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>