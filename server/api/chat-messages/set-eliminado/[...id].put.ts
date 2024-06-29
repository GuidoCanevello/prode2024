import chat_messages_set_eliminado from "~/server/controllers/chat-message/chat_messages_set_eliminado";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await chat_messages_set_eliminado(id)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})