import { Partido } from "~/server/models/Partido.model";

/**
 * Obtiene el listado de todos los Partidos cargados de Fase Final
 */
export default async function () {
    const query = await Partido.find({ esEliminatoria: true })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
