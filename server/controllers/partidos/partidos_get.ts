import { Partido } from "../../models/Partido.model";

/**
 * Obtiene un Partidos segun su Id
 *
 * @param id El Id del Partidos
 */
export default async function (id: TMongoID) {
    const query = await Partido.findById(id).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                };
            } else {
                throw {
                    content: error,
                };
            }
        });

    if (query === null) {
        throw {
            number: 404,
            content: "No se encuentra el Partido",
        };
    }

    return query;
};
