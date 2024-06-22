import partidos_put from "~/server/controllers/partidos/partidos_put";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = await readBody(event) as IPartido;

    try {
        const response = await partidos_put(id, data)
        return response;
    } catch (error) {
        handleControllerError(error)
    }
})