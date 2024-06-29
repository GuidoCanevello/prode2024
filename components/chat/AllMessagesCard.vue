<script setup lang="ts">
const { msgPorFecha, hasData, isGettingData } = storeToRefs(useChatStore());

</script>

<template>
  <v-card class="history-card" variant="outlined" :loading="!hasData && isGettingData">
    <template v-for="fecha in msgPorFecha">
      <template v-for="mensaje in fecha.messages">
        <chat-message-card :mensaje="mensaje" />
      </template>
      {{ fecha.fecha }}
    </template>
  </v-card>
</template>