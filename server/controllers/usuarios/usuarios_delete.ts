import { Usuario } from "../../models/Usuario.model";

/**
 * Elimina un Usuario
 *
 * @param id El Id del Usuario
 */
export default async function (id: TMongoID) {
    const answer = await Usuario.deleteOne({ _id: id }).exec()
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
            content: "No se encuentra el Usuario",
        };
    }

    return answer;
};
