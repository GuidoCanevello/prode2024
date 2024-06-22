<script setup lang="ts">
const { nombreCuenta, nombreGrupo } = defineProps(["nombreCuenta", "nombreGrupo"]);
const store = useProdeStore();

const partidos = computed(() => {
  const partidos = store.partidos.filter(p => p.grupo == nombreGrupo);
  const equipos = store.equipos.filter(e => e.grupo == nombreGrupo);
  const predicciones = store.usuarios.find(u => u.nombreCuenta == nombreCuenta)
    ?.predicciones?.filter(p => partidos.some(partido => p.partidoId == partido._id))

  return partidos.map(partido => {
    const prediccion = predicciones?.find(p => p.partidoId == partido._id);

    return {
      equipos: `${equipos.find(e => e._id == partido.equipo1)?.nombre} vs. ${equipos.find(e => e._id == partido.equipo2)?.nombre}`,

      resultado: partido.seRealizo ? `${partido.golesEquipo1} - ${partido.golesEquipo2}` : "-",
      prediccion: prediccion != undefined ? `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}` : "Sin Predicción",
      fecha: partido.fecha,
      
      golesEquipo1: partido.golesEquipo1,
      golesEquipo2: partido.golesEquipo2,
      tienePrediccion: prediccion != undefined,
      golesPrediccionEquipo1: prediccion?.golesEquipo1,
      golesPrediccionEquipo2: prediccion?.golesEquipo2,
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