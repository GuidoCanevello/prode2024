namespace NProdeStore {
    interface IDataFaseGrupos {
        nombre: TGrupos;
        equipos: {
            id: TMongoID,
            nombre: string,
            puntos: number,
            code: string,
        }[];
        partidos: {
            partidoId: TMongoID,
            equipo1: string,
            code1: string,
            equipo2: string,
            code2: string,
            tienePrediccion: boolean,
            prediccion?: {
                golesEquipo1: number,
                golesEquipo2: number,
            },
            golesEquipo1: number,
            golesEquipo2: number,
            fecha: Date,
        }[]
    }
}