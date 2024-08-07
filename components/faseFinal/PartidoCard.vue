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
const isNotFinished = computed(() => {
  return props.partido.fecha != undefined && new Date() < new Date(props.partido.fecha)
});
const isTextFieldDisabled = computed(() => {
  return isSavingData.value || !isNotFinished.value;
})

const prediccionCardClass = computed(() => {
  if (isNotFinished.value || prediccion.value == undefined ||
    prediccion.value.golesEquipo1 == undefined || prediccion.value.golesEquipo2 == undefined ||
    props.partido.golesEquipo1 == undefined || props.partido.golesEquipo2 == undefined) return "";

  // Si acerto la prediccion exactamente
  if (
    props.partido.golesEquipo1 == prediccion.value.golesEquipo1 &&
    props.partido.golesEquipo2 == prediccion.value.golesEquipo2
  )
    return "prediccion-correcta-card";

  // Si acerto el resultado (pero no los goles)
  else if (
    toResultado(prediccion.value.golesEquipo1, prediccion.value.golesEquipo2) ==
    toResultado(props.partido.golesEquipo1, props.partido.golesEquipo2)
  )
    return "prediccion-acertada-card";

  // Si se equivoco
  else return "prediccion-erronea-card";
})

const prediccionPenalesClass = computed(() => {
  if (isNotFinished.value || prediccion.value == undefined ||
    prediccion.value.golesEquipo1 == undefined || prediccion.value.golesEquipo2 == undefined ||
    prediccion.value.golesEquipo1 != prediccion.value.golesEquipo2 || prediccion.value.penales == undefined || prediccion.value.penales == "Sin" ||
    props.partido.golesEquipo1 == undefined || props.partido.golesEquipo2 == undefined ||
    props.partido.penalesEquipo1 == undefined || props.partido.penalesEquipo2 == undefined) return "";

  // Si acerto la prediccion exactamente
  if (
    prediccion.value.golesEquipo1 == prediccion.value.golesEquipo2 &&
    props.partido.golesEquipo1 == props.partido.golesEquipo2 &&
    ((prediccion.value.penales == "GanaE1" && props.partido.penalesEquipo1 > props.partido.penalesEquipo2) ||
      (prediccion.value.penales == "GanaE2" && props.partido.penalesEquipo1 < props.partido.penalesEquipo2))
  )
    return "prediccion-correcta-card";

  // Si se equivoco
  else return "prediccion-erronea-card";
})

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

  if (prediccionEquipo1.value == "" && prediccionEquipo2.value == "") {
    if (pred != undefined) {
      prediccionEquipo1.value = pred.golesEquipo1?.toString() ?? "";
      prediccionEquipo2.value = pred.golesEquipo2?.toString() ?? "";

      if (getIsEmpate()) {
        if (pred.penales == "Sin") isPrediccionPenalesEquipo1.value = undefined;
        else isPrediccionPenalesEquipo1.value = pred.penales == "GanaE2";
      }
    }
  }
  return pred;
})

const prediccionEquipo1 = ref("");
const prediccionEquipo2 = ref("");

const showSeleccionEmpate = computed(() => {
  const isEmpate = getIsEmpate()
  if (!isEmpate) isPrediccionPenalesEquipo1.value = undefined;
  return isEmpate;
});
const isPrediccionPenalesEquipo1 = ref<boolean | undefined>(undefined);

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
  const penales: TPrediccionPenales = isPrediccionPenalesEquipo1.value == undefined ? "Sin" : isPrediccionPenalesEquipo1.value ? "GanaE2" : "GanaE1";
  useUserStore().updatePrediccion(props.partido._id, prediccionEquipo1.value, prediccionEquipo2.value, penales)
    .finally(() => {
      isSavingData.value = false;
    });
}

function getIsEmpate() {
  return prediccionEquipo1.value != "" && prediccionEquipo2.value != "" && prediccionEquipo1.value == prediccionEquipo2.value;
}
</script>

