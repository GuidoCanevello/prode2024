<script setup lang="ts">
const { isLogged, isDoingLogin } = storeToRefs(useAuthStore())
</script>

<template>
  <v-container v-if="!isLogged && !isDoingLogin">
    <v-card>
      <v-card-title primary-title>
        Debe Loguearse para poder Enviar Mensajes.
      </v-card-title>
    </v-card>
  </v-container>

  <v-container v-else-if="!isLogged && isDoingLogin">
    <LoadingCard />
  </v-container>

  <v-container v-else style="height: 100%; display: flex;">
    <ChatCard />
  </v-container>
</template>
