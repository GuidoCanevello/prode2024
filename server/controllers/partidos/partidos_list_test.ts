import { Partido } from "../../models/Partido.model";

/**
 * Obtiene el listado de todos los Partidos cargados
 */
export default async function () {
    const query = await Partido.find({ isTest: true })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
