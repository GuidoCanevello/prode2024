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

        async dispatchUpdateResultadoPartido(partidoId: string, golesEquipo1: number, golesEquipo2: number, penalesEquipo1?: number, penalesEquipo2?: number) {
            const body: IPartido = { golesEquipo1, golesEquipo2, penalesEquipo1, penalesEquipo2 }
            try {
                const partido = await $fetchWithAuth(`/api/partidos/${partidoId}`, { method: "put", body }) as IPartido;

                if (partido != undefined) this.partidos.splice(this.partidos.findIndex(p => p._id == partido._id), 1, partido);

                return partido;
            } catch (error) {
                console.log("error", error);
            }
        },

        async dispatchUpdateFechaEquipoPartido(partidoId: string, fecha: Date, equipo1: string, equipo2: string) {
            const body: IPartido = { fecha, equipo1, equipo2 }
            try {
                const partido = await $fetchWithAuth(`/api/partidos/${partidoId}`, { method: "put", body }) as IPartido;

                if (partido != undefined) this.partidos.splice(this.partidos.findIndex(p => p._id == partido._id), 1, partido);

                return partido;
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