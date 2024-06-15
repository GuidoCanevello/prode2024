namespace NProdeStore {
    interface IStoreState {
        //* Datos de Prode
        usuarios: IUsuario[],
        equipos: IEquipo[];
        partidos: IPartido[];
        predicciones: IPrediccion[];
        jugadores: IJugador[],

        //* State Booleans
        isGettingData: boolean;
        hasData: boolean;
    }
}