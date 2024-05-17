import predicciones_delete from "~/server/controllers/predicciones/predicciones_delete";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const prediccionId = event.context.params?.prediccionId;

    try {
        return await predicciones_delete(id, prediccionId)
    } catch (error) {
        return handleControllerError(event, error);
    }
})