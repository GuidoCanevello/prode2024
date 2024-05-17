import mongoose from "mongoose";
import { Equipo } from "~/server/models/Equipo.model";

/**
 * Crea un Equipo nuevo
 *
 * @param data El objeto con todos los datos del Equipo (menos el Id que es autogenerado)
 */
export default async function (data: IEquipo) {
    if (data.nombre === undefined) throw {
        number: 400,
        content: "Se requiere un Nombre de Equipo",
    };

    data._id = new mongoose.Types.ObjectId();

    const newEquipo = await Equipo.create(data)
        .catch((error) => {
            return {
                content: error,
            };
        });
    return newEquipo;
};
