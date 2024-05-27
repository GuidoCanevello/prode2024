<script setup lang="ts">
const props = defineProps(["nombre", "equipos", "partidos"])

const onExpandirGrupo = () => {
  // dialogGrupo = true;
  console.log("Expandir Grupo")
}
</script>

<template>
  <v-card outlined>
    <!-- TODO add -->
    <!-- <v-dialog v-model="dialogGrupo">
      <carta-grupo-expandido
        v-if="dialogGrupo"
        :nombre="nombre"
        :equipos="equipos"
        v-bind:partidos="partidos"
      />
    </v-dialog> -->

    <v-card-title primary-title>
      <v-row>
        <v-col> Grupo {{ nombre }} </v-col>
        <v-col style="text-align: end">
          <v-btn color="info" @click="onExpandirGrupo"> Expandir </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-spacer />

    <v-card-text>
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
          title: "Puntos",
          sortable: false,
          align: "end",
          value: "puntos",
        },
      ]' :items="equipos" item-key="id" :mobile-breakpoint="0" :sort-by="[{ key: 'puntos', order: 'desc' }]">
        <template v-slot:[`item.bandera`]="{ item }">
          <td class="text-start" style="width: 30px">
            <BanderaImg :code="(item as any).code" />
          </td>
        </template>
        <template #bottom />
      </v-data-table>
    </v-card-text>
  </v-card>
</template>