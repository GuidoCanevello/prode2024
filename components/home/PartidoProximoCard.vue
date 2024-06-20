<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { isGettingData, hasData, dataProxPartido } = storeToRefs(useProdeStore());
const { isLogged } = storeToRefs(useAuthStore());
const { lgAndUp, width } = useDisplay();

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
          <v-spacer v-if="lgAndUp" />

          <v-col lg="11">
            <v-row>
              <v-col class="equipo-col equipo1-col" :cols="width < 520 ? 12 : ''">
                <v-card variant="outlined">
                  <v-row>
                    <v-col class="bandera-col" cols="auto" align-self="center">
                      <BanderaImg :code="dataProxPartido?.code1" />
                    </v-col>

                    <v-col class="nombre-col" align-self="center">
                      <h2>{{ dataProxPartido?.equipo1 }}</h2>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col class="px-0" style="text-align: center" :cols="width < 520 ? 12 : 'auto'" align-self="center">
                <h3>vs.</h3>
              </v-col>

              <v-col class="equipo-col equipo2-col" :cols="width < 520 ? 12 : ''">
                <v-card variant="outlined">
                  <v-row>
                    <v-col class="nombre-col" align-self="center">
                      <h2>{{ dataProxPartido?.equipo2 }}</h2>
                    </v-col>

                    <v-col class="bandera-col" cols="auto" align-self="center">
                      <BanderaImg :code="dataProxPartido?.code2" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-spacer v-if="lgAndUp" />
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
.equipo-col {
  .v-card {
    height: 100%;
  }

  @media (max-width: 1280px) {
    .v-card {
      padding: 4px;
      height: 100%;
    }
  }

  .v-row {
    margin: 0px;
    height: 100%;
  }
}

.equipo1-col {
  .bandera-col {
    text-align: right;
  }

  @media (max-width: 1280px) {
    .bandera-col {
      padding-right: 0px;
      padding-left: 4px;
    }
  }

  .nombre-col {
    text-align: left;
  }
}

.equipo2-col {
  .bandera-col {
    text-align: left;
  }

  @media (max-width: 1280px) {
    .bandera-col {
      padding-left: 0px;
      padding-right: 4px;
    }
  }

  .nombre-col {
    text-align: right;
  }
}
</style>
