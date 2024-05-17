import predicciones_create_post from "~/server/controllers/predicciones/predicciones_create_post";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = (await readBody(event) as IPrediccion);

    try {
        let response = await predicciones_create_post(id, data);
        setResponseStatus(event, 201);
        return response;
    } catch (error) {
        return handleControllerError(event, error);
    }
})