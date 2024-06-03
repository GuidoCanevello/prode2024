namespace NProdeStore {
    interface IProdeStoreState {
        //* Datos de Usuario
        usuarioId: string,
        usuarioNombreCuenta: string,
        usuarioNombreJugador: string,
        usuarioImagenSrc: string,
        usuarioPuntos: number,
        // prediccionMejorJugador: null,
        // prediccionMejorArquero: null,
        // prediccionMejorGoleador: null,

        //* Datos de Prode
        usuarios: IUsuario[],
        equipos: IEquipo[];
        partidos: IPartido[];
        predicciones: IPrediccion[];
        jugadores: IJugador[],

        //* State Booleans
        isGettingInitialData: boolean;
        hasInitialData: boolean;
    }
}