interface IEquipo {
    _id?: TMongoID,
    nombre?: string,
    code?: string,
    puntos?: number,
    grupo?: TGrupos,
    isTest?: boolean,
}