import { Equipo } from "~/server/models/Equipo.model";

/**
 * Elimina un Equipo
 *
 * @param id El Id del Equipo
 */
export default async function (id: TMongoID) {
    const answer = await Equipo.deleteOne({ _id: id }).exec()
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
            content: "No se encuentra el Equipo",
        };
    }

    return answer;
};
