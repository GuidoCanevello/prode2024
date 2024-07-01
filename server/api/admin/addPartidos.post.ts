import add_partidos_equipo from "~/server/controllers/utils/add_partidos_equipo";
import add_partidos_final from "~/server/controllers/utils/add_partidos_final";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const isFinales = getQuery(event).isFinales;

    try {
        let response;
        if (isFinales == "true") {
            response = await add_partidos_final();
        } else {
            response = await add_partidos_equipo();
        }
        setResponseStatus(event, 201);
        return response;
    } catch (error) {
        handleControllerError(error)
    }
})