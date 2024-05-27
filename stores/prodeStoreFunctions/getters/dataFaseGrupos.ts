// TODO limpiar y comment
export default function (state: NProdeStore.IProdeStoreState): NProdeStore.IDataFaseGrupos[] {
    const dataGrupos: NProdeStore.IDataFaseGrupos[] = [];

    const dataEquipos = state.equipos;
    const dataPartidos = state.partidos.filter(p => !p.esEliminatoria);
    const dataPredicciones = state.predicciones;

    const nombresGrupos: TGrupos[] = ["A", "B", "C", "D"];
    nombresGrupos.forEach(nombre => {
        dataGrupos.push({ nombre, equipos: [], partidos: [] });
    });

    dataEquipos.forEach(equipo => {
        let newEquipo = {
            id: equipo._id,
            nombre: equipo.nombre ?? "DEFAULT",
            puntos: equipo.puntos ?? 0,
            code: equipo.code ?? "DEFAULT",
        }

        // TODO test
        // const grupoIndex = dataGrupos.findIndex(g => g.nombre === equipo.grupo);
        // if (grupoIndex != -1) dataGrupos[grupoIndex].equipos.push(newEquipo);
        dataGrupos.find(g => g.nombre === equipo.grupo)?.equipos.push(newEquipo);
    });

    dataPartidos.forEach(partido => {
        const objEquipo1 = dataEquipos.find(e => e._id == partido.equipo1);
        const objEquipo2 = dataEquipos.find(e => e._id == partido.equipo2);

        if (objEquipo1 === undefined || objEquipo2 === undefined) {
            throw {
                content: "Error con los datos del Servidor",
            }
        }

        const fecha = new Date(partido.fecha ?? new Date());

        // let newPartido = {
        //     partidoId: partido._id,
        //     equipo1: objEquipo1.nombre,
        //     code1: objEquipo1.code,
        //     equipo2: objEquipo2.nombre,
        //     code2: objEquipo2.code,
        //     tienePrediccion: false,
        //     golesEquipo1: partido.golesEquipo1,
        //     golesEquipo2: partido.golesEquipo2,
        //     fecha,
        // }

        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);
        // if (prediccion != undefined) {
        //     newPartido.tienePrediccion = true;
        //     newPartido.prediccion = {
        //         golesEquipo1: prediccion.golesEquipo1,
        //         golesEquipo2: prediccion.golesEquipo2,
        //     }
        // }

        // TODO test
        // const grupoIndex = dataGrupos.findIndex(g => g.nombre === partido.grupo);
        // if (grupoIndex != -1) dataGrupos[grupoIndex].partidos.push(newPartido);
        dataGrupos.find(g => g.nombre === partido.grupo)?.partidos.push({
            partidoId: partido._id,
            equipo1: objEquipo1.nombre ?? "DEFAULT",
            code1: objEquipo1.code ?? "DEFAULT",
            equipo2: objEquipo2.nombre ?? "DEFAULT",
            code2: objEquipo2.code ?? "DEFAULT",
            tienePrediccion: prediccion != undefined,
            prediccion: prediccion != undefined ? {
                golesEquipo1: prediccion.golesEquipo1 ?? 0,
                golesEquipo2: prediccion.golesEquipo2 ?? 0,
            } : undefined,
            golesEquipo1: partido.golesEquipo1 ?? 0,
            golesEquipo2: partido.golesEquipo2 ?? 0,
            fecha,
        });
    });

    return dataGrupos;
}