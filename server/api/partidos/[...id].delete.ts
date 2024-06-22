import partidos_delete from "~/server/controllers/partidos/partidos_delete";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await partidos_delete(id)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})