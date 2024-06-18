namespace NUserStore {
    interface IStoreState {
        //* Datos de Usuario
        usuarioId: TMongoID,
        usuarioNombreCuenta: string,
        usuarioNombreJugador: string,
        usuarioImagenSrc: string,
        usuarioPuntos: number,
        // prediccionMejorJugador: null,
        // prediccionMejorArquero: null,
        // prediccionMejorGoleador: null,

        //* State Booleans
        isGettingData: boolean;
        hasData: boolean;
    }
}