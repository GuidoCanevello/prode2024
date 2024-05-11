import { equipos_delete } from "~/server/controllers/Equipo.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        return await equipos_delete(id)
    } catch (error) {
        return handleControllerError(event, error);
    }
})