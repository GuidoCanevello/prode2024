import { defineStore } from 'pinia';
import getters from './prodeStoreFunctions/getters/index';
import actions from './prodeStoreFunctions/actions/index';

export const useProdeStore = defineStore('prodeStore', {
    state: (): NProdeStore.IProdeStoreState => ({
        usuarioId: "",
        usuarioNombreCuenta: "",
        usuarioNombreJugador: "",
        usuarioImagenSrc: "",
        usuarioPuntos: 1,

        equipos: [],
        partidos: [],
        predicciones: [],
        jugadores: [],

        hasInitialData: false,
        isGettingInitialData: false,
    }),

    getters: {
        dataFaseGrupos(): NProdeStore.IDataFaseGrupos[] {
            return getters.dataFaseGrupos(this)
        },
    },

    actions: {
        dispatchGetInitialData() {
            actions.dispatchGetInitialData(this);
        },
    }
})