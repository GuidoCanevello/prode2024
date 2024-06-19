<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { isGettingData, hasData, dataListado } = storeToRefs(useProdeStore());
const { isLogged } = storeToRefs(useAuthStore());
const { smAndDown, lgAndUp } = useDisplay();

const page = ref(1);
const itemsPerPage = ref(5);
const pageCount = computed(() => {
  return Math.ceil(dataListado.value.length / itemsPerPage.value);
})

const busqueda = ref("")

const isLoadingListado = computed(() => {
  return isGettingData.value && !hasData.value;
})

const filtrarEquipo = (value: string, query: string, item: any) => {
  if (value != item.columns.descripcionPartido) return false;

  const descripcionPartido = value.toLocaleUpperCase();
  const textoBusqueda = query.toLocaleUpperCase().trim();

  return descripcionPartido != "" && textoBusqueda != "" && descripcionPartido.includes(textoBusqueda);
}
</script>

<template>
  <v-card>
    <v-card-title primary-title style="word-break: break-word;">
      <v-row class="pb-2">
        <v-col cols="auto"> Listado de Partidos </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-data-table :headers='[
        {
          title: "Partidos",
          align: "start",
          sortable: false,
          value: "descripcionPartido",
          minWidth: lgAndUp ? "250px" : "",
        },
        {
          title: "Pronostico",
          sortable: false,
          value: "descripcionPrediccion",
          headerProps: !isLogged ? {
            class: " d-none"
          } : undefined,
          cellProps: !isLogged ? {
            class: " d-none"
          } : undefined,
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
        class="table-partidos" :sort-by="[{ key: 'fecha' }]" mobile-breakpoint="md">
        <!-- :item-class="fondoItem" -->
        <!-- TODO add fondo-Item cuando tenga predicciones -->
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
