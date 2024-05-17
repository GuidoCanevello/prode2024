import partidos_put from "~/server/controllers/partidos/partidos_put";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = await readBody(event) as IPartido;

    try {
        return await partidos_put(id, data)
    } catch (error) {
        return handleControllerError(event, error);
    }
})