import equipos_list from "~/server/controllers/equipos/equipos_list";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    try {
        return await equipos_list();
    } catch (error) {
        return handleControllerError(event, error);
    }
})