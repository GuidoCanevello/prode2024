/**
 * Genera los datos del proximo Partido para PartidoProximoCard
 * 
 * @param state El state de la store
 * @returns La data del Partido
 */
export default function (state: NProdeStore.IStoreState): NProdeStore.ProxPartido.IData | undefined {
    const dataEquipos = state.equipos;
    const dataPredicciones = state.predicciones;
    const dataPartidos = state.partidos;

    let ultimoPartidoSearch: IPartido | undefined = undefined;
    for (const partido of dataPartidos) {
        let fechaPartido = new Date(partido.fecha ?? new Date());
        if (new Date() < fechaPartido &&
            (ultimoPartidoSearch == undefined || (ultimoPartidoSearch.fecha && new Date(ultimoPartidoSearch.fecha) > fechaPartido))) {

            ultimoPartidoSearch = partido;
        }
    }

    if (ultimoPartidoSearch != undefined) {
        const objEquipo1 = dataEquipos.find(e => e._id == ultimoPartidoSearch.equipo1);
        const objEquipo2 = dataEquipos.find(e => e._id == ultimoPartidoSearch.equipo2);

        const prediccion = dataPredicciones.find(prediccion => prediccion.partidoId == ultimoPartidoSearch._id);

        return {
            partidoId: ultimoPartidoSearch._id,
            equipo1: objEquipo1?.nombre ?? "DEFAULT",
            code1: objEquipo1?.code ?? "DEFAULT",
            equipo2: objEquipo2?.nombre ?? "DEFAULT",
            code2: objEquipo2?.code ?? "DEFAULT",
            grupo: ultimoPartidoSearch.grupo ?? "",
            fecha: new Date(ultimoPartidoSearch.fecha ?? new Date()),
            tienePrediccion: prediccion != undefined,
            prediccion: prediccion != undefined ? {                
                golesEquipo1: prediccion.golesEquipo1 ?? 0,
                golesEquipo2: prediccion.golesEquipo2 ?? 0,
            } : undefined,
        }
    }
}