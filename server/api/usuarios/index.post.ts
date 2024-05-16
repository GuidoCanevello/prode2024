import bcrypt from 'bcrypt';
import { usuarios_create_post } from "~/server/controllers/Usuario.controller";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const data = (await readBody(event) as IUsuario);

    // Controlar que la password no sea vacia
    if (data.password == undefined) {
        return handleControllerError(event, {
            number: 400,
            content: "Se requiere una Contraseña",
        });
    }

    try {
        data.password = await bcrypt.hash(data.password, 10);

        let response = await usuarios_create_post(data);
        setResponseStatus(event, 201);
        return response;
    } catch (error) {
        return handleControllerError(event, error);
    }
})