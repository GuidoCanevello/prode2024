import partidos_create_post from "~/server/controllers/partidos/partidos_create_post";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const data = (await readBody(event) as IPartido);

    try {
        let response = await partidos_create_post(data);
        setResponseStatus(event, 201);
        return response;
    } catch (error) {
        return handleControllerError(event, error);
    }
})