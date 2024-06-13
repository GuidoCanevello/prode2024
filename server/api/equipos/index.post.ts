import equipos_create_post from "~/server/controllers/equipos/equipos_create_post";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const data = (await readBody(event) as IEquipo);

    try {
        let response = await equipos_create_post(data);
        setResponseStatus(event, 201);
        return response;
    } catch (error) {
        handleControllerError(error)
    }
})