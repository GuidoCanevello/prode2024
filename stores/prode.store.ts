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
        async dispatchGetInitialData() {
            await actions.dispatchGetInitialData(this);
        },

        async dispatchCreateUsuario(nombreCuenta: string, password: string) {
            const body: IUsuario = {
                nombreCuenta,
                nombreJugador: nombreCuenta,
                password,
                isTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
            }
            try {
                const usuario = await $fetchWithAuth('/api/usuarios', { method: "post", body }) as IUsuario;

                if (usuario != undefined) this.usuarios.push(usuario);

                return usuario;
            } catch (error) {
                console.log("error", error);
            }
        },

        updateUsuario(updUsuario: IUsuario) {
            const indexUsuario = this.usuarios.findIndex(u => u._id == updUsuario._id);

            if (indexUsuario != -1) this.usuarios.splice(indexUsuario, 1, updUsuario);
        },

        removePredicciones() {
            this.predicciones = [];
        }
    }
})