import partidos_get from "~/server/controllers/partidos/partidos_get";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await partidos_get(id)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})