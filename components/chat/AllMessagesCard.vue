<script setup lang="ts">
import { formatoFecha } from '~/utils/fecha';

const { msgPorFecha, hasData, isGettingData } = storeToRefs(useChatStore());

</script>

<template>
  <v-card class="history-card" variant="outlined" :loading="!hasData && isGettingData">
    <template v-for="fecha in msgPorFecha">
      <template v-for="mensaje in fecha.messages">
        <chat-message-card :mensaje="mensaje" />
      </template>

      <v-row class="pa-0">
        <v-spacer />

        <v-col class="py-0" cols="auto">
          -- {{ formatoFecha(new Date(fecha.fecha)) }} --
        </v-col>

        <v-spacer />
      </v-row>
    </template>
  </v-card>
</template>