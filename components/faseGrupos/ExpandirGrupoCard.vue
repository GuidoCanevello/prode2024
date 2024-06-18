<script setup lang="ts">
import BanderaImg from '../BanderaImg.vue';
const { isLogged } = storeToRefs(useAuthStore());

const props = defineProps(["nombre", "equipos", "partidos"])

interface IDataTableGrupo {
  id: TMongoID,
  code: string,
  nombre: string,
  puntos: number,
  jugados: number,
  ganados: number,
  perdidos: number,
  empatados: number,
  golesFavor: number,
  golesContra: number,
  diferenciaGoles: number,
}

//* Data Table Pronosticos
const dataPronosticos = ref<IDataTableGrupo[]>([]);

//* Data Table Reales
const dataReales = ref<IDataTableGrupo[]>([]);


const setTablePronosticos = () => {
  dataPronosticos.value = [];

  props.equipos.forEach((equipo: NProdeStore.FaseGrupos.IEquipo) =>
    dataPronosticos.value.push({
      id: equipo.id,
      code: equipo.code,
      nombre: equipo.nombre,
      jugados: 0,
      puntos: 0,
      ganados: 0,
      perdidos: 0,
      empatados: 0,
      golesFavor: 0,
      golesContra: 0,
      diferenciaGoles: 0,
    }));

  props.partidos.forEach((partido: NProdeStore.FaseGrupos.IPartido) => {
    const equipo1 = dataPronosticos.value.find(
      (e) => e.nombre == partido.equipo1
    );
    const equipo2 = dataPronosticos.value.find(
      (e) => e.nombre == partido.equipo2
    );
    if (partido.tienePrediccion && partido.prediccion != undefined && equipo1 != undefined && equipo2 != undefined) {
      equipo1.golesFavor += partido.prediccion.golesEquipo1;
      equipo1.golesContra += partido.prediccion.golesEquipo2;

      equipo2.golesFavor += partido.prediccion.golesEquipo2;
      equipo2.golesContra += partido.prediccion.golesEquipo1;

      equipo1.diferenciaGoles +=
        partido.prediccion.golesEquipo1 - partido.prediccion.golesEquipo2;
      equipo2.diferenciaGoles +=
        partido.prediccion.golesEquipo2 - partido.prediccion.golesEquipo1;

      if (
        partido.prediccion.golesEquipo1 > partido.prediccion.golesEquipo2
      ) {
        equipo1.puntos += 3;

        equipo1.ganados += 1;
        equipo2.perdidos += 1;
      } else if (
        partido.prediccion.golesEquipo2 > partido.prediccion.golesEquipo1
      ) {
        equipo2.puntos += 3;

        equipo2.ganados += 1;
        equipo1.perdidos += 1;
      } else {
        equipo1.puntos += 1;
        equipo2.puntos += 1;

        equipo1.empatados += 1;
        equipo2.empatados += 1;
      }
    }
  });
}

const setTableReales = () => {
  dataReales.value = [];

  props.equipos.forEach((equipo: NProdeStore.FaseGrupos.IEquipo) =>
    dataReales.value.push({
      id: equipo.id,
      code: equipo.code,
      nombre: equipo.nombre,
      puntos: equipo.puntos,
      jugados: 0,
      ganados: 0,
      perdidos: 0,
      empatados: 0,
      golesFavor: 0,
      golesContra: 0,
      diferenciaGoles: 0,
    }));

  props.partidos.forEach((partido: NProdeStore.FaseGrupos.IPartido) => {
    let equipo1 = dataReales.value.find((e) => e.nombre == partido.equipo1);
    let equipo2 = dataReales.value.find((e) => e.nombre == partido.equipo2);

    if (equipo1 != undefined && equipo2 != undefined) {
      if (partido.fecha < new Date()) {
        equipo1.jugados += 1;
        equipo2.jugados += 1;
      }

      if (partido.golesEquipo1 != undefined && partido.golesEquipo2 != undefined) {
        equipo1.golesFavor += partido.golesEquipo1;
        equipo1.golesContra += partido.golesEquipo2;

        equipo2.golesFavor += partido.golesEquipo2;
        equipo2.golesContra += partido.golesEquipo1;

        equipo1.diferenciaGoles +=
          partido.golesEquipo1 - partido.golesEquipo2;
        equipo2.diferenciaGoles +=
          partido.golesEquipo2 - partido.golesEquipo1;

        if (partido.golesEquipo1 > partido.golesEquipo2) {
          equipo1.ganados += 1;
          equipo2.perdidos += 1;
        } else if (partido.golesEquipo2 > partido.golesEquipo1) {
          equipo2.ganados += 1;
          equipo1.perdidos += 1;
        } else {
          equipo1.empatados += 1;
          equipo2.empatados += 1;
        }
      }
    }
  });
}

