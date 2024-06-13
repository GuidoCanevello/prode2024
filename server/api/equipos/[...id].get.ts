import equipos_get from "~/server/controllers/equipos/equipos_get";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        return await equipos_get(id)
    } catch (error) {
        handleControllerError(error)
    }
})