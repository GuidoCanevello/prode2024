import { Equipo } from "~/server/models/Equipo.model";

/**
 * Obtiene el listado de todos los Equipos de test cargados
 */
export default async function () {
    const query = await Equipo.find({ isTest: true })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
