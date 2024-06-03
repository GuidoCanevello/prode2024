<script setup lang="ts">
const { dataRanking, isGettingInitialData, hasInitialData } = storeToRefs(useProdeStore());

const isLoadingUserData = computed(() => {
  return isGettingInitialData.value || !hasInitialData.value
})

function fondoItem(data: any) {
  let aClass: string;
  switch (data.item.posicion) {
    case 1:
      aClass = "fila-primero";
    case 2:
      aClass = "fila-segundo";
    case 3:
      aClass = "fila-tercero";
    default:
      aClass = "";
  }

  return { class: aClass }
}

const iconSize = ref(32)
</script>

<template>
  <v-card>
    <v-card-title primary-title style="word-break: break-word;"> Ranking </v-card-title>

    <v-card-text>
      <v-data-table :headers='[{
        value: "posicion",
        width: "1%",
        headerProps: {
          class: " d-none"
        },
        cellProps: {
          class: " d-none"
        }
      },
      {
        title: "Icono",
        align: "start",
        value: "iconoJugador",
        sortable: false,
        width: "1%",
      },
      {
        title: "Nombre",
        align: "start",
        value: "nombreJugador",
      },
      {
        title: "Puntos",
        align: "end",
        value: "puntos",
        sortable: false,
      }]' :items="dataRanking" item-key="id" :items-per-page="5" :loading="isLoadingUserData"
        loading-text="Cargando Jugadores..." :sort-by="[{ key: 'posicion' }]" class="table-ranking"
        :mobile-breakpoint="0" :row-props="fondoItem">
        <!-- @click:row="handleSelectRow" -->

        <template v-slot:[`item.iconoJugador`]="{ item }">
          <v-avatar v-if="item.iconoJugador != ''" :size="iconSize">
            <img :src="item.iconoJugador" />
          </v-avatar>

          <v-avatar v-else color="blue lighten-1" :size="iconSize">
            {{ item.nombreJugador.substring(0, 1) }}
          </v-avatar>
        </template>

        <template #bottom />
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style>
.table-ranking {
  .fila-primero {
    background-color: rgb(var(--v-theme-background));
  }

  .fila-primero:hover {
    cursor: pointer;
    background-color: #ffee58 !important;
  }

  .fila-segundo {
    background-color: #cfd8dc;
  }

  .fila-segundo:hover {
    cursor: pointer;
    background-color: #90a4ae !important;
  }

  .fila-tercero {
    background-color: #ffe0b2;
  }

  .fila-tercero:hover {
    cursor: pointer;
    background-color: #ffb74d !important;
  }

  /* TODO add hover a las que son de 4to para abajo */
}

.table-ranking:hover {
  cursor: pointer;
}
</style>