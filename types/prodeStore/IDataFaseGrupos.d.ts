namespace NProdeStore {
    namespace FaseGrupos {
        interface IData {
            nombre: TGrupos,
            equipos: IEquipo[],
            partidos: IPartido[],
        }

        interface IEquipo {
            id: TMongoID,
            nombre: string,
            puntos: number,
            code: string,
        }

        interface IPartido {
            partidoId: TMongoID,
            equipo1: string,
            code1: string,
            equipo2: string,
            code2: string,
            tienePrediccion: boolean,
            isPrediccionHabilitado: boolean,
            prediccion?: {
                golesEquipo1: number,
                golesEquipo2: number,
            },
            golesEquipo1: number,
            golesEquipo2: number,
            fecha: Date,
        }
    }
}