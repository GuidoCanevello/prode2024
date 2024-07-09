namespace NUserStore {
    interface IStoreState {
        //* Datos de Usuario
        usuarioId: TMongoID,
        usuarioNombreCuenta: string,
        usuarioNombreJugador: string,
        usuarioImagenSrc: string,
        usuarioPuntos: number,
        prediccionMejorJugador: undefined | TMongoID,
        prediccionMejorArquero: undefined | TMongoID,
        prediccionMejorGoleador: undefined | TMongoID,

        //* State Booleans
        isGettingData: boolean;
        hasData: boolean;
    }
}