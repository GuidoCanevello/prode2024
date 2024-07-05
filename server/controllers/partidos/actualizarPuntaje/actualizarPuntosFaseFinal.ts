import { Partido } from "~/server/models/Partido.model";
import predicciones_put from "../../predicciones/predicciones_put";
import usuarios_list from "../../usuarios/usuarios_list";
import usuarios_put from "../../usuarios/usuarios_put";
import partidos_get from "../partidos_get";

/**
 * Actualiza las predicciones que los Usuarios realizaron sobre el partido y el total de Puntos del Usuario.
 * 
 * @param partidoId El Id del Partido
 * @param golesEquipo1 Los Goles del Equipo 1
 * @param golesEquipo2 Los Goles del Equipo 2
 * @param penalesEquipo1 (Opcional) Los Penales anotados por el Equipo 1
 * @param penalesEquipo2 (Opcional) Los Penales anotados por el Equipo 2
 */
export default async function (partidoId: TMongoID) {
    const { equipo1, equipo2, golesEquipo1, golesEquipo2, penalesEquipo1, penalesEquipo2, esEliminatoria, isTest, tipoEliminatoria } = await partidos_get(partidoId);

    if (equipo1 == undefined || equipo2 == undefined || golesEquipo1 == undefined || golesEquipo2 == undefined) return;

    const esVictoriaEquipo1 = golesEquipo1 > golesEquipo2 ||
        (golesEquipo1 == golesEquipo2 &&
            penalesEquipo1 != undefined &&
            penalesEquipo2 != undefined &&
            penalesEquipo1 > penalesEquipo2);

    // Obtener Usuarios
    const usuarios = await usuarios_list(isTest);

    for (const usuario of usuarios) {
        // Obtener index prediccion
        const prediccionIndex = usuario.predicciones.findIndex(p => p.partidoId == partidoId.toString());

        if (prediccionIndex != -1) {
            // Obtener puntos correspondientes al resultado
            let puntos = obtenerPuntajeResultado(
                {
                    golesEquipo1: usuario.predicciones[prediccionIndex].golesEquipo1,
                    golesEquipo2: usuario.predicciones[prediccionIndex].golesEquipo2
                },
                { golesEquipo1, golesEquipo2 }
            )

            // Si es Partido de eliminatorias, ver si hubo prediccion de penales
            if (esEliminatoria && penalesEquipo1 != undefined && penalesEquipo2 != undefined &&
                usuario.predicciones[prediccionIndex].penales != undefined && usuario.predicciones[prediccionIndex].penales != "Sin") {

                // Si acerto a ganador de Penales, sumar 1 punto
                if ((penalesEquipo1 > penalesEquipo2 && usuario.predicciones[prediccionIndex].penales == "GanaE1") ||
                    (penalesEquipo2 > penalesEquipo1 && usuario.predicciones[prediccionIndex].penales == "GanaE2"))

                    puntos++;
            }

            // Sumar puntos de predicciones
            let userPuntos = 0;
            usuario.predicciones.forEach((p, i) => { if (i != prediccionIndex) userPuntos += p.puntos; });

            // Editar prediccion para decir que vale los puntos determinados
            await predicciones_put(
                usuario._id,
                usuario.predicciones[prediccionIndex]._id,
                {
                    puntos
                }
            );
            userPuntos += puntos;

            // Editar total de puntos del usuario
            await usuarios_put(usuario._id, {
                puntos: userPuntos
            });
        }
    }

    // Termina si es Final o Tercer puesto
    if (tipoEliminatoria == "Tercero" || tipoEliminatoria == "Final") return;

    // Mover Equipos
    if (tipoEliminatoria == "Cuartos") {
        // Mover al Equipo Ganador 
        const partidoSiguiente = await Partido.findOne({
            $and: [
                { $or: [{ partidoEquipo1: partidoId }, { partidoEquipo2: partidoId }] },
                { tipoEliminatoria: "Semis" }
            ]
        });
        if (partidoSiguiente != null) {
            if (partidoSiguiente.partidoEquipo1 == partidoId) partidoSiguiente.equipo1 = esVictoriaEquipo1 ? equipo1 : equipo2;
            else partidoSiguiente.equipo2 = esVictoriaEquipo1 ? equipo1 : equipo2;

            await partidoSiguiente.save();
        }
    } else if (tipoEliminatoria == "Semis") {
        // Mover al Equipo Ganador y al Perdedor
        const partidoFinal = await Partido.findOne({
            $and: [
                { $or: [{ partidoEquipo1: partidoId }, { partidoEquipo2: partidoId }] },
                { tipoEliminatoria: "Final" }
            ]
        });

        const partidoTercero = await Partido.findOne({
            $and: [
                { $or: [{ partidoEquipo1: partidoId }, { partidoEquipo2: partidoId }] },
                { tipoEliminatoria: "Tercero" }
            ]
        });

        if (partidoFinal != null && partidoTercero != null) {
            if (partidoFinal.partidoEquipo1 == partidoId) partidoFinal.equipo1 = esVictoriaEquipo1 ? equipo1 : equipo2;
            else partidoFinal.equipo2 = esVictoriaEquipo1 ? equipo1 : equipo2;

            await partidoFinal.save();

            if (partidoTercero.partidoEquipo1 == partidoId) partidoTercero.equipo1 = !esVictoriaEquipo1 ? equipo1 : equipo2;
            else partidoTercero.equipo2 = !esVictoriaEquipo1 ? equipo1 : equipo2;

            await partidoTercero.save();
        }
    }

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