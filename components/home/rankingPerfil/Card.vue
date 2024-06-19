<script setup lang="ts">
const { nombreCuenta } = defineProps(["nombreCuenta"])

const { hasData, usuarios } = storeToRefs(useProdeStore());

const tab = ref("");

const currentUsuario = computed(() => {
    return usuarios.value.find(u => u.nombreCuenta == nombreCuenta);
})

const isMounted = ref(false);
</script>

<template>
    <v-card v-if="currentUsuario != undefined">
        <v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="auto">
                        <b>Datos del Usuario:</b> {{ currentUsuario.nombreJugador }}
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

                                <!-- <v-tab>
                                <h3>Mejores Jugadores</h3>
                            </v-tab> -->
                                <!-- <v-tab-item>
                                <perfil-mejores-jugadores :mejorJugadorId="mejorJugadorId" :mejorArqueroId="mejorArqueroId"
                                    :mejorGoleadorId="mejorGoleadorId" />
                            </v-tab-item> -->

                                <!-- <v-tab>
                                <h3>Fase Final</h3>
                            </v-tab> -->
                                <!-- <v-tab-item>
                                <perfil-fase-final v-if="IS_SCREEN_BEYOND_MEDIUM" :predicciones="prediccionesFaseFinal" />
                                <perfil-fase-final-small v-else :predicciones="prediccionesFaseFinal" />
                            </v-tab-item> -->
                            </v-tabs>

                            <v-tabs-window v-model="tab">
                                <v-tabs-window-item v-for="nombreGrupo in ['A', 'B', 'C', 'D']" :value="nombreGrupo">
                                    <home-ranking-perfil-grupo-card :nombreCuenta="nombreCuenta"
                                        :nombreGrupo="nombreGrupo" />
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