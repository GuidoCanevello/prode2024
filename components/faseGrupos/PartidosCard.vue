<script setup lang="ts">
import { useDisplay } from 'vuetify';
import darFormatoFecha from '../../utils/darFormatoFecha';

const props = defineProps(["nombre", "partidos"]);
const emit = defineEmits(['onPrediccionActualizada'])

const { isLogged } = storeToRefs(useAuthStore());
const { predicciones } = useProdeStore();
const { xs, sm, smAndUp } = useDisplay();

//* Btn Update Predicciones
const isLoadingUpdatePredicciones = ref(false);

//* Alert
const showAlert = ref(false)

//* Data Table
const dataPartidos = ref<{
  partidoId: TMongoID,
  equipo1: string,
  code1: string,
  equipo2: string,
  code2: string,
  guion: string,
  golesEquipo1: number,
  golesEquipo2: number,
  isPrediccionHabilitado: boolean,
  golesPrediccionEquipo1: number | undefined,
  golesPrediccionEquipo2: number | undefined,
  tienePrediccion: boolean,
  fecha: Date,
}[]>([]);

const expanded = ref([]);

const verificarGoles = (gol1: number, gol2: number) => {
  if (gol1 === undefined || gol2 === undefined) return true;
  else return !isNaN(gol1) && !isNaN(gol2);
};

const onUpdatePredicciones = async () => {
  showAlert.value = false;

  let isActualizado = false;
  let hayError = dataPartidos.value.some(
    (p) =>
      p.golesPrediccionEquipo1 != undefined &&
      p.golesPrediccionEquipo2 != undefined &&
      !verificarGoles(p.golesPrediccionEquipo1, p.golesPrediccionEquipo2)
  );

  if (!hayError) {
    isLoadingUpdatePredicciones.value = true;

    for (const p of dataPartidos.value) {
      if (p.golesPrediccionEquipo1 != undefined && p.golesPrediccionEquipo2 != undefined) {
        if (!p.tienePrediccion) {
          await useUserStore().updatePrediccion(p.partidoId, p.golesPrediccionEquipo1, p.golesPrediccionEquipo2);
          p.tienePrediccion = true;
          isActualizado = true;
        } else if (p.tienePrediccion &&
          (predicciones.find((p) => p.partidoId === p.partidoId)?.golesEquipo1 != p.golesPrediccionEquipo1 ||
            predicciones.find((p) => p.partidoId === p.partidoId)?.golesEquipo2 != p.golesPrediccionEquipo2)
        ) {

          await useUserStore().updatePrediccion(p.partidoId, p.golesPrediccionEquipo1, p.golesPrediccionEquipo2);
          isActualizado = true;
        }
      }

      if (isActualizado) emit("onPrediccionActualizada");

      isLoadingUpdatePredicciones.value = false;
    }
  } else {
    showAlert.value = true;
  }
};

function setDataPartidos() {
  dataPartidos.value = [];

  props.partidos.forEach((partido: NProdeStore.FaseGrupos.IPartido) => {
    dataPartidos.value.push({
      partidoId: partido.partidoId,
      equipo1: partido.equipo1,
      code1: partido.code1,
      equipo2: partido.equipo2,
      code2: partido.code2,
      guion: partido.isDespuesPartido ? `${partido.golesEquipo1} - ${partido.golesEquipo2}` : " - ",
      golesEquipo1: partido.golesEquipo1,
      golesEquipo2: partido.golesEquipo2,
      isPrediccionHabilitado: !partido.isDespuesPartido,
      golesPrediccionEquipo1: partido.tienePrediccion
        ? partido.prediccion?.golesEquipo1
        : undefined,
      golesPrediccionEquipo2: partido.tienePrediccion
        ? partido.prediccion?.golesEquipo2
        : undefined,
      tienePrediccion: partido.tienePrediccion,
      fecha: partido.fecha,
    });
  })
}

onMounted(setDataPartidos);
onUpdated(setDataPartidos);
</script>

