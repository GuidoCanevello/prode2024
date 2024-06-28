namespace NChatStore {
    interface IStoreState {
        //* Datos de Mensajes
        msgPorFecha: {
            fecha: string,
            messages: IChatMessage[],
        }[];
        userColors: {
            usuarioId: string,
            color: string,
            isUsuario: boolean,
        }[];

        //* State Booleans
        isSendingMessage: boolean;
        isGettingData: boolean;
        hasData: boolean;
    }
}