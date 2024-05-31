import add_partidos_equipo from "~/server/controllers/utils/add_partidos_equipo";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    try {
        let response = await add_partidos_equipo();
        setResponseStatus(event, 201);
        return response;
    } catch (error) {
        return handleControllerError(event, error);
    }
})