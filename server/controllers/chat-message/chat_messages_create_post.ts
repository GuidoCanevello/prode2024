import mongoose from "mongoose";
import { ChatMessage } from "~/server/models/ChatMessage.model";
import { Usuario } from "~/server/models/Usuario.model";

/**
 * Crea un Mensaje de Chat nuevo
 *
 * @param data El objeto con todos los datos del Mensaje de Chat (menos el Id que es autogenerado)
 */
export default async function (data: IChatMessage) {
    if (data.usuarioId === undefined) {
        throw {
            number: 400,
            content: "Se requiere un id de Usuario",
        };
    }

    const usuario = await Usuario.findById(data.usuarioId).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "El id de Usuario es incorrecto",
                };
            } else {
                throw {
                    content: error,
                };
            }
        });

    if (usuario === null) {
        throw {
            number: 404,
            content: "No se encuentra el Usuario",
        };
    }

    data._id = new mongoose.Types.ObjectId();

    const newChatMessage = await ChatMessage.create(data)
        .catch((error) => {
            return {
                content: error,
            };
        });
    return newChatMessage;
};
