import jugadores_delete from "~/server/controllers/jugadores/jugadores_delete";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await jugadores_delete(id)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})