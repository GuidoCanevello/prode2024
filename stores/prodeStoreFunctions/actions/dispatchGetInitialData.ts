export default async function (state: NProdeStore.IStoreState) {
    if (state.hasData) return;

    state.isGettingData = true;

    try {
        //* Usuarios
        const usuarios = (await $fetch('/api/usuarios', {
            query: {
                isOnlyTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
            }
        })) as IUsuario[];

        //* Partidos
        const partidos = (await $fetch('/api/partidos', {
            query: {
                isOnlyTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
            }
        })) as IPartido[];

        //* Equipos
        const equipos = (await $fetch('/api/equipos', {
            query: {
                isOnlyTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
            }
        })) as IEquipo[];

        //* Jugadores
        const jugadores = (await $fetch('/api/jugadores', {
            query: {
                isOnlyTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
            }
        })) as IJugador[];        

        state.usuarios = usuarios;
        state.partidos = partidos;
        state.equipos = equipos;
        state.jugadores = jugadores;
        state.hasData = true;
    } catch (error) {
        console.log("error", error)
        // dispatch(s'ABRIR_ERROR', error.response.data.message);
    } finally {
        state.isGettingData = false;
    }
}