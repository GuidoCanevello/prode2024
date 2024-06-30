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
        isSocketWorking: boolean;
        isSendingMessage: boolean;
        isSocketConnected: boolean;
        isGettingData: boolean;
        hasData: boolean;
    }
}