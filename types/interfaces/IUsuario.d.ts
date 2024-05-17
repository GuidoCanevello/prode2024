interface IUsuario {
    _id?: TMongoID | 0,
    nombreCuenta?: string,
    password?: string,
    nombreJugador?: string,
    puntos?: number,
    dateAdded?: Date,
    imagenSrc?: string,
    predicciones?: IPrediccion[],
    prediccionMejorJugador?: TMongoID,
    prediccionMejorArquero?: TMongoID,
    prediccionMejorGoleador?: TMongoID,
}
