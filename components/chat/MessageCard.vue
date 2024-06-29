<script setup lang="ts">
const props = defineProps(["mensaje"]);

const isMensajeUsuario = ref(false);
const color = ref("");

const userName = ref("");
const usuarioImagenSrc = ref("")

onUpdated(setData)
onMounted(setData)

function setData() {
  const chatUsuario = useChatStore().userColors.find(u => u.usuarioId == props.mensaje.usuarioId);
  const datosUsuario = useProdeStore().usuarios.find(u => chatUsuario?.usuarioId == u._id);

  if (chatUsuario != undefined && datosUsuario != undefined) {
    color.value = chatUsuario.color;
    isMensajeUsuario.value = chatUsuario.isUsuario;

    userName.value = datosUsuario.nombreJugador ?? "";
    usuarioImagenSrc.value = datosUsuario.imagenSrc ?? "";
  }
}
</script>

<template>
  <v-row>
    <!-- <v-spacer v-if="isMensajeUsuario" /> -->

    <!-- v-if="!isMensajeUsuario" -->
    <v-col class="avatar-col" cols="auto">
      <v-avatar v-if="usuarioImagenSrc">
        <v-img :src="usuarioImagenSrc" alt="img" />
      </v-avatar>

      <v-avatar v-else color="blue lighten-1">
        {{ userName.substring(0, 1) }}
      </v-avatar>
    </v-col>

    <v-col class="text-col" cols="auto">
      <v-card :style="`background-color: rgb(var(--v-theme-${color})) !important;`">
        <!-- {{ darFormatoFecha(new Date(mensaje.fecha ?? "")) }} - {{ mensaje.usuarioId }} - {{ mensaje.texto }} -->
        <v-card-title>
          <b>{{ userName }}</b>
        </v-card-title>
        {{ props.mensaje.texto }}
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