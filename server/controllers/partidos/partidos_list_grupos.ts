import { Partido } from "../../models/Partido.model";

/**
 * Obtiene el listado de todos los Partidos cargados de Fase de Grupos
 */
export default async function () {
    const query = await Partido.find({ grupo: { $exists: true } })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
