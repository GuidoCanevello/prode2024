<script setup lang="ts">
const router = useRouter()
const { isGettingInitialData, hasInitialData, dataListado } = storeToRefs(useProdeStore());

const page = ref(1);
const itemsPerPage = ref(5);
const pageCount = computed(() => {
  return Math.ceil(dataListado.value.length / itemsPerPage.value);
})

const busqueda = ref("")

const isLoadingListado = computed(() => {
  return isGettingInitialData.value && !hasInitialData.value;
})

const filtrarEquipo = (value: string, query: string, item: any) => {
  if (value != item.columns.descripcionPartido) return false;

  const descripcionPartido = value.toLocaleUpperCase();
  const textoBusqueda = query.toLocaleUpperCase().trim();

  return descripcionPartido != "" && textoBusqueda != "" && descripcionPartido.includes(textoBusqueda);
}

const handleIrAFaseGrupos = () => {
  router.push('/fase-grupos')
}

const handleIrAFaseFinal = () => {
  router.push('/fase-final')
}
</script>

<template>
  <v-card>
    <v-card-title primary-title style="word-break: break-word;">
      <v-row class="pb-2">
        <v-col cols="auto"> Listado de Partidos </v-col>

        <!-- <template v-if="IS_SCREEN_BEYOND_MEDIUM"> -->
        <v-spacer />
        <v-col cols="auto" style="text-align: end">
          <v-btn color="success" @click="handleIrAFaseGrupos" variant="outlined" prepend-icon="mdi-account-group-outline">
            Fase de Grupos
          </v-btn>
        </v-col>
        <v-col cols="auto" class="pl-0" style="text-align: end">
          <v-btn color="success" @click="handleIrAFaseFinal" variant="outlined" prepend-icon="mdi-tournament">
            Fase Final
          </v-btn>
        </v-col>
        <!-- </template> -->
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-data-table :headers='[
        {
          title: "Partidos",
          align: "start",
          sortable: false,
          value: "descripcionPartido",
          // width: "250px",
          minWidth: "250px",
        },
        {
          title: "Pronostico",
          sortable: false,
          value: "descripcionPrediccion",
        },
        {
          title: "Grupo",
          value: "grupo",
          headerProps: {
            class: " d-none"
          },
          cellProps: {
            class: " d-none"
          }
        },
        {
          title: "Fecha y Hora",
          value: "fecha",
          align: "end"
        },
      ]' :items="dataListado" item-key="id" v-model:page="page" :items-per-page="itemsPerPage" :search="busqueda"
        :loading="isLoadingListado" density="compact" :custom-filter="filtrarEquipo" loading-text="Cargando Partidos..."
        class="table-partidos" :sort-by="[{ key: 'fecha' }]">
        <!-- :item-class="fondoItem" -->
        <!-- TODO add fondo-Item cuando tenga predicciones -->
        <!-- :items-per-page="IS_SCREEN_BEYOND_MEDIUM ? 15 : 5" -->
        <!-- REVIEW add responsive -->

        <template v-slot:top>
          <v-text-field v-model="busqueda" label="Buscar por Equipo" class="mx-4" />
        </template>

        <template v-slot:[`item.fecha`]="{ item }">
          <span>{{ darFormatoFecha(item.fecha) }}</span>
        </template>


        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </v-card-text>

    <!-- <v-card-subtitle v-if="!IS_SCREEN_BEYOND_MEDIUM">
      <v-row>
        <v-col cols="auto">
          <v-btn text color="success" @click="handleIrAFaseGrupos" outlined>
            Fase de Grupos
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn text color="success" @click="handleIrAFaseFinal" outlined>
            Fase Final
          </v-btn>
        </v-col>
      </v-row>
    </v-card-subtitle> -->
  </v-card>
</template>

<style>
/* TODO generalizar  */
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
