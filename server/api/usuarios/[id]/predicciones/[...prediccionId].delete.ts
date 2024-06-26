import predicciones_delete from "~/server/controllers/predicciones/predicciones_delete";
import handleControllerError from "~/server/utils/handleControllerError";

// REVIEW test con Postman todo lo de Predicciones
export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const prediccionId = event.context.params?.prediccionId;

    try {
        const response = await predicciones_delete(id, prediccionId)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})