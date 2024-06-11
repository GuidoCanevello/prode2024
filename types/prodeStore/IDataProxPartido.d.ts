namespace NProdeStore {
    namespace ProxPartido {
        interface IData {
            partidoId: TMongoID,
            equipo1: string,
            code1: string,
            equipo2: string,
            code2: string,
            grupo: string,
            fecha: Date,
            tienePrediccion: boolean,
            prediccion?: {
                golesEquipo1: number,
                golesEquipo2: number,
            },
        }
    }
}