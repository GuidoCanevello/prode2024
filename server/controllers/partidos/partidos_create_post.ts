import mongoose from "mongoose";
import equipos_get from "../equipos/equipos_get";
import { Partido } from "../../models/Partido.model";

/**
 * Crea un Partido nuevo
 *
 * @param data El objeto con todos los datos del Partido (menos el Id que es autogenerado)
 */
export default async function (data: IPartido) {
    data._id = new mongoose.Types.ObjectId();

    if (data.equipo1 != undefined) {
        try {
            await equipos_get(data.equipo1);
        } catch (error: any) {
            throwCustomError(error, "1");
        }
    }
    if (data.equipo2 != undefined) {
        try {
            await equipos_get(data.equipo2);
        } catch (error: any) {
            throwCustomError(error, "2");
        }
    }

    const newUsuario = await Partido.create(data)
        .catch((error) => {
            return {
                content: error,
            };
        });
    return newUsuario;    
};

function throwCustomError(error: any, numEquipo: string) {
    if (Object.hasOwn(error, 'number')) {
        throw {
            number: error.number,
            content: error.number == 400 ? `Id incorrecto para el Equipo ${numEquipo}` : `No se encuentra el Equipo ${numEquipo}`,
        };
    }
}
