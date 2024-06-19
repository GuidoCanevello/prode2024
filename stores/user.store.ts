import { defineStore } from 'pinia';
import updatePrediccion from './userStoreFunctions/actions/updatePrediccion';

export const useUserStore = defineStore('userStore', {
    state: (): NUserStore.IStoreState => ({
        usuarioId: "",
        usuarioNombreCuenta: "",
        usuarioNombreJugador: "",
        usuarioImagenSrc: "",
        usuarioPuntos: 1,

        isGettingData: false,
        hasData: false,
    }),

    getters: {

    },

    actions: {
        async dispatchGetInitialData() {
            this.isGettingData = true;

            const usuario = (await $fetchWithAuth(`/api/usuarios/${useAuthStore().userId}`)) as IUsuario;

            updateUsuarioState(this, usuario);

            //* Actualizar Predicciones en Prode Store
            useProdeStore().predicciones = usuario.predicciones ?? [];

            this.isGettingData = false;
            this.hasData = true;
        },

        async updateDatosUsuario(nombreJugador: string, imagenSrc: string) {
            return this.updateUsuario({ nombreJugador, imagenSrc });
        },

        async updatePuntosUsuario(puntos: number) {
            return this.updateUsuario({ puntos });
        },

        async updateUsuario(body: IUsuario) {
            try {
                const updUsuario = await $fetchWithAuth(`/api/usuarios/${this.usuarioId}`, { method: "put", body }) as IUsuario;
                updateUsuarioState(this, updUsuario);

                useProdeStore().updateUsuario(updUsuario);

                return updUsuario;
            } catch (error) {
                // dispatch('ABRIR_ERROR', error.response.data.message);
                console.log(error)
            }
        },

        async updatePrediccion(partidoId: TMongoID, golesEquipo1: number, golesEquipo2: number) {
            await updatePrediccion(this, partidoId, golesEquipo1, golesEquipo2);
        },
    }
})

/**
 * Actualiza el estado interno del Store con datos de Usuario
 */
function updateUsuarioState(state: NUserStore.IStoreState, usuario: IUsuario) {
    //* Guardar Data
    state.usuarioId = usuario._id ?? "";
    state.usuarioNombreCuenta = usuario.nombreCuenta ?? "DEFAULT";
    state.usuarioNombreJugador = usuario.nombreJugador ?? "DEFAULT";
    state.usuarioImagenSrc = usuario.imagenSrc ?? "DEFAULT";
    state.usuarioPuntos = usuario.puntos ?? 0;
    // this.d('SET_PREDICCION_MEJOR_JUGADOR', usuario.prediccionMejorJugador);
    // this.d('SET_PREDICCION_MEJOR_ARQUERO', usuario.prediccionMejorArquero);
    // this.d('SET_PREDICCION_MEJOR_GOLEADOR', usuario.prediccionMejorGoleador);
}
