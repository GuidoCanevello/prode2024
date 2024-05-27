export default async function (state: NProdeStore.IProdeStoreState) {
    if (state.hasInitialData) return;

    state.isGettingInitialData = true;

    try {
        //* Usuario
        // TODO implement y ver si se queda aca o en otro store
        // const usuario = await dispatch(s'DISPATCH_AXIOS_REQUEST', {
        //     axiosRequest: async () =>
        //         await axios.get(`usuarios/${localStorage.getItem('prodeLoggedUserId')}`)
        // });
        const usuario = (await $fetch("/api/usuarios/627af32ad506ba4e3c964f61")) as IUsuario;

        //* Partidos
        const partidos = (await $fetch('/api/partidos')) as IPartido[];

        //* Equipos
        const equipos = (await $fetch('/api/equipos')) as IEquipo[];

        //* Jugadores
        const jugadores = (await $fetch('/api/jugadores')) as IJugador[];

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

        state.partidos = partidos;
        state.equipos = equipos;
        state.jugadores = jugadores;
        state.hasInitialData = true;
        console.log("get initial data", state.hasInitialData)
    } catch (error) {
        // dispatch(s'ABRIR_ERROR', error.response.data.message);
    } finally {
        state.isGettingInitialData = false;
    }
}