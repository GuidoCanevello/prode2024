export default async function (state: NProdeStore.IProdeStoreState) {
    if (state.hasInitialData) return;

    state.isGettingInitialData = true;

    try {
        //* Usuario
        // REVIEW implement y ver si se queda aca o en otro store
        // const usuario = await dispatch(s'DISPATCH_AXIOS_REQUEST', {
        //     axiosRequest: async () =>
        //         await axios.get(`usuarios/${localStorage.getItem('prodeLoggedUserId')}`)
        // });
        const usuario = (await $fetch("/api/usuarios/665a1ee676822934e5550ec6")) as IUsuario;

        //* Usuarios
        const usuarios = (await $fetch('/api/usuarios', {
            query: {
                isOnlyTest: useRuntimeConfig().public.useTestData == "true"
            }
        })) as IUsuario[];

        //* Partidos
        const partidos = (await $fetch('/api/partidos', {
            query: {
                isOnlyTest: useRuntimeConfig().public.useTestData == "true"
            }
        })) as IPartido[];

        //* Equipos
        const equipos = (await $fetch('/api/equipos', {
            query: {
                isOnlyTest: useRuntimeConfig().public.useTestData == "true"
            }
        })) as IEquipo[];

        //* Jugadores
        const jugadores = (await $fetch('/api/jugadores', {
            query: {
                isOnlyTest: useRuntimeConfig().public.useTestData == "true"
            }
        })) as IJugador[];

        //* Guardar Data
        state.usuarioId = usuario._id ?? "";
        state.usuarioNombreCuenta = usuario.nombreCuenta ?? "DEFAULT";
        state.usuarioNombreJugador = usuario.nombreJugador ?? "DEFAULT";
        state.usuarioImagenSrc = usuario.imagenSrc ?? "DEFAULT";
        state.usuarioPuntos = usuario.puntos ?? 0;
        // state.d('SET_PREDICCION_MEJOR_JUGADOR', usuario.prediccionMejorJugador);
        // state.d('SET_PREDICCION_MEJOR_ARQUERO', usuario.prediccionMejorArquero);
        // state.d('SET_PREDICCION_MEJOR_GOLEADOR', usuario.prediccionMejorGoleador);

        state.predicciones = usuario.predicciones ?? [];

        state.usuarios = usuarios;
        state.partidos = partidos;
        state.equipos = equipos;
        state.jugadores = jugadores;
        state.hasInitialData = true;
    } catch (error) {
        console.log("error", error)
        // dispatch(s'ABRIR_ERROR', error.response.data.message);
    } finally {
        state.isGettingInitialData = false;
    }
}