<script setup lang="ts">
import darFormatoFecha from '../../utils/darFormatoFecha';
const props = defineProps(["nombre", "partidos"]);

const { isUserLogged } = storeToRefs(useUserStore());

//* Btn Update Predicciones
const isLoadingUpdatePredicciones = computed(() => {
  return false;
})

const onUpdatePredicciones = () => {
  // TODO Implement
  console.log("update predicciones")
}

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

onMounted(() => {
  dataPartidos.value = [];

  props.partidos.forEach((partido: NProdeStore.FaseGrupos.IPartido) => {
    let newPartido = {
      partidoId: partido.partidoId,
      equipo1: partido.equipo1,
      code1: partido.code1,
      equipo2: partido.equipo2,
      code2: partido.code2,
      guion: partido.isDespuesPartido ? `${partido.golesEquipo1} - ${partido.golesEquipo2}` : "N - N",
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
    };

    dataPartidos.value.push(newPartido);
  })
});
</script>

<template>
  <!-- <v-card outlined> -->
  <v-card outlined style="height: 100%" class="d-flex flex-column">
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
            class: isUserLogged ? "columna-nombre-equipo-con-pred" : "columna-nombre-equipo-sin-pred"
          }
        },
        {
          align: "center",
          sortable: false,
          value: "golesPrediccionEquipo1",
          headerProps: !isUserLogged ? {
            class: " d-none"
          } : undefined,
          cellProps: !isUserLogged ? {
            class: " d-none"
          } : undefined,
        },
        {
          title: "Goles",
          align: "center",
          value: "guion",
          sortable: false,
          width: "1%",
        },
        {
          align: "center",
          sortable: false,
          value: "golesPrediccionEquipo2",
          headerProps: !isUserLogged ? {
            class: " d-none"
          } : undefined,
          cellProps: !isUserLogged ? {
            class: " d-none"
          } : undefined,
        },
        {
          title: "Equipo 2",
          sortable: false,
          align: "end",
          value: "equipo2",
          cellProps: {
            class: isUserLogged ? "columna-nombre-equipo-con-pred" : "columna-nombre-equipo-sin-pred"
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
        :sort-by="[{ key: 'fecha' }]" density="compact" v-model:expanded="expanded" show-expand>
        <!-- :item-class="fondoItem" -->
        <!-- TODO add fondo item, cuando vaya a probar predicciones -->

        <template v-slot:[`item.equipo1`]="{ item }">
          <v-row>
            <v-col class="pr-0" cols="auto">
              <BanderaImg :code="item.code1" />
            </v-col>
            <v-col>
              {{ item.equipo1 }}
            </v-col>
          </v-row>
        </template>

        <template v-slot:[`item.golesPrediccionEquipo1`]="{ item }">
          <!-- <td class="px-0" style="width: 120px"> -->
          <v-text-field :outlined="item.isPrediccionHabilitado" :filled="!item.isPrediccionHabilitado" density="compact"
            hide-details="auto" :disabled="!item.isPrediccionHabilitado" v-model="item.golesPrediccionEquipo1"
            :placeholder="item.isPrediccionHabilitado ? 'Ej: 0' : 'X'" />
          <!-- </td> -->
        </template>

        <template v-slot:[`item.golesPrediccionEquipo2`]="{ item }">
          <!-- <td class="px-0" style="width: 120px"> -->
          <v-text-field :outlined="item.isPrediccionHabilitado" :filled="!item.isPrediccionHabilitado" density="compact"
            hide-details="auto" class="input-goles-2" :disabled="!item.isPrediccionHabilitado"
            v-model="item.golesPrediccionEquipo2" :placeholder="item.isPrediccionHabilitado ? 'Ej: 0' : 'X'" />
          <!-- </td> -->
        </template>

        <template v-slot:[`item.equipo2`]="{ item }">
          <v-row>
            <v-col style="text-align: end">
              {{ item.equipo2 }}
            </v-col>
            <v-col class="pl-0" cols="auto" style="text-align: end">
              <BanderaImg :code="item.code2" />
            </v-col>
          </v-row>
        </template>


        <template v-slot:expanded-row="{ columns, item }">
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


<style>
.table-partidos {
  .v-table__wrapper {
    overflow: hidden;
  }
}

.table-partidos .columna-nombre-equipo-con-pred {
  width: 30%;
}

.table-partidos .columna-nombre-equipo-sin-pred {
  width: 50%;
}

.table-partidos .input-goles-2 {
  input {
    text-align: end;
  }
}
</style>

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