namespace NProdeStore {
    namespace Listado {
        interface IData {
            partidoId: TMongoID,
            equipo1: string,
            equipo2: string,
            grupo: string,
            fecha: Date,
            tienePrediccion: boolean,
            prediccion?: {
                golesEquipo1: number,
                golesEquipo2: number,
            },
            golesEquipo1: number | string,
            golesEquipo2: number | string,
            descripcionPartido: string,
            descripcionPrediccion: string,
        }
    }
}