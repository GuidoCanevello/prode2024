interface IChatMessage {
    _id?: TMongoID,
    usuarioId?: TMongoID,
    fecha?: Date,
    texto?: string,
    isEliminado?: boolean,
    isTest?: boolean,
}