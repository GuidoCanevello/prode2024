/**
 * Toma los datos de Equipos, Partidos y predicciones y les da el formato necesario para la pantalla de Fase de Grupos
 * 
 * @param state El state de la store
 * @returns La data de fase de grupos formateada
 */
export default function (state: NProdeStore.IProdeStoreState): NProdeStore.FaseGrupos.IData[] {
    const dataGrupos: NProdeStore.FaseGrupos.IData[] = [];

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

        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);

        dataGrupos.find(g => g.nombre === partido.grupo)?.partidos.push({
            partidoId: partido._id,
            equipo1: objEquipo1.nombre ?? "DEFAULT",
            code1: objEquipo1.code ?? "DEFAULT",
            equipo2: objEquipo2.nombre ?? "DEFAULT",
            code2: objEquipo2.code ?? "DEFAULT",
            tienePrediccion: prediccion != undefined,
            isPrediccionHabilitado: fecha > new Date(),
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