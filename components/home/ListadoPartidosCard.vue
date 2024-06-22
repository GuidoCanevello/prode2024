<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { isGettingData, hasData, dataListado } = storeToRefs(useProdeStore());
const { isLogged } = storeToRefs(useAuthStore());
const { lgAndUp } = useDisplay();

const page = ref(1);
const itemsPerPage = ref(5);
const pageCount = computed(() => {
  return Math.ceil(dataListado.value.length / itemsPerPage.value);
})

const busqueda = ref("")

const isLoadingListado = computed(() => {
  return isGettingData.value && !hasData.value;
})

function fondoItem(data: any) {
  // Si tiene Prediccion
  if (data.item.tienePrediccion) {
    // Si ya ocurrio el Partido y los goles se cargaron
    if (new Date(data.item.fecha) < new Date() && data.item.golesEquipo1 != undefined && data.item.golesEquipo2 != undefined) {
      // Si acerto la prediccion exactamente
      if (
        data.item.golesEquipo1 == data.item.prediccion.golesEquipo1 &&
        data.item.golesEquipo2 == data.item.prediccion.golesEquipo2
      )
        return { class: "fila-con-prediccion-correcta" };

      // Si acerto el resultado (pero no los goles)
      else if (
        toResultado(data.item.prediccion.golesEquipo1, data.item.prediccion.golesEquipo2) ==
        toResultado(data.item.golesEquipo1, data.item.golesEquipo2)
      )
        return { class: "fila-con-prediccion-acertada" };

      // Si se equivoco
      else return { class: "fila-con-prediccion-erronea" };
    } else {

      return { class: "fila-con-prediccion" };
    }
  } else {
    return "";
  }
}

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
        class="table-partidos" :row-props="fondoItem" :sort-by="[{ key: 'fecha' }]" mobile-breakpoint="md">

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

<style lang="css">
@import url('@/assets/css/tabla-predicciones.css');
</style>