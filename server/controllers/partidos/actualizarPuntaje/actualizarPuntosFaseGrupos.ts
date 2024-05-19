import predicciones_put from "../../predicciones/predicciones_put";
import usuarios_list from "../../usuarios/usuarios_list";
import usuarios_put from "../../usuarios/usuarios_put";
import partidos_get from "../partidos_get";
import partidos_list_grupos from "../partidos_list_grupos";
import equipos_put from "../../equipos/equipos_put";

/**
 * Actualiza las predicciones que los Usuarios realizaron sobre el partido, el total de Puntos del Usuario
 * y los puntos del Equipo en el Grupo.
 * 
 * @param partidoId El Id del Partido
 * @param golesEquipo1 Los Goles del Equipo 1
 * @param golesEquipo2 Los Goles del Equipo 2
 */
export default async function actualizarPuntosFaseGrupos(partidoId: TMongoID, golesEquipo1: number, golesEquipo2: number) {
    // Obtener Usuario
    const usuarios = await usuarios_list();
    for (const usuario of usuarios) {
        // Obtener index prediccion
        const prediccionIndex = usuario.predicciones.findIndex(p => p.partidoId == partidoId);

        if (prediccionIndex != -1) {
            // Obtener puntos correspondientes al resultado
            const puntos = obtenerPuntajeResultado(
                {
                    golesEquipo1: usuario.predicciones[prediccionIndex].golesEquipo1,
                    golesEquipo2: usuario.predicciones[prediccionIndex].golesEquipo2
                },
                { golesEquipo1, golesEquipo2 }
            )

            // Sumar puntos de predicciones
            let userPuntos = 0;
            usuario.predicciones.forEach((p, i) => { if (i != prediccionIndex) userPuntos += p.puntos });

            // Editar prediccion para decir que vale los puntos determinados
            await predicciones_put(
                usuario._id,
                usuario.predicciones[prediccionIndex]._id,
                { puntos }
            );
            userPuntos += puntos;

            // Editar total de puntos del usuario
            await usuarios_put(usuario._id, { puntos: userPuntos })
        }
    }

    // Actualizar los puntos de los Equipos en el Grupo
    const partido = await partidos_get(partidoId);
    await actualizarPuntosEquipo(partido.equipo1);
    await actualizarPuntosEquipo(partido.equipo2);
}

/**
 * Determina los puntos a sumar segun la Prediccion realizada
 * 
 * @param prediccion El resultado de la Prediccion
 * @param partido El resultado del Partido
 * @returns Los puntos obtenidos
 */
function obtenerPuntajeResultado(prediccion: { golesEquipo1: number, golesEquipo2: number }, partido: { golesEquipo1: number, golesEquipo2: number }): number {
    const puntajesPosibles = [3, 1, 0];

    if (prediccion.golesEquipo1 == partido.golesEquipo1 && prediccion.golesEquipo2 == partido.golesEquipo2) {
        // Si acierta el resultado y los goles realizados
        return puntajesPosibles[0];
    } else if (toResultado(prediccion.golesEquipo1, prediccion.golesEquipo2) == toResultado(partido.golesEquipo1, partido.golesEquipo2)) {
        // Si el resultado de la prediccion fue igual al resultado del partido (a pesar de no acertar en cantidad de goles)
        return puntajesPosibles[1];
    } else {
        // Si no acerto ni en cantidad de goles ni en el resultado final
        return puntajesPosibles[2];
    }
}

/**
 * Devuelve 1 si el equipo 1 gana, 2 si gana el equipo 2 o 0 si resulta en empate
 */
function toResultado(golesEquipo1: number, golesEquipo2: number): 0 | 1 | 2 {
    if (golesEquipo1 > golesEquipo2) return 1;
    else if (golesEquipo2 > golesEquipo1) return 2;
    else return 0;
}

/**
 * Actualiza los puntos de un Equipo en su Grupo
 * 
 * @param idEquipo El Id del Equipo a actualizar
 */
async function actualizarPuntosEquipo(idEquipo: TMongoID) {
    // Agregar puntos si el Equipo esta en fase de Grupos
    const partidos = await partidos_list_grupos();

    let puntos = 0;
    for (const partido of partidos) {
        if (partido.golesEquipo1 != undefined && partido.golesEquipo2 != undefined) {
            if (String(partido.equipo1) == String(idEquipo)) {
                if (partido.golesEquipo1 > partido.golesEquipo2) puntos += 3;
                else if (partido.golesEquipo1 == partido.golesEquipo2) puntos += 1;
            } else if (String(partido.equipo2) == String(idEquipo)) {
                if (partido.golesEquipo2 > partido.golesEquipo1) puntos += 3;
                else if (partido.golesEquipo1 == partido.golesEquipo2) puntos += 1;
            }
        }
    }

    await equipos_put(idEquipo, { puntos });
}