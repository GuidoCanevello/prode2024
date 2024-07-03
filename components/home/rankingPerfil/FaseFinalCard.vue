<script setup lang="ts">
const { nombreCuenta } = defineProps(["nombreCuenta"]);
const store = useProdeStore();
const { isAdmin } = storeToRefs(useUserStore());

const partidos = computed(() => {
  const partidos = store.partidos.filter(p => p.esEliminatoria != undefined && p.esEliminatoria);
  const equipos = store.equipos;
  const predicciones = store.usuarios.find(u => u.nombreCuenta == nombreCuenta)
    ?.predicciones?.filter(p => partidos.some(partido => p.partidoId == partido._id))

  return partidos.map(partido => {
    const prediccion = predicciones?.find(p => p.partidoId == partido._id);

    return {
      equipos: `${partido.identificadorEliminatorias} - ${getEquipoName(partido, 1)} vs. ${getEquipoName(partido, 2)}`,

      resultado: partido.seRealizo ?
        `${partido.golesEquipo1} ${partido.penalesEquipo1 != undefined ? `(${partido.penalesEquipo1})` : ""} - ${partido.golesEquipo2} ${partido.penalesEquipo2 != undefined ? `(${partido.penalesEquipo2})` : ""}` :
        "-",
      prediccion: prediccion != undefined ? `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}` : "Sin Predicción",
      fecha: partido.fecha,

      golesEquipo1: partido.golesEquipo1,
      golesEquipo2: partido.golesEquipo2,
      penalesEquipo1: partido.penalesEquipo1,
      penalesEquipo2: partido.penalesEquipo2,
      tienePrediccion: prediccion != undefined,
      golesPrediccionEquipo1: prediccion?.golesEquipo1,
      golesPrediccionEquipo2: prediccion?.golesEquipo2,

      prediccionPuntos: isAdmin.value ? (prediccion?.puntos ?? "-") : undefined,
    }
  })
})

function fondoItem(data: any) {
  // Si tiene Prediccion
  if (data.item.tienePrediccion) {
    // Si ya ocurrio el Partido y los goles se cargaron
    if (new Date(data.item.fecha) < new Date() && data.item.golesEquipo1 != undefined && data.item.golesEquipo2 != undefined) {
      // Si acerto la prediccion exactamente
      if (
        data.item.golesEquipo1 == data.item.golesPrediccionEquipo1 &&
        data.item.golesEquipo2 == data.item.golesPrediccionEquipo2
      )
        return { class: "fila-con-prediccion-correcta" };

      // Si acerto el resultado (pero no los goles)
      else if (
        toResultado(data.item.golesPrediccionEquipo1, data.item.golesPrediccionEquipo2) ==
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

function getEquipoName(partido: IPartido, valor: 1 | 2) {
  const tipoEliminatoriaInicio: TTipoEliminatoria = "Cuartos";
  const equipoId = valor == 1 ? partido.equipo1 : partido.equipo2;

  if (equipoId != undefined) {
    const equipo = store.equipos.find(e => e._id == (valor == 1 ? partido.equipo1 : partido.equipo2));

    return equipo != undefined ?
      equipo.nombre : "";
  } else {
    return (partido.tipoEliminatoria == "Tercero" ? "Perdedor" : "Ganador") +
      " de " +
      (partido.tipoEliminatoria == tipoEliminatoriaInicio ?
        "-" :
        useProdeStore().partidos.find(p => p._id == (valor == 1 ? partido.partidoEquipo1 : partido.partidoEquipo2))?.identificadorEliminatorias);
  }

}
</script>

<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table :headers='[
            {
              title: "Partido",
              align: "start",
              key: "equipos",
              sortable: false,
            },
            {
              title: "Resultado Real",
              align: "start",
              value: "resultado",
              sortable: false,
            },
            {
              title: "Predicción",
              align: "start",
              value: "prediccion",
              sortable: false,
            },
            {
              title: "Puntos",
              align: "start",
              value: "prediccionPuntos",
              sortable: false,
              headerProps: !isAdmin ? {
                class: " d-none"
              } : undefined,
              cellProps: !isAdmin ? {
                class: " d-none"
              } : undefined
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
          ]' :items="partidos" item-key="partidoId" item-value="partidoId" class="table-partidos"
            :row-props="fondoItem" :sort-by="[{ key: 'fecha' }]" density="compact" mobile-breakpoint="sm">

            <template #bottom />
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style lang="css">
@import url('@/assets/css/tabla-predicciones.css');
</style>