import { usuarios_delete } from "~/server/controllers/Usuario.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        return await usuarios_delete(id)
    } catch (error) {
        return handleControllerError(event, error);
    }
})