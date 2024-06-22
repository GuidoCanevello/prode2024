import jugadores_put from "~/server/controllers/jugadores/jugadores_put";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = (await readBody(event) as IJugador);

    // REVIEW Add actualizar puntos jugadores_actualizar_mejores

    try {
        const response =  await jugadores_put(id, data)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})