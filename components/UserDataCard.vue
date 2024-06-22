<script setup lang="ts">
import imagenesPerfil from '@/assets/consts/imagenesPerfil.consts';
const emit = defineEmits(['onClose'])

const { usuarioNombreCuenta, usuarioNombreJugador, usuarioImagenSrc, usuarioPuntos } = storeToRefs(useUserStore());

const isLoadingChanges = ref(false);
const internalPlayerName = ref(usuarioNombreJugador.value)
const internalImagenSrc = ref(usuarioImagenSrc.value)

function handleChangePerfil(a: any) {
  internalImagenSrc.value = a.target.src ? a.target.src : "";
}

function handleGuardar() {
  if (
    internalPlayerName.value != usuarioNombreJugador.value ||
    internalImagenSrc.value != usuarioImagenSrc.value
  ) {
    isLoadingChanges.value = true;

    useUserStore()
      .updateDatosUsuario(internalPlayerName.value, internalImagenSrc.value)
      .finally(() => {
        isLoadingChanges.value = false;
        emit('onClose');
      });
  } else {
    emit('onClose');
  }
}

function handleLogout() {
  isLoadingChanges.value = true;
  useAuthStore().dispatchLogout().then(() => {
    isLoadingChanges.value = false;
    emit('onClose');
  });

}
</script>

<template>
  <v-card class="user-options-card">
    <v-container>
      <v-card-title>
        Datos del Usuario - {{ usuarioNombreCuenta }}
      </v-card-title>

      <v-card-subtitle>
        Puntos: {{ usuarioPuntos }}
      </v-card-subtitle>

      <v-card-text>
        <v-text-field v-model="internalPlayerName" label="Nombre del Jugador" variant="outlined" hide-details="auto"
          class="mb-5" />

        <v-row>
          <v-col cols="4" style="text-align: center">
            <v-row>
              <v-container> Imagen de Perfil </v-container>
            </v-row>

            <v-row>
              <v-container>
                <v-avatar v-if="internalImagenSrc" size="100">
                  <v-img :src="internalImagenSrc" alt="img" />
                </v-avatar>

                <v-avatar v-else color="blue lighten-1" size="100">
                  <span class="text-h4">
                    {{ internalPlayerName.substring(0, 1) }}
                  </span>
                </v-avatar>
              </v-container>
            </v-row>
          </v-col>

          <v-col style="text-align: center">
            <v-responsive class="overflow-y-auto" min-height="100%">
              <v-row>
                <v-container> Seleccione una imagen nueva</v-container>
              </v-row>
              <v-row class="ma-0">
                <template v-for="imagen in imagenesPerfil" v-bind:key="imagen.nombre">
                  <v-col class="pa-1">
                    <v-avatar v-if="imagen.src != ''" @click="handleChangePerfil">
                      <v-img :src="imagen.src" alt="img" />
                    </v-avatar>

                    <v-avatar v-else color="blue lighten-1" @click="handleChangePerfil">
                      {{ internalPlayerName.substring(0, 1) }}
                    </v-avatar>
                  </v-col>
                </template>
              </v-row>
            </v-responsive>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col class="ml-2" cols="auto">
          <v-btn color="warn" variant="outlined" @click="handleLogout" :loading="isLoadingChanges">
            Cerrar Sesion
          </v-btn>
        </v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-btn color="error" variant="outlined" @click="$emit('onClose')" :loading="isLoadingChanges">
              Cerrar
            </v-btn>
          </v-col>

          <v-col class="mr-2" cols="auto">
            <v-btn color="success" variant="outlined" @click="handleGuardar" :loading="isLoadingChanges">
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<style scoped>
.user-options-card>.v-card-actions>.v-row>.v-col {
  padding-inline: 8px;
}
</style>
