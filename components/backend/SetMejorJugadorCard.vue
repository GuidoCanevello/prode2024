<script setup lang="ts">

const isSavingData = ref(false);

const equiposAutocomplete = computed(() =>
  useProdeStore().equipos.map(e => `${e.nombre} - ${e._id}`)
)

const selectedEquipoMJ = ref<string>("");
const jugadoresAutocompleteMJ = computed(() => {
  const jugadores = useProdeStore().jugadores.filter(j =>
    j.equipo == selectedEquipoMJ.value.substring(selectedEquipoMJ.value.lastIndexOf("-") + 2));

  return jugadores.map(e => `${e.numero?.toString().padStart(2, "0")} - ${e.posicion} - ${e.nombre?.toUpperCase()} - ${e._id}`).sort();
})
const selectedMJ = ref("");

const selectedEquipoMA = ref<string>("");
const jugadoresAutocompleteMA = computed(() => {
  const jugadores = useProdeStore().jugadores.filter(j =>
    j.equipo == selectedEquipoMA.value.substring(selectedEquipoMA.value.lastIndexOf("-") + 2) && j.posicion == "Arquero");

  return jugadores.map(e => `${e.numero?.toString().padStart(2, "0")} - ${e.posicion} - ${e.nombre?.toUpperCase()} - ${e._id}`).sort();
})
const selectedMA = ref("");

const selectedEquipoMG = ref<string>("");
const jugadoresAutocompleteMG = computed(() => {
  const jugadores = useProdeStore().jugadores.filter(j =>
    j.equipo == selectedEquipoMG.value.substring(selectedEquipoMG.value.lastIndexOf("-") + 2));

  return jugadores.map(e => `${e.numero?.toString().padStart(2, "0")} - ${e.posicion} - ${e.nombre?.toUpperCase()} - ${e._id}`).sort();
})
const selectedMG = ref("");

const isLoadingChanges = ref(false);

//* Functions
function handleGuardar() {
  isLoadingChanges.value = true;
  useProdeStore().dispatchUpdateMejoresJugadores(
    selectedMJ.value.substring(selectedMJ.value.lastIndexOf("-") + 2),
    selectedMA.value.substring(selectedMA.value.lastIndexOf("-") + 2),
    selectedMG.value.substring(selectedMG.value.lastIndexOf("-") + 2)
  )
    .finally(() => {
      isLoadingChanges.value = false;
    });
}

function onSelectEquipo(tipo: "MJ" | "MG" | "MA") {
  switch (tipo) {
    case "MA":
      selectedMA.value = "";
      break;
    case 'MJ':
      selectedMJ.value = "";
      break;
    case 'MG':
      selectedMG.value = "";
      break;
  }
}
</script>

<template>
  <v-card>
    <v-card-title primary-title>
      Agregar Resultado Mejores Jugadores.
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          Mejor Jugador
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete v-model="selectedEquipoMJ" label="Equipo" :items="equiposAutocomplete" variant="outlined"
            hide-details="auto" @update:model-value="() => onSelectEquipo('MJ')" />
        </v-col>

        <v-col>
          <v-autocomplete v-model="selectedMJ" label="Jugador" :items="jugadoresAutocompleteMJ" variant="outlined"
            hide-details="auto" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <hr />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          Mejor Arquero
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete v-model="selectedEquipoMA" label="Equipo" :items="equiposAutocomplete" variant="outlined"
            hide-details="auto" @update:model-value="() => onSelectEquipo('MA')" />
        </v-col>

        <v-col>
          <v-autocomplete v-model="selectedMA" label="Jugador" :items="jugadoresAutocompleteMA" variant="outlined"
            hide-details="auto" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <hr />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          Mejor Goleador
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete v-model="selectedEquipoMG" label="Equipo" :items="equiposAutocomplete" variant="outlined"
            hide-details="auto" @update:model-value="() => onSelectEquipo('MG')" />
        </v-col>

        <v-col>
          <v-autocomplete v-model="selectedMG" label="Jugador" :items="jugadoresAutocompleteMG" variant="outlined"
            hide-details="auto" />
        </v-col>
      </v-row>

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