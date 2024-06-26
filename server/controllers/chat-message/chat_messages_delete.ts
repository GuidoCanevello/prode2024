import { ChatMessage } from "~/server/models/ChatMessage.model";

/**
 * Elimina un Mensaje de Chat
 *
 * @param id El Id del Mensaje de Chat
 */
export default async function (id: TMongoID) {
    const answer = await ChatMessage.deleteOne({ _id: id }).exec()
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
            content: "No se encuentra el Mensaje de Chat",
        };
    }

    return answer;
};
