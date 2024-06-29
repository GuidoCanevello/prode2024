import chat_messages_create_post from "~/server/controllers/chat-message/chat_messages_create_post";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const data = (await readBody(event) as IChatMessage);

    try {
        let response = await chat_messages_create_post(data);
        setResponseStatus(event, 201);

        for (const client of globalThis.clients) {
            client.emit('newMessage', data)
        }

        return response;
    } catch (error) {
        handleControllerError(error)
    }
})