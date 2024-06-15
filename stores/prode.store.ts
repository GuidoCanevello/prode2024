import { defineStore } from 'pinia';
import getters from './prodeStoreFunctions/getters/index';
import actions from './prodeStoreFunctions/actions/index';

export const useProdeStore = defineStore('prodeStore', {
    state: (): NProdeStore.IStoreState => ({
        usuarios: [],
        equipos: [],
        partidos: [],
        predicciones: [],
        jugadores: [],

        hasData: false,
        isGettingData: false,
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
        },

        dataProxPartido(): NProdeStore.ProxPartido.IData | undefined {
            return getters.dataProxPartido(this);
        }
    },

    actions: {
        dispatchGetInitialData() {
            actions.dispatchGetInitialData(this);
        },
    }
})