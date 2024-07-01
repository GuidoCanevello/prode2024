/**
 * Toma los datos de Partidos les da el formato necesario para el componente ListadoPartidosCard
 * 
 * @param state El state de la store
 * @returns La data de partidos formateada
 */
export default function (state: NProdeStore.IStoreState): NProdeStore.Listado.IData[] {
    const dataListado: NProdeStore.Listado.IData[] = [];

    const dataEquipos = state.equipos;
    const dataPartidos = state.partidos;
    const dataPredicciones = state.predicciones;

    dataPartidos.forEach(partido => {
        if (!partido.esEliminatoria) dataListado.push(formatPartidoGrupo(dataEquipos, partido, dataPredicciones));
        else dataListado.push(formatPartidoFinal(dataEquipos, partido, dataPredicciones, dataPartidos.filter(p => p.esEliminatoria)));
    });

    return dataListado;
}

/**
 * Toma un Partido de Fase de Grupos y le da la forma requerida por la interface
 */
function formatPartidoGrupo(dataEquipos: IEquipo[], partido: IPartido, dataPredicciones: IPrediccion[]): NProdeStore.Listado.IData {
    const objEquipo1 = dataEquipos.find(e => e._id == partido.equipo1);
    const objEquipo2 = dataEquipos.find(e => e._id == partido.equipo2);

    if (objEquipo1 === undefined || objEquipo2 === undefined) {
        throw {
            content: "Error con los datos del Servidor",
        };
    }

    const fecha = new Date(partido.fecha ?? new Date());
    const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);

    const newPartido: NProdeStore.Listado.IData = {
        partidoId: partido._id,
        equipo1: objEquipo1.nombre ?? "DEFAULT",
        equipo2: objEquipo2.nombre ?? "DEFAULT",
        grupo: partido.grupo ?? "",
        fecha,
        golesEquipo1: partido.golesEquipo1 ?? 0,
        golesEquipo2: partido.golesEquipo2 ?? 0,
        descripcionPartido: `${objEquipo1.nombre} vs. ${objEquipo2.nombre}`,

        tienePrediccion: prediccion != undefined,
        prediccion: prediccion != undefined ? {
            golesEquipo1: prediccion.golesEquipo1 ?? 0,
            golesEquipo2: prediccion.golesEquipo2 ?? 0,
        } : undefined,
        descripcionPrediccion: prediccion != undefined ? `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}` : "Sin Pronostico",
    };

    return newPartido;
}

/**
 * Toma un Partido de Fase Final y le da la forma requerida por la interface
 */
function formatPartidoFinal(dataEquipos: IEquipo[], partido: IPartido, dataPredicciones: IPrediccion[], dataPartidos: IPartido[]): NProdeStore.Listado.IData {
    const objEquipo1 = dataEquipos.find(e => e._id == partido.equipo1);
    const objEquipo2 = dataEquipos.find(e => e._id == partido.equipo2);

    const fecha = new Date(partido.fecha ?? new Date());
    const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == partido._id);

    // NOTE la eliminatoria de donde empieza Fase Final (puede ser Cuartos u Octavos)
    const tipoEliminatoriaInicio: TTipoEliminatoria = "Cuartos"

    const equipo1: string = objEquipo1 ?
        (objEquipo1.nombre ?? "") :
        (partido.tipoEliminatoria == "Tercero" ?
            "Perdedor" :
            "Ganador")
        + " de " +
        (partido.tipoEliminatoria == tipoEliminatoriaInicio ?
            "-" :
            dataPartidos.find(p => p._id == partido.partidoEquipo1)?.identificadorEliminatorias);
    const equipo2: string = objEquipo2 ?
        (objEquipo2.nombre ?? "") :
        (partido.tipoEliminatoria == "Tercero" ? "Perdedor" : "Ganador")
        + " de " +
        (partido.tipoEliminatoria == tipoEliminatoriaInicio ?
            "-" :
            dataPartidos.find(p => p._id == partido.partidoEquipo2)?.identificadorEliminatorias);

    const newPartido: NProdeStore.Listado.IData = {
        partidoId: partido._id,
        equipo1,
        equipo2,
        grupo: partido.grupo ?? "",
        fecha,
        golesEquipo1: partido.golesEquipo1 != undefined ? partido.golesEquipo1 + (partido.penalesEquipo1 != undefined ? ` (${partido.penalesEquipo1})` : "") : 0,
        golesEquipo2: partido.golesEquipo2 != undefined ? partido.golesEquipo2 + (partido.penalesEquipo1 != undefined ? ` (${partido.penalesEquipo2})` : "") : 0,
        descripcionPartido: `${partido.identificadorEliminatorias} - ${equipo1} vs. ${equipo2}`,

        tienePrediccion: prediccion != undefined,
        prediccion: prediccion != undefined ? {
            golesEquipo1: prediccion.golesEquipo1 ?? 0,
            golesEquipo2: prediccion.golesEquipo2 ?? 0,
        } : undefined,
        descripcionPrediccion: prediccion != undefined ? `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}` : "Sin Pronostico",
    };

    return newPartido;
}
