import chat_messages_delete from "~/server/controllers/chat-message/chat_messages_delete";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await chat_messages_delete(id)
        return response;
    } catch (error) {
        handleControllerError(error)
    }
})