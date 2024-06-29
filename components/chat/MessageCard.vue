<script setup lang="ts">
import { formatoHora } from '../../utils/fecha';

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
    <v-spacer v-if="isMensajeUsuario" />

    <v-col v-if="!isMensajeUsuario" class="avatar-col" cols="auto">
      <v-avatar v-if="usuarioImagenSrc">
        <v-img :src="usuarioImagenSrc" alt="img" />
      </v-avatar>

      <v-avatar v-else color="blue lighten-1">
        {{ userName.substring(0, 1) }}
      </v-avatar>
    </v-col>

    <v-col class="text-col" cols="auto">
      <v-card :style="`background-color: rgb(var(--v-theme-${color})) !important;`">
        <v-card-title v-if="!isMensajeUsuario">
          <b>{{ userName }}</b>
        </v-card-title>
        <p :style="`text-align: ${isMensajeUsuario ? 'end' : 'start'};`">{{ props.mensaje.texto }}</p>
        <p class="hora-p" :style="`text-align: ${isMensajeUsuario ? 'start' : 'end'};`">{{ formatoHora(new Date(props.mensaje.fecha)) }}</p>
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

  .hora-p {
    font-size: 0.7rem;
    opacity: 0.6;
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