import jugadores_get from "~/server/controllers/jugadores/jugadores_get";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await jugadores_get(id)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})