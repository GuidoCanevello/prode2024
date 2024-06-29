<script setup lang="ts">
const { mensaje } = defineProps<{
  mensaje: IChatMessage,
}>();
const { userColors } = storeToRefs(useChatStore())

const isMensajeUsuario = ref(false);
const color = ref("");

const userName = ref("");

onUpdated(setData)
onMounted(setData)

function setData() {
  console.log("set Data", mensaje._id)
  const user = useChatStore().userColors.find(u => u.usuarioId == mensaje.usuarioId);

  if (user != undefined) {
    color.value = user.color;
    isMensajeUsuario.value = user.isUsuario;

    userName.value = useProdeStore().usuarios.find(u => user.usuarioId == u._id)?.nombreJugador ?? ""
  }
}
</script>

<template>
  <v-row>
    <!-- <v-spacer v-if="isMensajeUsuario" /> -->

    <!-- v-if="!isMensajeUsuario" -->
    <v-col class="avatar-col" cols="auto">
      <v-avatar v-slot color="blue lighten-1">
        s
      </v-avatar>
    </v-col>

    <v-col class="text-col" cols="auto">
      <v-card :style="`background-color: rgb(var(--v-theme-${color})) !important;`">
        <!-- {{ darFormatoFecha(new Date(mensaje.fecha ?? "")) }} - {{ mensaje.usuarioId }} - {{ mensaje.texto }} -->
        <v-card-title>
          <b>{{ userName }}</b>
        </v-card-title>
        {{ mensaje.texto }} {{ mensaje.usuarioId }}
      </v-card>
    </v-col>

    <v-spacer v-if="!isMensajeUsuario" />
  </v-row>
</template>

<style scoped>
.v-row {
  margin-top: 8px;
}

.v-card {
  min-height: 50px;
  padding: 8px;

  .v-card-title {
    padding: 0px;
    font-size: 1rem;
  }
}

.avatar-col {
  padding-right: 0%;
}

.text-col {
  min-width: 40px;
  max-width: 60vw;
}

@media (max-width: 600px) {
  .text-col {
    min-width: 40px;
    max-width: 55vw;
  }
}
</style>