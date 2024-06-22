<script setup lang="ts">
const { dataRanking, isGettingData: isGettingInitialData, hasData: hasInitialData } = storeToRefs(useProdeStore());

const page = ref(1);
const itemsPerPage = ref(5);
const iconSize = ref(32);

const pageCount = computed(() => {
  return Math.ceil(dataRanking.value.length / itemsPerPage.value);
})

const isLoadingUserData = computed(() => {
  return isGettingInitialData.value || !hasInitialData.value
})

function fondoItem(data: any) {
  if (data.item.puntos == 0) return { class: "fila-cuarto" };

  switch (data.item.posicion) {
    case 1:
      return { class: "fila-primero" }
    case 2:
      return { class: "fila-segundo" }
    case 3:
      return { class: "fila-tercero" }
    default:
      return { class: "fila-cuarto" }
  }
}

const selectedUserNombreCuenta = ref(null);
const showProfile = ref(false);

function handleClickRow(event: any, row: any) {
  selectedUserNombreCuenta.value = row.item.nombreCuenta
  showProfile.value = true
}
</script>

<template>
  <v-card>
    <v-dialog v-if="selectedUserNombreCuenta != null" v-model="showProfile" width="1000px"
      @click:outside="selectedUserNombreCuenta = null">
      <home-ranking-perfil-card :nombreCuenta="selectedUserNombreCuenta" />
    </v-dialog>

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
      }]' :items="dataRanking" item-key="id" v-model:page="page" :items-per-page="itemsPerPage"
        :loading="isLoadingUserData" loading-text="Cargando Usuarios..." :sort-by="[{ key: 'posicion' }]"
        mobile-breakpoint="sm" class="table-ranking" :row-props="fondoItem" @click:row="handleClickRow">

        <template v-slot:[`item.iconoJugador`]="{ item }">
          <v-avatar v-if="item.iconoJugador != ''" :size="iconSize">
            <v-img :src="item.iconoJugador" />
          </v-avatar>

          <v-avatar v-else color="blue lighten-1" :size="iconSize">
            {{ item.nombreJugador.substring(0, 1) }}
          </v-avatar>
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
.table-ranking {
  .fila-primero {
    background-color: rgb(var(--v-theme-data-ranking-first));
  }

  .fila-primero:hover {
    cursor: pointer;
    background-color: rgb(var(--v-theme-data-ranking-first-hover)) !important;
  }

  .fila-segundo {
    background-color: rgb(var(--v-theme-data-ranking-second));
  }

  .fila-segundo:hover {
    cursor: pointer;
    background-color: rgb(var(--v-theme-data-ranking-second-hover)) !important;
  }

  .fila-tercero {
    background-color: rgb(var(--v-theme-data-ranking-third));
  }

  .fila-tercero:hover {
    cursor: pointer;
    background-color: rgb(var(--v-theme-data-ranking-third-hover)) !important;
  }

  .fila-cuarto:hover {
    cursor: pointer;
    background-color: rgb(var(--v-theme-data-ranking-fourth-hover)) !important;
  }
}
</style>