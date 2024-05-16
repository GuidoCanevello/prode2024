import bcrypt from 'bcrypt';
import { usuarios_put } from "~/server/controllers/Usuario.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = (await readBody(event) as IUsuario);

    if (data.password != undefined) data.password = await bcrypt.hash(data.password, 10);

    try {
        return await usuarios_put(id, data)
    } catch (error) {
        return handleControllerError(event, error);
    }
})