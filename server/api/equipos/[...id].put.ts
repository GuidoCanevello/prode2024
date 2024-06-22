import equipos_put from "~/server/controllers/equipos/equipos_put";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = await readBody(event) as IEquipo;

    try {
        const response = await equipos_put(id, data)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})