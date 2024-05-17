import { Equipo } from "~/server/models/Equipo.model";

/**
 * Obtiene el listado de todos los Equipos cargados
 */
export default async function () {
    const query = await Equipo.find()
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
