import { Equipo } from "~/server/models/Equipo.model";

/**
 * Obtiene un Equipo segun su Id
 *
 * @param id El Id del Equipo
 */
export default async function (id: TMongoID) {
    const query = await Equipo.findById(id).exec()
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
            content: "No se encuentra el Equipo",
        };
    }

    return query;
};
