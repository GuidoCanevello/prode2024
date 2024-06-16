<script setup lang="ts">
defineProps(["nombre", "equipos", "partidos"]);

const { isUserLogged } = storeToRefs(useUserStore());

const showDialogGrupoExpandido = ref(false)

const onExpandirGrupo = () => {
  showDialogGrupoExpandido.value = true;
}
</script>

<template>
  <v-card variant="outlined">
    <v-dialog v-model="showDialogGrupoExpandido" :max-width="!isUserLogged ? 1000 : undefined">
      <FaseGruposExpandirGrupoCard
        v-if="showDialogGrupoExpandido"
        :nombre="nombre"
        :equipos="equipos"
        v-bind:partidos="partidos"
      />
    </v-dialog>

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