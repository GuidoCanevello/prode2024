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

        usuarios: [],
        equipos: [],
        partidos: [],
        predicciones: [],
        jugadores: [],

        hasInitialData: false,
        isGettingInitialData: false,
    }),

    getters: {
        dataFaseGrupos(): NProdeStore.FaseGrupos.IData[] {
            return getters.dataFaseGrupos(this);
        },

        dataRanking(): NProdeStore.Ranking.IData[] {
            return getters.dataRanking(this);
        },

        dataListado(): NProdeStore.Listado.IData[] {
            return getters.dataListado(this);
        }
    },

    actions: {
        dispatchGetInitialData() {
            actions.dispatchGetInitialData(this);
        },
    }
})