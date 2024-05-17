import { Jugador } from "~/server/models/Jugador.model";

/**
 * Obtiene un Jugador segun su Id
 *
 * @param id El Id del Jugador
 */
export default async function (id: TMongoID) {
    const query = await Jugador.findById(id).exec()
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
            content: "No se encuentra el Jugador",
        };
    }

    return query;
};
