interface IUsuario {
    _id?: TMongoID | 0,
    nombreCuenta?: string,
    password?: string,
    nombreJugador?: string,
    puntos?: number,
    dateAdded?: Date,
    imagenSrc?: string,
    predicciones?: {
        _id?: TMongoID | 0,
        golesEquipo1?: number,
        golesEquipo2?: number,
        puntos?: number,
        partidoId?: TMongoID,
    }[],
    prediccionMejorJugador?: TMongoID,
    prediccionMejorArquero?: TMongoID,
    prediccionMejorGoleador?: TMongoID,
}
