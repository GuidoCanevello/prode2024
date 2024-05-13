import { jugadores_delete } from "~/server/controllers/Jugador.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        return await jugadores_delete(id)
    } catch (error) {
        return handleControllerError(event, error);
    }
})