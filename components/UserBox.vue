<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { usuarioNombreCuenta, usuarioPuntos, usuarioImagenSrc, hasData } = storeToRefs(useUserStore());
const { isLogged } = storeToRefs(useAuthStore());
const { smAndUp } = useDisplay();

const showUserConfig = ref(false);
function handleUserConfig() {
  showLogin.value = false;
  showUserConfig.value = true;
};

const showLogin = ref(false);
function handleLogin() {
  showUserConfig.value = false;
  showLogin.value = true;
};
</script>

<template>
  <v-card v-if="isLogged" :loading="!hasData" class="user-box-card" variant="outlined" @click="handleUserConfig">
    <v-dialog v-model="showUserConfig" width="500">
      <user-data-card @onClose="showUserConfig = false" />
    </v-dialog>

    <v-row>
      <v-col sm="auto" style="text-align: center">
        <v-container class="pa-3">
          <v-avatar v-if="usuarioImagenSrc">
            <v-img :src="usuarioImagenSrc" alt="img" />
          </v-avatar>

          <v-avatar v-else color="blue lighten-1">
            {{ usuarioNombreCuenta.substring(0, 1) }}
          </v-avatar>
        </v-container>
      </v-col>

      <v-col v-if="smAndUp" class="pl-0">
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
    <v-dialog v-model="showLogin" width="500">
      <login-card @onClose="showLogin = false" />
    </v-dialog>

    <v-row>
      <v-col sm="auto" style="text-align: center">
        <v-container class="pa-3">
          <v-avatar color="secondary">
            <v-icon>mdi-login-variant</v-icon>
          </v-avatar>
        </v-container>
      </v-col>

      <v-col v-if="smAndUp" class="pl-0">
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
  width: 230px;
  background-color: rgb(var(--v-theme-primary));
}

@media (max-width: 600px) {
  .user-box-card {
    width: auto;
  }
}

.v-card--variant-outlined {
  border-color: rgb(var(--v-theme-primary-darken-1));
}
</style>
