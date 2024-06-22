import equipos_delete from "~/server/controllers/equipos/equipos_delete";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await equipos_delete(id)
        return response;
    } catch (error) {
        handleControllerError(error)
    }
})