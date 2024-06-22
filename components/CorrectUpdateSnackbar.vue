<script setup lang="ts">
const { showSnackbar } = storeToRefs(useVisualStore());
</script>

<template>
    <v-snackbar v-model="showSnackbar" :timeout="2000" color="secondary" elevation="24">
        Actualización Correcta
    </v-snackbar>
</template>