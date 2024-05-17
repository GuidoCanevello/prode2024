import { Jugador } from "~/server/models/Jugador.model";

/**
 * Elimina un Jugador
 *
 * @param id El Id del Jugador
 */
export default async function (id: TMongoID) {
    const answer = await Jugador.deleteOne({ _id: id }).exec()
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

    if (answer.deletedCount === 0) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        };
    }

    return answer;
};
