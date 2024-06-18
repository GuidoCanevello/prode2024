<script setup lang="ts">

const nombreUsuario = ref("");
const apellidoUsuario = ref("");
const mailUsuario = ref("");
const passwordUsuario = computed(() => {
  if (nombreUsuario.value == "" || apellidoUsuario.value == "") return "-";

  return apellidoUsuario.value.trim().toLowerCase() +
    nombreUsuario.value.trim().toLowerCase() +
    Math.floor((Math.random() * 10000)).toString().padStart(4, "0");
})

const isLoadingChanges = ref(false);

async function handleGuardar() {
  if (nombreUsuario.value == "" || apellidoUsuario.value == "") {
    console.log("Ingrese nombre y apellido");
    return;
  }

  isLoadingChanges.value = true

  const nombreCuentaUsuario = nombreUsuario.value.trim().toUpperCase().substring(0, 1) + apellidoUsuario.value.trim().toUpperCase()

  const newUsuario = await useProdeStore().dispatchCreateUsuario(nombreCuentaUsuario, passwordUsuario.value);
  if (newUsuario != undefined) console.log("Usuario Creado Correctamente", newUsuario)

  isLoadingChanges.value = false
}

</script>

<template>
  <v-card>
    <v-card-title primary-title>
      Crear Usuario
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="nombreUsuario" label="Nombre del Usuario" variant="outlined" hide-details="auto"
            class="mb-5" />
        </v-col>

        <v-col>
          <v-text-field v-model="apellidoUsuario" label="Apellido del Usuario" variant="outlined" hide-details="auto"
            class="mb-5" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field v-model="mailUsuario" label="Mail del Usuario" variant="outlined" hide-details="auto"
            class="mb-5" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          Contraseña Generada: {{ passwordUsuario ?? "-" }}
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-spacer />

        <v-col class="pa-4" cols="auto">
          <v-btn color="success" variant="outlined" @click="handleGuardar" :loading="isLoadingChanges">
            Crear
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>