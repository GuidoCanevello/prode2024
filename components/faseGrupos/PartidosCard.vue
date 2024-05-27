<script setup lang="ts">
const props = defineProps(["nombre", "partidos"]);

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
  golesPrediccionEquipo1: number | undefined,
  golesPrediccionEquipo2: number | undefined,
  tienePrediccion: boolean,
  fecha: Date,
}[]>([]);

onMounted(() => {
  dataPartidos.value = [];

  props.partidos.forEach((partido: NProdeStore.FaseGrupos.IPartido) => {
    let newPartido = {
      partidoId: partido.partidoId,
      equipo1: partido.equipo1,
      code1: partido.code1,
      equipo2: partido.equipo2,
      code2: partido.code2,
      guion:
        partido.golesEquipo1 != undefined && partido.golesEquipo2 != undefined
          ? `${partido.golesEquipo1} - ${partido.golesEquipo2}`
          : "N - N",
      golesEquipo1: partido.golesEquipo1,
      golesEquipo2: partido.golesEquipo2,
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
        },
        {
          align: "center",
          sortable: false,
          value: "golesPrediccionEquipo1",
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
        },
        {
          title: "Equipo 2",
          sortable: false,
          align: "end",
          value: "equipo2",
        },
        {
          align: "end",
          value: "fecha",
          headerProps: {
            class: " d-none"
          },
          cellProps: {
            class: " d-none"
          }
        },
      ]' :items="dataPartidos" item-key="id" hide-default-footer class="table-partidos" :sort-by="[{ key: 'fecha' }]">
        <!-- density="compact" -->
        <!-- :item-class="fondoItem" -->

        <template v-slot:[`item.equipo1`]="{ item }">
          <td style="width: 160px">
            <v-row>
              <v-col class="pr-0" cols="auto">
                <BanderaImg :code="item.code1" />
              </v-col>
              <v-col>
                {{ item.equipo1 }}
              </v-col>
            </v-row>
          </td>
        </template>

        <template v-slot:[`item.golesPrediccionEquipo1`]="{ item }">
          <td class="px-0" style="width: 120px">
            <v-text-field :outlined="item.isHabilitado" :filled="!item.isHabilitado" dense hide-details="auto"
              :disabled="!item.isHabilitado" v-model="item.golesPrediccionEquipo1"
              :placeholder="item.isHabilitado ? 'Ej: 0' : 'X'" />
          </td>
        </template>

        <template v-slot:[`item.golesPrediccionEquipo2`]="{ item }">
          <td class="px-0" style="width: 120px">
            <v-text-field :outlined="item.isHabilitado" :filled="!item.isHabilitado" dense hide-details="auto"
              class="input-goles-2" :disabled="!item.isHabilitado" v-model="item.golesPrediccionEquipo2"
              :placeholder="item.isHabilitado ? 'Ej: 0' : 'X'" />
          </td>
        </template>

        <template v-slot:[`item.equipo2`]="{ item }">
          <td style="width: 160px">
            <v-row>
              <v-col style="text-align: end">
                {{ item.equipo2 }}
              </v-col>
              <v-col class="pl-0" cols="auto" style="text-align: end">
                <BanderaImg :code="item.code2" />
              </v-col>
            </v-row>
          </td>
        </template>

        <template #bottom />
      </v-data-table>
    </v-card-text>
  </v-card>
</template>