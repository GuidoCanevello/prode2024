import partidos_list from "~/server/controllers/partidos/partidos_list";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    try {
        return await partidos_list();
    } catch (error) {
        return handleControllerError(event, error);
    }
})