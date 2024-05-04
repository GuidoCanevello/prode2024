<script setup lang="ts">
let data: any = ref(undefined);
try {
  data.value = (await useFetch('/api/equipos')).data;
} catch (error) {
  console.log("Error", error)
  data.value = error
}

let a = ref("s");

let onClick = () => {
  a.value += "d"
}
</script>

<template>
  <v-app>
    <v-card>
      {{ a }}
      {{ data }}
      <v-btn color="success" @click="onClick">Hola</v-btn>
    </v-card>
  </v-app>
</template>
