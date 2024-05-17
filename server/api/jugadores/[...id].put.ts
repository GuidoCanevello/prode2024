import jugadores_put from "~/server/controllers/jugadores/jugadores_put";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = (await readBody(event) as IJugador);

    try {
        return await jugadores_put(id, data)
    } catch (error) {
        return handleControllerError(event, error);
    }
})