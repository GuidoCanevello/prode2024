import jugadores_put from "~/server/controllers/jugadores/jugadores_put";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = (await readBody(event) as IJugador);

    // TODO Add actualizar puntos jugadores_actualizar_mejores

    try {
        return await jugadores_put(id, data)
    } catch (error) {
        return handleControllerError(event, error);
    }
})