interface IPrediccion {
    _id?: TMongoID | 0,
    golesEquipo1?: number,
    golesEquipo2?: number,
    penales?: TPrediccionPenales,
    puntos?: number,
    partidoId?: TMongoID,
}