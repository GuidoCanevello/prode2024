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
    }
  })
})
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
            :sort-by="[{ key: 'fecha' }]" density="compact" mobile-breakpoint="sm">
            <!-- :item-class="fondoItem" -->
            <!-- TODO add fondo item, cuando vaya a probar predicciones -->

            <template #bottom />
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>