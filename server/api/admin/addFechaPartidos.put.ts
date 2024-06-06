import add_fecha_partidos from "~/server/controllers/utils/add_fecha_partidos";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    try {
        let response = await add_fecha_partidos();
        setResponseStatus(event, 200);
        return response;
    } catch (error) {
        return handleControllerError(event, error);
    }
})