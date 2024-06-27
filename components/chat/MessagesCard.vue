<script setup lang="ts">
const { msgPorFecha, hasData } = storeToRefs(useChatStore());

onUpdated(() => {
  useChatStore().dispatchGetInitialData();
})
</script>

<template>
  <v-card class="history-card" variant="outlined" :loading="hasData">
    {{ msgPorFecha }}
  </v-card>
</template>