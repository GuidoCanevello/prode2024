<script setup lang="ts">
const { usuarioNombreCuenta, usuarioPuntos, usuarioImagenSrc, hasData, isUserLogged } = storeToRefs(useUserStore());

const showUserConfig = ref(false);
function handleUserConfig() {
  showUserConfig.value = true;
};

const showLogin = ref(false);
function handleLogin() {
  showLogin.value = true;
};
</script>

<template>
  <v-card v-if="isUserLogged" :loading="!hasData" class="user-box-card" variant="outlined">
    <template v-if="showUserConfig">
      <v-dialog v-model="showUserConfig" width="500">
        <!-- <dialogo-user-data @cerrar="showConfig = false" /> -->
      </v-dialog>
    </template>

    <v-row>
      <v-col sm="auto" style="text-align: center">
        <v-container class="pa-3" @click="handleUserConfig">
          <v-badge bordered overlap style="cursor: pointer">
            <template v-if="hasData" v-slot:badge>
              <v-icon class="custom-icon">mdi-pencil</v-icon>
            </template>
            <v-avatar v-if="usuarioImagenSrc">
              <img :src="usuarioImagenSrc" alt="perfil" />
            </v-avatar>

            <v-avatar v-else color="blue lighten-1">
              {{ usuarioNombreCuenta.substring(0, 1) }}
            </v-avatar>
          </v-badge>
        </v-container>
      </v-col>

      <v-spacer />

      <v-col class="pl-0">
        <v-container class="py-3 pl-0">
          <v-list-item-title class="mb-0">
            {{ usuarioNombreCuenta }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Puntos: {{ usuarioPuntos }}
          </v-list-item-subtitle>
        </v-container>
      </v-col>
    </v-row>
  </v-card>

  <v-card v-else @click="handleLogin" class="user-box-card" variant="outlined">
    <template v-if="showLogin">
      <v-dialog v-model="showLogin" width="500">
        <!-- <dialogo-user-data @cerrar="showConfig = false" /> -->
        Dialogo Login
      </v-dialog>
    </template>

    <v-row>
      <v-col sm="auto" style="text-align: center">
        <v-container class="pa-3">
          <v-avatar color="secondary">
            <v-icon>mdi-login-variant</v-icon>
          </v-avatar>
        </v-container>
      </v-col>

      <v-col class="pl-0">
        <v-container class="pl-0" style="margin-top: 5px;">
          Login
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.custom-icon {
  color: white !important;
  font-size: 12px !important;
}

.user-box-card {
  height: 66px;
  width: 190px;
  background-color: rgb(var(--v-theme-primary));
}

.v-card--variant-outlined {
  border-color: rgb(var(--v-theme-primary-darken-1));
}
</style>
