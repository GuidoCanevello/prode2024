import mongoose from "mongoose";
import { Usuario } from "../../models/Usuario.model";

/**
 * Crea un Usuario nuevo
 *
 * @param data El objeto con todos los datos del Usuario (menos el Id que es autogenerado)
 */
export default async function (data: IUsuario) {
    data._id = new mongoose.Types.ObjectId();

    if (data.nombreJugador == undefined) {
        if (data.nombreCuenta?.includes('@')) {
            data.nombreJugador = data.nombreCuenta.substring(0, data.nombreCuenta.indexOf('@'));
        } else {
            data.nombreJugador = data.nombreCuenta;
        }
    }

    const newUsuario = await Usuario.create(data)
        .catch((error) => {
            return {
                content: error,
            };
        });
    return newUsuario;
};
