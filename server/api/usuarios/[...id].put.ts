import bcrypt from 'bcrypt';
import usuarios_put from '~/server/controllers/usuarios/usuarios_put';
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const data = (await readBody(event) as IUsuario);

    if (data.password != undefined) data.password = await bcrypt.hash(data.password, 10);

    try {
        const response = await usuarios_put(id, data)
        return response
    } catch (error) {
        handleControllerError(error)
    }
})