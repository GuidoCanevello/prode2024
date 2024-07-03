<script setup lang="ts">
const { nombreCuenta } = defineProps(["nombreCuenta"])

const { hasData, usuarios } = storeToRefs(useProdeStore());
const { isAdmin } = storeToRefs(useUserStore());

const iconSize = ref(64);

const tab = ref("");

const currentUsuario = computed(() => {
  return usuarios.value.find(u => u.nombreCuenta == nombreCuenta);
})
</script>

<template>
  <v-card v-if="currentUsuario != undefined">
    <v-card-title>
      <v-container class="pb-0">
        <v-row>
          <v-col cols="auto">
            <v-avatar v-if="currentUsuario.imagenSrc != undefined" :size="iconSize">
              <v-img :src="currentUsuario.imagenSrc" />
            </v-avatar>

            <v-avatar v-else color="blue lighten-1" :size="iconSize">
              {{ (currentUsuario.nombreJugador ?? (currentUsuario.nombreCuenta ?? "")).substring(0, 1) }}
            </v-avatar>
          </v-col>

          <v-col cols="auto">
            <v-row>
              <v-col>
                <b>Datos del Usuario:</b> {{ currentUsuario.nombreJugador }}
              </v-col>
            </v-row>

            <v-row v-if="isAdmin">
              <v-col>
                <b>Nombre de Cuenta:</b> {{ currentUsuario.nombreCuenta }}
              </v-col>
            </v-row>
          </v-col>

          <v-spacer />

          <v-col cols="auto">
            <b>Puntos:</b> {{ currentUsuario.puntos }}
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>

    <v-card-text class="px-4 py-2">
      <v-container>
        <v-row>
          <v-col>
            <template v-if="hasData">
              <v-tabs v-model="tab">
                <v-tab v-for="nombreGrupo in ['A', 'B', 'C', 'D']">
                  <h3>
                    Grupo {{ nombreGrupo }}
                  </h3>
                </v-tab>

                <v-tab>
                  <h3>
                    Fase Final
                  </h3>
                </v-tab>

                <!-- <v-tab>
                                <h3>Mejores Jugadores</h3>
                            </v-tab> -->
                <!-- <v-tab-item>
                                <perfil-mejores-jugadores :mejorJugadorId="mejorJugadorId" :mejorArqueroId="mejorArqueroId"
                                    :mejorGoleadorId="mejorGoleadorId" />
                            </v-tab-item> -->
              </v-tabs>

              <v-tabs-window v-model="tab">
                <v-tabs-window-item v-for="nombreGrupo in ['A', 'B', 'C', 'D']" :value="nombreGrupo">
                  <home-ranking-perfil-grupo-card :nombreCuenta="nombreCuenta" :nombreGrupo="nombreGrupo" />
                </v-tabs-window-item>

                <v-tabs-window-item>
                  <home-ranking-perfil-fase-final-card :nombreCuenta="nombreCuenta" />
                </v-tabs-window-item>
              </v-tabs-window>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>

  <v-card v-else>
    <v-card-title primary-title> Sin Usuario Seleccionado </v-card-title>
  </v-card>
</template>