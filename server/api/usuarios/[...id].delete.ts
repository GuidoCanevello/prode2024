import usuarios_delete from "~/server/controllers/usuarios/usuarios_delete";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    try {
        const response = await usuarios_delete(id)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})