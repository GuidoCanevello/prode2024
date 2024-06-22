import usuarios_get from "~/server/controllers/usuarios/usuarios_get";
import usuarios_get_with_password from "~/server/controllers/usuarios/usuarios_get_with_password";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const isWithPassword = getQuery(event).isWithPassword;

    try {
        if (isWithPassword == undefined || isWithPassword != "true") {
            const response = await usuarios_get(id);
            return response
        }else {
            const response = await usuarios_get_with_password(id);
            return response
        }
    } catch (error) {
        handleControllerError(error)
    }
})