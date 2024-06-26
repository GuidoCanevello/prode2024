import equipos_get from "~/server/controllers/equipos/equipos_get";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await equipos_get(id)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})