<template>
  <v-card style="height: 100%" class="d-flex flex-column">
    <v-card-title primary-title>
      <v-row>
        <v-col> Partidos de Grupo {{ nombre }}</v-col>
        <v-col style="text-align: end">
          <v-btn color="success" :loading="isLoadingUpdatePredicciones" :disabled="isLoadingUpdatePredicciones"
            @click="onUpdatePredicciones">
            Guardar Cambios
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-spacer />

    <v-card-text>
      <v-alert type="error" v-model="showAlert">
        Solo se permiten Numeros
      </v-alert>

      <v-data-table :headers='[
        {
          title: "Equipo 1",
          align: "start",
          key: "equipo1",
          sortable: false,
          cellProps: {
            class: isLogged ? "columna-nombre-equipo-con-pred" : "columna-nombre-equipo-sin-pred"
          }
        },
        {
          align: "center",
          sortable: false,
          value: "golesPrediccionEquipo1",
          headerProps: !isLogged || xs ? {
            class: " d-none"
          } : {
            class: " px-0"
          },
          cellProps: !isLogged || xs ? {
            class: " d-none"
          } : {
            class: " px-0"
          },
        },
        {
          title: "Goles",
          align: "center",
          value: "guion",
          sortable: false,
          width: "1%",
          headerProps: {
            class: " px-0"
          },
          cellProps: {
            class: " px-0"
          }
        },
        {
          align: "center",
          sortable: false,
          value: "golesPrediccionEquipo2",
          headerProps: !isLogged || xs ? {
            class: " d-none"
          } : {
            class: " px-0"
          },
          cellProps: !isLogged || xs ? {
            class: " d-none"
          } : {
            class: " px-0"
          },
        },
        {
          title: "Equipo 2",
          sortable: false,
          align: "end",
          value: "equipo2",
          cellProps: {
            class: isLogged ? "columna-nombre-equipo-con-pred" : "columna-nombre-equipo-sin-pred"
          }
        },
        {
          value: "fecha",
          headerProps: {
            class: " d-none"
          },
          cellProps: {
            class: " d-none"
          }
        },
      ]' :items="dataPartidos" item-key="partidoId" item-value="partidoId" class="table-partidos"
        :sort-by="[{ key: 'fecha' }]" density="compact" v-model:expanded="expanded" show-expand mobile-breakpoint="xs">
        <!-- :item-class="fondoItem" -->
        <!-- TODO add fondo item, cuando vaya a probar predicciones -->

        <template v-slot:[`item.equipo1`]="{ item }">
          <v-row>
            <v-col class="pr-0" cols="auto">
              <BanderaImg :code="item.code1" />
            </v-col>
            <v-col :class="sm ? 'pr-0' : ''">
              {{ item.equipo1 }}
            </v-col>
          </v-row>
        </template>

        <template v-if="smAndUp" v-slot:[`item.golesPrediccionEquipo1`]="{ item }">
          <v-text-field v-model="item.golesPrediccionEquipo1"
            :variant="item.isPrediccionHabilitado ? 'outlined' : 'filled'" density="compact" hide-details="auto"
            :disabled="!item.isPrediccionHabilitado" :placeholder="item.isPrediccionHabilitado ? '-' : 'X'" />
        </template>

        <template v-if="smAndUp" v-slot:[`item.golesPrediccionEquipo2`]="{ item }">
          <v-text-field v-model="item.golesPrediccionEquipo2" class="input-goles-2"
            :variant="item.isPrediccionHabilitado ? 'outlined' : 'filled'" density="compact" hide-details="auto"
            :disabled="!item.isPrediccionHabilitado" :placeholder="item.isPrediccionHabilitado ? '-' : 'X'" />
        </template>

        <template v-slot:[`item.equipo2`]="{ item }">
          <v-row>
            <v-col :class="sm ? 'pl-0' : ''" style="text-align: end">
              {{ item.equipo2 }}
            </v-col>
            <v-col class="pl-0" cols="auto" style="text-align: end">
              <BanderaImg :code="item.code2" />
            </v-col>
          </v-row>
        </template>


        <template v-slot:expanded-row="{ columns, item }">
          <tr v-if="xs && isLogged">
            <td :colspan="columns.length">
              <v-row>
                <v-col>
                  <v-text-field v-model="item.golesPrediccionEquipo1"
                    :variant="item.isPrediccionHabilitado ? 'outlined' : 'filled'" density="compact" hide-details="auto"
                    :disabled="!item.isPrediccionHabilitado" :placeholder="item.isPrediccionHabilitado ? '-' : 'X'" />
                </v-col>

                <v-col cols="auto"> - </v-col>

                <v-col>
                  <v-text-field v-model="item.golesPrediccionEquipo2" class="input-goles-2"
                    :variant="item.isPrediccionHabilitado ? 'outlined' : 'filled'" density="compact" hide-details="auto"
                    :disabled="!item.isPrediccionHabilitado" :placeholder="item.isPrediccionHabilitado ? '-' : 'X'" />
                </v-col>

                <v-col cols="auto" style="width: 40px;">

                </v-col>
              </v-row>
            </td>
          </tr>

          <tr>
            <td :colspan="columns.length">
              Fecha: {{ darFormatoFecha(item.fecha) }}
            </td>
          </tr>
        </template>

        <template #bottom />
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style src="@/assets/css/fase-grupos.css"></style>

<style scoped>
/* TODO imlpementar */
.fila-con-prediccion {
  background-color: #e1f5fe;
}

.fila-con-prediccion-correcta {
  background-color: #a5d6a7;
}

.fila-con-prediccion-acertada {
  background-color: #80cbc4;
}

.fila-con-prediccion-erronea {
  background-color: #ef9a9a;
}

.table-partidos .fila-con-prediccion:hover {
  background-color: #b3e5fc !important;
}

.table-partidos .fila-con-prediccion-correcta:hover {
  background-color: #66bb6a !important;
}

.table-partidos .fila-con-prediccion-acertada:hover {
  background-color: #26a69a !important;
}

.table-partidos .fila-con-prediccion-erronea:hover {
  background-color: #ef5350 !important;
}
</style>