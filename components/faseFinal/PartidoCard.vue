<script setup lang="ts">
import { useDisplay } from 'vuetify';

const props = defineProps<{
  partido: IPartido,
}>();
const { isAdmin } = storeToRefs(useUserStore());
const { isLogged } = storeToRefs(useAuthStore());
const { predicciones } = storeToRefs(useProdeStore());
const { xs, mdAndUp } = useDisplay();

const isSavingData = ref(false);

const equipo1 = computed(() => useProdeStore().equipos.find(e => e._id == props.partido.equipo1));
const equipo2 = computed(() => useProdeStore().equipos.find(e => e._id == props.partido.equipo2));

const fechaFormateada = computed(() => {
  if (props.partido.fecha != undefined) {
    return formatoFecha(new Date(props.partido.fecha));
  } else {
    return "";
  }
})

const horaFormateada = computed(() => {
  if (props.partido.fecha != undefined) {
    return formatoHora(new Date(props.partido.fecha));
  } else {
    return "";
  }
})

// NOTE usado para actualiar la prediccion
const prediccion = computed(() => {
  const pred = predicciones.value.find(p => p.partidoId == props.partido._id);
  if (pred != undefined) {
    prediccionEquipo1.value = pred.golesEquipo1?.toString() ?? ""
    prediccionEquipo2.value = pred.golesEquipo2?.toString() ?? ""
  }
  return pred;
})

const prediccionEquipo1 = ref("");
const prediccionEquipo2 = ref("");

const nomEquipo1 = computed(() => getEquipoName(1));
const nomEquipo2 = computed(() => getEquipoName(2));
function getEquipoName(valor: 1 | 2) {
  const tipoEliminatoriaInicio: TTipoEliminatoria = "Cuartos";
  const equipo = (valor == 1 ? equipo1.value : equipo2.value);

  return equipo != undefined ?
    (equipo.nombre ?? "") :
    (props.partido.tipoEliminatoria == "Tercero" ? "Perdedor" : "Ganador") +
    " de " +
    (props.partido.tipoEliminatoria == tipoEliminatoriaInicio ?
      "-" :
      useProdeStore().partidos.find(p => p._id == (valor == 1 ? props.partido.partidoEquipo1 : props.partido.partidoEquipo2))?.identificadorEliminatorias);
}

function guardarCambios() {
  isSavingData.value = true;
  useUserStore().updatePrediccion(props.partido._id, prediccionEquipo1.value, prediccionEquipo2.value)
    .finally(() => {
      isSavingData.value = false;
    });
}
</script>

<template>
  <div style="display: none;"> {{ prediccion }} </div>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          <h3> {{ partido.identificadorEliminatorias }} - {{ nomEquipo1 }} vs. {{ nomEquipo2 }} </h3>
          <template v-if="isAdmin">
            {{ partido._id }}
          </template>
        </v-col>

        <v-col v-if="mdAndUp && isLogged" cols="auto">
          <v-btn color="success" variant="elevated" @click="guardarCambios">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-subtitle>
      Fecha: {{ fechaFormateada }} - Hora: {{ horaFormateada }}
    </v-card-subtitle>

    <v-card-text v-if="isLogged">
      <v-container id="page-container">
        <template v-if="equipo1 != undefined && equipo2 != undefined">
          <v-row>
            <v-spacer v-if="!mdAndUp" />

            <v-col cols="auto" align-self="center">
              <BanderaImg :code="equipo1.code" />
            </v-col>

            <v-col cols="auto" align-self="center">
              <b> {{ equipo1.nombre }} </b>
            </v-col>

            <v-col v-if="mdAndUp" align-self="center">
              <v-text-field v-model="prediccionEquipo1" :label="`Predicción Goles ${equipo1.nombre}`"
                hide-details="auto" :variant="!isSavingData ? 'outlined' : 'filled'" :disabled="isSavingData" />
            </v-col>

            <v-col cols="auto" align-self="center">
              <template v-if="partido.golesEquipo1 == undefined && partido.golesEquipo2 == undefined">
                vs.
              </template>

              <template v-else-if="!xs">
                {{ partido.golesEquipo1 }}
                {{ partido.penalesEquipo1 != undefined ? `(${partido.penalesEquipo1})` : "" }}
                -
                {{ partido.penalesEquipo2 != undefined ? `(${partido.penalesEquipo2})` : "" }}
                {{ partido.golesEquipo2 }}
              </template>
            </v-col>

            <v-col v-if="mdAndUp" align-self="center">
              <v-text-field v-model="prediccionEquipo2" :label="`Predicción Goles ${equipo2.nombre}`"
                style="text-align: end;" hide-details="auto" :variant="!isSavingData ? 'outlined' : 'filled'"
                :disabled="isSavingData" />
            </v-col>

            <v-col cols="auto" align-self="center">
              <b> {{ equipo2.nombre }} </b>
            </v-col>

            <v-col cols="auto" align-self="center">
              <BanderaImg :code="equipo2.code" />
            </v-col>

            <v-spacer v-if="!mdAndUp" />
          </v-row>

          <v-row v-if="xs">
            <v-spacer />
            <v-col cols="auto">
              {{ partido.golesEquipo1 }}
              {{ partido.penalesEquipo1 != undefined ? `(${partido.penalesEquipo1})` : "" }}
              -
              {{ partido.penalesEquipo2 != undefined ? `(${partido.penalesEquipo2})` : "" }}
              {{ partido.golesEquipo2 }}
            </v-col>
            <v-spacer />
          </v-row>

          <v-row v-if="!mdAndUp">
            <v-col align-self="center">
              <v-text-field v-model="prediccionEquipo1" :label="`${equipo1.nombre}`" type="number" hide-details="auto"
                :variant="!isSavingData ? 'outlined' : 'filled'" :disabled="isSavingData" />
            </v-col>

            <v-col cols="auto" align-self="center">
              -
            </v-col>

            <v-col align-self="center">
              <v-text-field v-model="prediccionEquipo2" :label="`${equipo2.nombre}`" type="number"
                style="text-align: end;" hide-details="auto" :variant="!isSavingData ? 'outlined' : 'filled'"
                :disabled="isSavingData" />
            </v-col>
          </v-row>
        </template>

        <v-row v-else> <v-col> <b> No se encuentra habilitada la Predicción </b> </v-col> </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions v-if="!mdAndUp && isLogged">
      <v-row>
        <v-spacer />

        <v-col cols="auto">
          <v-btn color="success" variant="elevated" @click="guardarCambios">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>