import mongoose from "mongoose";
import { Jugador } from "~/server/models/Jugador.model";

/**
 * Crea un Jugador nuevo
 *
 * @param data El objeto con todos los datos del Jugador (menos el Id que es autogenerado)
 */
export default async function (data: IJugador) {
    data._id = new mongoose.Types.ObjectId();

    const newJugador = await Jugador.create(data)
        .catch((error) => {
            return {
                content: error,
            };
        });
    return newJugador;
};
