import { usuarios_get, usuarios_get_with_password } from "~/server/controllers/Usuario.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const isWithPassword = (await readBody(event)).isWithPassword;

    try {
        if (isWithPassword != undefined && !isWithPassword) {
            return await usuarios_get(id);
        }else {
            return await usuarios_get_with_password(id);
        }
    } catch (error) {
        return handleControllerError(event, error);
    }
})