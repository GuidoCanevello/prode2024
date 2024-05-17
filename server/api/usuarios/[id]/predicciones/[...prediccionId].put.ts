import predicciones_put from "~/server/controllers/predicciones/predicciones_put";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const prediccionId = event.context.params?.prediccionId;
    const data = await readBody(event) as IPrediccion;

    try {
        return await predicciones_put(id, prediccionId, data)
    } catch (error) {
        return handleControllerError(event, error);
    }
})