onMounted(() => {
  setTablePronosticos();
  setTableReales();
})
</script>

<template>
  <v-card>
    <v-card-title primary-title> Grupo: {{ nombre }} </v-card-title>

    <v-card-text>
      <v-row>
        <v-col v-if="isLogged" cols="12" lg="6">
          <h3 style="text-align: center">Resultados con Pronósticos</h3>
          <v-data-table :headers='[
            {
              align: "start",
              sortable: false,
              value: "bandera",
            },
            {
              title: "Nombre",
              sortable: false,
              value: "nombre",
            },
            {
              title: "PG",
              sortable: false,
              value: "ganados",
            },
            {
              title: "PE",
              sortable: false,
              value: "empatados",
            },
            {
              title: "PP",
              sortable: false,
              value: "perdidos",
            },
            {
              title: "GF",
              sortable: false,
              value: "golesFavor",
            },
            {
              title: "GC",
              sortable: false,
              value: "golesContra",
            },
            {
              title: "DG",
              sortable: false,
              value: "diferenciaGoles",
            },
            {
              title: "PTS",
              sortable: false,
              align: "end",
              value: "puntos",
              cellProps: {
                class: "font-weight-bold"
              }
            },
          ]' :items="dataPronosticos" item-key="id" class="table-pronosticos" :item-class="() => 'fila-prediccion'"
            :sort-by="[{ key: 'puntos', order: 'desc' }]" :sort-desc="false">
            <template v-slot:[`item.bandera`]="{ item }">
              <!-- REVIEW ver cuando tenga responsive -->
              <!-- :class="$vuetify.breakpoint.name != 'xs' ? 'text-start' : 'text-end'" -->
              <td class="text-start" style="width: 30px">
                <BanderaImg :code="item.code" />
              </td>
            </template>

            <template v-slot:[`item.puntos`]="{ item }">
              {{ item.puntos }}
            </template>

            <template #bottom />
          </v-data-table>
        </v-col>

        <v-col cols="12" :lg="isLogged ? 6 : undefined">
          <h3 style="text-align: center">Resultados Reales</h3>
          <v-data-table :headers='[
            {
              align: "start",
              sortable: false,
              value: "bandera",
            },
            {
              title: "Nombre",
              sortable: false,
              value: "nombre",
            },
            {
              title: "PJ",
              sortable: false,
              value: "jugados",
            },
            {
              title: "PG",
              sortable: false,
              value: "ganados",
            },
            {
              title: "PE",
              sortable: false,
              value: "empatados",
            },
            {
              title: "PP",
              sortable: false,
              value: "perdidos",
            },
            {
              title: "GF",
              sortable: false,
              value: "golesFavor",
            },
            {
              title: "GC",
              sortable: false,
              value: "golesContra",
            },
            {
              title: "DG",
              sortable: false,
              value: "diferenciaGoles",
            },
            {
              title: "PTS",
              sortable: false,
              align: "end",
              value: "puntos",
              cellProps: {
                class: "font-weight-bold"
              }
            },
          ]' :items="dataReales" item-key="id" :sort-by="[{ key: 'puntos', order: 'desc' }]">
            <template v-slot:[`item.bandera`]="{ item }">
              <!-- REVIEW ver cuando tenga responsive -->
              <!-- :class="$vuetify.breakpoint.name != 'xs' ? 'text-start' : 'text-end'" -->
              <td class="text-start" style="width: 30px">
                <BanderaImg :code="item.code" />
              </td>
            </template>

            <template v-slot:[`item.puntos`]="{ item }">
              {{ item.puntos }}
            </template>

            <template #bottom />
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.fila-prediccion {
  background-color: #e1f5fe;
}

.table-pronosticos .fila-prediccion:hover {
  background-color: #b3e5fc !important;
}
</style>