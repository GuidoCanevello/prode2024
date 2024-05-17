import partidos_delete from "~/server/controllers/partidos/partidos_delete";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        return await partidos_delete(id)
    } catch (error) {
        return handleControllerError(event, error);
    }
})