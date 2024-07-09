interface IJugador {
    _id?: TMongoID,
    nombre?: string,
    posicion?: TPosicionJugador,
    numero?: number,
    linkfoto?: string,
    esMejorJugador?: boolean,
    esMejorArquero?: boolean,
    esMejorGoleador?: boolean,
    equipo?: TMongoID,
    isTest?: boolean,
}