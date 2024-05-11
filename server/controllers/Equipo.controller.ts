import mongoose from "mongoose";
import { Equipo } from "~/server/models/Equipo.model";

/**
 * Obtiene el listado de todos los Equipos cargados
 */
export const equipos_list = async function () {
    const query = await Equipo.find()
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
}

/**
 * Obtiene un Equipo segun su Id
 * 
 * @param id El Id del Equipo
 */
export const equipos_get = async function (id: TMongoID) {
    const query = await Equipo.findById(id).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                }
            } else {
                throw {
                    content: error,
                }
            }
        });

    if (query === null) {
        throw {
            number: 404,
            content: "No se encuentra el Equipo",
        }
    }

    return query;
}

/**
 * Crea un Equipo nuevo
 * 
 * @param data El objeto con todos los datos del Equipo (menos el Id que es autogenerado)
 */
export const equipos_create_post = async function (data: IEquipo) {
    if (data.nombre === undefined) throw {
        number: 400,
        content: "Se requiere un Nombre de Equipo",
    }

    data._id = new mongoose.Types.ObjectId();

    const newUsuario = await Equipo.create(data)
        .catch((error) => {
            return {
                content: error,
            }
        });
    return newUsuario;
}

/**
 * Actualiza los datos de un Equipo
 * 
 * @param id El Id del Equipo a modificar
 * @param data Los datos actualizados del Equipo (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export const equipos_put = async function (id: TMongoID, data: IEquipo) {
    data._id = undefined;

    const query = await Equipo.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                }
            } else {
                throw {
                    content: error,
                }
            }
        });

    if (query === null) {
        throw {
            number: 404,
            content: "No se encuentra el Equipo",
        }
    }

    return query;
}

/**
 * Elimina un Equipo 
 * 
 * @param id El Id del Equipo
 */
export const equipos_delete = async function (id: TMongoID) {
    const answer = await Equipo.deleteOne({ _id: id }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                }
            } else {
                throw {
                    content: error,
                }
            }
        });

    if (answer.deletedCount === 0) {
        throw {
            number: 404,
            content: "No se encuentra el Equipo",
        }
    }

    return answer;
}