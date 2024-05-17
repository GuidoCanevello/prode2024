import usuarios_get from "~/server/controllers/usuarios/usuarios_get";
import usuarios_get_with_password from "~/server/controllers/usuarios/usuarios_get_with_password";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const isWithPassword = getQuery(event).isWithPassword;

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