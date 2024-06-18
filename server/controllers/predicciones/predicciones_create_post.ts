import mongoose from "mongoose";
import { Usuario } from "../../models/Usuario.model";
import { Partido } from "~/server/models/Partido.model";

/**
 * Crea una Prediccion nueva
 *
 * @param data El objeto con todos los datos de la Prediccion (menos el Id que es autogenerado)
 */
export default async function (usuarioId: TMongoID, data: IPrediccion) {
    if (data.partidoId === undefined) {
        throw {
            number: 400,
            content: "Se requiere un id de Partido",
        };
    }

    const usuario = await Usuario.findById(usuarioId).exec()
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

    const partido = await Partido.findById(data.partidoId).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "El id del Partido es incorrecto",
                };
            } else {
                throw {
                    content: error,
                };
            }
        });

    if (partido === null) {
        throw {
            number: 404,
            content: "No se encuentra el Partido",
        };
    }

    //* Se fija si ya hay prediccion para el partido
    if (usuario.predicciones.some(p => String(p.partidoId) === String(data.partidoId))) {
        throw {
            number: 409,
            content: "El Partido ya tiene una Prediccion asignada",
        };
    }

    data._id = new mongoose.Types.ObjectId();

    usuario.predicciones.push(data);
    await usuario.save();

    return data;
};
