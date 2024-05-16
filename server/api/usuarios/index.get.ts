import { usuarios_list } from "~/server/controllers/Usuario.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    try {
        return await usuarios_list();
    } catch (error) {
        return handleControllerError(event, error);
    }
})