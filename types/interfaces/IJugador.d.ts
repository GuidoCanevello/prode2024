interface IJugador {
    _id?: TMongoID,
    nombre?: string,
    posicion?: "Defender" | "Midfielder" | "Forward" | "Goalkeeper",
    numero?: number,
    linkfoto?: string,
    esMejorJugador?: boolean,
    esMejorArquero?: boolean,
    esMejorGoleador?: boolean,
    equipo?: TMongoID,
    isTest?: boolean,
}