<script setup lang="ts">
const { isGettingData, hasData, dataProxPartido } = storeToRefs(useProdeStore());
const { isLogged } = storeToRefs(useAuthStore());

const isLoadingProxPartido = computed(() => {
  return isGettingData.value && !hasData.value;
})

const fechaFormateada = computed(() => {
  if (!isLoadingProxPartido.value && dataProxPartido.value != undefined) {
    const fecha = dataProxPartido.value.fecha;
    const nombreDia = obtenerNombreDia(fecha.getDay()),
      dia = addCero(fecha.getDate()),
      mes = addCero(fecha.getMonth() + 1);

    return `${nombreDia} ${dia}/${mes}`;
  } else {
    return "";
  }
})

const horaFormateada = computed(() => {
  if (!isLoadingProxPartido.value && dataProxPartido.value != undefined) {
    const fecha = dataProxPartido.value.fecha;
    const hora = addCero(fecha.getHours()),
      minutos = addCero(fecha.getMinutes());

    return `${hora}:${minutos}`;
  } else {
    return "";
  }
})
</script>

<template>
  <v-card>
    <v-card-title primary-title style="word-break: break-word;"> Proximo Partido </v-card-title>

    <v-card-subtitle>
      Fecha: {{ fechaFormateada }} - Hora: {{ horaFormateada }}
    </v-card-subtitle>

    <v-card-text>
      <template v-if="isLoadingProxPartido"> Cargando... </template>

      <template v-else>
        <v-row>
          <!-- REVIEW implement responsive -->
          <!-- <v-spacer v-if="IS_SCREEN_BEYOND_LARGE" /> -->
          <v-spacer></v-spacer>

          <v-col lg="11">
            <v-row>
              <v-col>
                <!-- <v-card variant="outlined" :class="IS_SCREEN_BEYOND_MEDIUM
                  ? 'team-card-medium'
                  : 'team-card-small'
                  "> -->
                <v-card variant="outlined" class="team-card-medium">
                  <v-container class="pa-0" fill-height fluid>
                    <v-row align="center">
                      <!-- <v-col :class="IS_SCREEN_BEYOND_SMALL ? '' : 'pr-0'" style="text-align: right" cols="auto"
                        align-self="center"> -->
                      <v-col style="text-align: right" cols="auto" align-self="center">
                        <BanderaImg :code="dataProxPartido?.code1" />
                      </v-col>
                      <v-col style="text-align: left">
                        <h2>{{ dataProxPartido?.equipo1 }}</h2>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <v-col class="px-0" style="text-align: center" cols="auto" align-self="center">
                <h3>vs.</h3>
              </v-col>

              <v-col>
                <!-- <v-card variant="outlined" :class="IS_SCREEN_BEYOND_MEDIUM
                  ? 'team-card-medium'
                  : 'team-card-small'
                  "> -->
                <v-card variant="outlined" class="team-card-medium">
                  <v-container class="pa-0" fill-height fluid>
                    <v-row align="center">
                      <v-col style="text-align: right">
                        <h2>{{ dataProxPartido?.equipo2 }}</h2>
                      </v-col>
                      <!-- <v-col :class="IS_SCREEN_BEYOND_SMALL ? '' : 'pl-0'" style="text-align: left" cols="auto"
                        align-self="center"> -->
                      <v-col style="text-align: left" cols="auto" align-self="center">
                        <BanderaImg :code="dataProxPartido?.code2" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- <v-spacer v-if="IS_SCREEN_BEYOND_LARGE" /> -->
          <v-spacer></v-spacer>

        </v-row>

        <template v-if="isLogged">
          <v-row>
            <v-col class="pt-0" style="text-align: center" cols="12">
              <h3>Tu Pronostico:</h3>
            </v-col>
          </v-row>

          <!-- Si tiene Prediccion -->
          <v-row v-if="dataProxPartido?.prediccion">
            <v-col class="pt-0" style="text-align: right">
              <h3>{{ dataProxPartido?.prediccion.golesEquipo1 }}</h3>
            </v-col>
            <v-col class="pt-0" style="text-align: center" cols="auto">
              <h3>-</h3>
            </v-col>
            <v-col class="pt-0" style="text-align: left">
              <h3>{{ dataProxPartido?.prediccion.golesEquipo2 }}</h3>
            </v-col>
          </v-row>

          <!-- Si todavia no la realizo -->
          <v-row v-else>
            <v-col class="pt-0" style="text-align: center">
              <p>Sin Pronostico</p>
            </v-col>
          </v-row>
        </template>
      </template>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.team-card-small {
  padding: 4px;
  height: 100%;
}

.team-card-medium {
  padding-block: 8px;
  padding-inline: 16px;
  height: 100%;
}
</style>
