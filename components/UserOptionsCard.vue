<script lang="ts">

</script>

<template>
  <v-card>
    <!-- <v-card-title primary-title>
      {{ USUARIO_NOMBRE_CUENTA }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="initialPlayerName"
        label="Nombre del Jugador"
        variant="outlined"
        hide-details="auto"
        class="mb-5"
      />

      <v-row>
        <v-col sm="4" style="text-align: center">
          <v-row>
            <v-container> Imagen de Perfil </v-container>
          </v-row>
          <v-row>
            <v-container>
              <v-avatar v-if="initialImagenSrc" size="100">
                <img :src="initialImagenSrc" alt="perfil" />
              </v-avatar>

              <v-avatar v-else color="blue lighten-1" size="100">
                <span class="text-h4">
                  {{ initialPlayerName.substring(0, 1) }}
                </span>
              </v-avatar>
            </v-container>
          </v-row>
        </v-col>

        <v-col style="text-align: center">
          <v-responsive class="overflow-y-auto" min-height="100%">
            <v-row>
              <v-container> Seleccione una imagen nueva</v-container>
            </v-row>
            <v-row class="ma-0">
              <template v-for="imagen in imagenesPerfil">
                <v-col class="pa-1" v-bind:key="imagen.nombre">
                  <v-avatar v-if="imagen.src != ''" @click="handleChangePerfil">
                    <img :src="imagen.src" />
                  </v-avatar>

                  <v-avatar
                    v-else
                    color="blue lighten-1"
                    @click="handleChangePerfil"
                  >
                    {{ initialPlayerName.substring(0, 1) }}
                  </v-avatar>
                </v-col>
              </template>
            </v-row>
          </v-responsive>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="success"
        text
        @click="handleGuardar"
        :loading="isLoadingChanges"
      >
        Guardar
      </v-btn>
      <v-btn
        color="error"
        text
        @click="handleCerrar"
        :loading="isLoadingChanges"
      >
        Cerrar
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>
