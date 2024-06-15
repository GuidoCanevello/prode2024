import { defineStore } from 'pinia';
// import getters from './prodeStoreFunctions/getters/index';
// import actions from './prodeStoreFunctions/actions/index';

export const useUserStore = defineStore('userStore', {
    state: (): NUserStore.IStoreState => ({
        usuarioId: "",
        usuarioNombreCuenta: "",
        usuarioNombreJugador: "",
        usuarioImagenSrc: "",
        usuarioPuntos: 1,

        isGettingData: false,
        hasData: false,
        isUserLogged: false,
    }),

    getters: {
        // dataFaseGrupos(): NProdeStore.FaseGrupos.IData[] {
        //     return getters.dataFaseGrupos(this);
        // },

        // dataRanking(): NProdeStore.Ranking.IData[] {
        //     return getters.dataRanking(this);
        // },

        // dataListado(): NProdeStore.Listado.IData[] {
        //     return getters.dataListado(this);
        // },

        // dataProxPartido(): NProdeStore.ProxPartido.IData | undefined {
        //     return getters.dataProxPartido(this);
        // }
    },

    actions: {
        async dispatchGetInitialData() {
            this.isGettingData = true;

            const usuario = (await $fetch("/api/usuarios/665a1ee676822934e5550ec6")) as IUsuario;

            //* Guardar Data
            this.usuarioId = usuario._id ?? "";
            this.usuarioNombreCuenta = usuario.nombreCuenta ?? "DEFAULT";
            this.usuarioNombreJugador = usuario.nombreJugador ?? "DEFAULT";
            this.usuarioImagenSrc = usuario.imagenSrc ?? "DEFAULT";
            this.usuarioPuntos = usuario.puntos ?? 0;
            // this.d('SET_PREDICCION_MEJOR_JUGADOR', usuario.prediccionMejorJugador);
            // this.d('SET_PREDICCION_MEJOR_ARQUERO', usuario.prediccionMejorArquero);
            // this.d('SET_PREDICCION_MEJOR_GOLEADOR', usuario.prediccionMejorGoleador);

            //* Actualizar Predicciones en Prode Store
            useProdeStore().predicciones = usuario.predicciones ?? [];

            this.isGettingData = false;
            this.hasData = true;
        },
    }
})