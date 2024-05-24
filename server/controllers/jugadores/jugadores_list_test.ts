import { Jugador } from "~/server/models/Jugador.model";

/**
 * Obtiene el listado de todos los Jugadores de test cargados
 */
export default async function () {
    const query = await Jugador.find({ isTest: true })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
