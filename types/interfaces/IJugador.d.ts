interface IJugador {
    _id: TMongoID | 0,
    nombre: string,
    posicion: string,
    numero: number,
    linkfoto: string,
    esMejorJugador: boolean,
    esMejorArquero: boolean,
    esMejorGoleador: boolean,
    equipo: TMongoID,
}