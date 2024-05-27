<script setup lang="ts">
const props = defineProps(["nombre", "partidos"])
</script>

<template>
  <v-card outlined>
    <v-card-title primary-title>
      <v-row>
        <v-col> Partidos de Grupo {{ nombre }}</v-col>
        <!-- <v-col style="text-align: end">
          <v-btn color="success" :loading="loadingUpdatePredicciones" :disabled="loadingUpdatePredicciones"
            @click="saveChanges">
            Guardar Cambios
          </v-btn>
        </v-col> -->
      </v-row>
    </v-card-title>
  </v-card>
</template>