<template>
  <div style="display: none;"> {{ prediccion }} </div>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          <v-card :class="prediccionCardClass" :variant="isNotFinished ? 'flat' : 'outlined'">
            <h3> {{ partido.identificadorEliminatorias }} - {{ nomEquipo1 }} vs. {{ nomEquipo2 }} </h3>
            <template v-if="isAdmin">
              {{ partido._id }}
            </template>
          </v-card>
        </v-col>

        <v-col v-if="mdAndUp && isLogged" cols="auto">
          <v-btn color="success" variant="elevated" :disabled="isTextFieldDisabled"
            @click="guardarCambios">Guardar</v-btn>
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
                hide-details="auto" :variant="!isTextFieldDisabled ? 'outlined' : 'filled'"
                :disabled="isTextFieldDisabled" />
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
                style="text-align: end;" hide-details="auto" :variant="!isTextFieldDisabled ? 'outlined' : 'filled'"
                :disabled="isTextFieldDisabled" />
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
                :variant="!isTextFieldDisabled ? 'outlined' : 'filled'" :disabled="isTextFieldDisabled" />
            </v-col>

            <v-col cols="auto" align-self="center">
              -
            </v-col>

            <v-col align-self="center">
              <v-text-field v-model="prediccionEquipo2" :label="`${equipo2.nombre}`" type="number"
                style="text-align: end;" hide-details="auto" :variant="(!isTextFieldDisabled) ? 'outlined' : 'filled'"
                :disabled="isTextFieldDisabled" />
            </v-col>
          </v-row>

          <v-row v-if="showSeleccionEmpate">
            <v-col class="pa-0">
              <v-card :class="prediccionPenalesClass" :variant="isNotFinished || isPrediccionPenalesEquipo1 == undefined ? 'flat' : 'outlined'">
                <v-row id="penales-row">
                  <v-spacer v-if="mdAndUp" />

                  <v-col md="auto" align-self="center">
                    <v-card class="pa-1" variant="outlined" color="penales-1">
                      Gana {{ equipo1.nombre }} por Penales
                    </v-card>
                  </v-col>

                  <v-col cols="auto" align-self="center">
                    <v-switch v-model="isPrediccionPenalesEquipo1"
                      :indeterminate="isPrediccionPenalesEquipo1 == undefined" hide-details="auto" color="penales-2"
                      :disabled="isTextFieldDisabled"
                      :base-color="isPrediccionPenalesEquipo1 != undefined ? 'penales-1' : ''" />
                  </v-col>

                  <v-col md="auto" align-self="center" style="text-align: end;">
                    <v-card class="pa-1" variant="outlined" color="penales-2">
                      Gana {{ equipo2.nombre }} por Penales
                    </v-card>
                  </v-col>

                  <v-spacer v-if="mdAndUp" />
                </v-row>
              </v-card>
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
          <v-btn color="success" variant="elevated" :disabled="isTextFieldDisabled"
            @click="guardarCambios">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.prediccion-correcta-card {
  border-width: thick;
  border-color: rgb(var(--v-theme-data-predict-very-correct-hover));
}

.prediccion-acertada-card {
  border-width: thick;
  border-color: rgb(var(--v-theme-data-predict-correct-hover));
}

.prediccion-erronea-card {
  border-width: thick;
  border-color: rgb(var(--v-theme-data-predict-wrong));
}
</style>

<style>
@media (min-width: 800px) {
  #penales-row {
    .v-selection-control__wrapper {
      width: 200px;

      .v-switch__track {
        width: 200px;
      }
    }

    .v-switch {
      .v-selection-control__input {
        transform: translateX(-100px);
      }

      .v-selection-control--dirty {
        .v-selection-control__input {
          transform: translateX(100px);
        }
      }
    }

    .v-switch--indeterminate {
      .v-selection-control__input {
        transform: translateX(0px) !important;
        transform: scale(0.8);
      }
    }
  }
}
</style>