import { ChatMessage } from "~/server/models/ChatMessage.model";

/**
 * Actualiza los datos de un Mensaje de Chat
 *
 * @param id El Id del Mensaje de Chat a modificar
 */
export default async function (id: TMongoID) {
    const query = await ChatMessage.findOneAndUpdate({ _id: id }, { isEliminado: true }, { new: true }).exec()
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
            content: "No se encuentra el Mensaje de Chat",
        };
    }

    return query;
};
