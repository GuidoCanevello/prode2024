import { ChatMessage } from "~/server/models/ChatMessage.model";

/**
 * Obtiene el listado de todos los Mensajes de Chat de test cargados
 */
export default async function () {
    const query = await ChatMessage.find({ isTest: true })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
