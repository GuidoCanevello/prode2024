<script setup lang="ts">
const router = useRouter()

const handleVerReglamento = () => {
  router.push('/reglamento')
}
</script>

<template>
  <v-card>
    <v-card-title primary-title style="word-break: break-word;"> ¿No sabes por donde empezar? </v-card-title>

    <v-card-text class="pb-0">
      Ingresa con tu Usuario y lee el Reglamento!
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-col cols="auto">
        <v-btn class="pl-3" @click="handleVerReglamento" prepend-icon="mdi-book-open-page-variant-outline"
          variant="outlined" color="success">
          Ver Reglamento
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
