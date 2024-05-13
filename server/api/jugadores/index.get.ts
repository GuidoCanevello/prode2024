import { jugadores_list } from "~/server/controllers/Jugador.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    try {
        return await jugadores_list();
    } catch (error) {
        return handleControllerError(event, error);
    }
})