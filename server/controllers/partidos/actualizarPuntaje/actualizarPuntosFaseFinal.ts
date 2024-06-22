import predicciones_put from "../../predicciones/predicciones_put";
import usuarios_list from "../../usuarios/usuarios_list";
import usuarios_put from "../../usuarios/usuarios_put";

/**
 * El valor cuando la Prediccion es Correcta (solo si acierta la victoria, sin importar los goles)
 */
const VALOR_PREDICCION_CORRECTA = 2;

/**
 * Actualiza las predicciones que los Usuarios realizaron sobre el partido y el total de Puntos del Usuario.
 * 
 * @param partidoId El Id del Partido
 * @param golesEquipo1 Los Goles del Equipo 1
 * @param golesEquipo2 Los Goles del Equipo 2
 * @param penalesEquipo1 (Opcional) Los Penales anotados por el Equipo 1
 * @param penalesEquipo2 (Opcional) Los Penales anotados por el Equipo 2
 */
export default async function (partidoId: TMongoID, golesEquipo1: number, golesEquipo2: number, penalesEquipo1?: number, penalesEquipo2?: number) {
    // TODO Confirmar con los pibes si van a predecir solo la fase sobre la que estan (OCtavos, Cuartos, etc.) o todo el camino
    // TODO ya esta confirmado, ahora tengo q armarlo
    const esVictoriaEquipo1 = golesEquipo1 > golesEquipo2 ||
        (golesEquipo1 == golesEquipo2 &&
            penalesEquipo1 != undefined &&
            penalesEquipo2 != undefined &&
            penalesEquipo1 > penalesEquipo2);

    // Obtener Usuarios
    const usuarios = await usuarios_list();

    for (const usuario of usuarios) {
        // Obtener index prediccion
        const prediccionIndex = usuario.predicciones.findIndex(p => p.partidoId == partidoId.toString());

        if (prediccionIndex != -1) {
            // Obtener puntos correspondientes al resultado
            const puntos =
                (esVictoriaEquipo1 && usuario.predicciones[prediccionIndex].golesEquipo1 == 1) ||
                    (!esVictoriaEquipo1 && usuario.predicciones[prediccionIndex].golesEquipo2 == 1) ?
                    VALOR_PREDICCION_CORRECTA :
                    0;
            // const puntos = acertoResultado(partidoId, partidos, esVictoriaEquipo1, usuario, prediccionIndex) ? 2 : 0;

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

    // REVIEW Crear nuevo partido y mover al ganador si queda mas escala en la Fase Final
}