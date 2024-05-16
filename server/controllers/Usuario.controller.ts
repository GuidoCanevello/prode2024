import mongoose from "mongoose";
import { Usuario } from "../models/Usuario.model";
import { jugadores_get } from './Jugador.controller';

/**
 * Obtiene el listado de todos los Usuarios cargados
 */
export const usuarios_list = async function () {
    const query = await Usuario.find()
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
}

/**
 * Obtiene un Usuario segun su Id
 * 
 * @param id El Id del Usuario
 */
export const usuarios_get = async function (id: TMongoID) {
    const query = await Usuario.findById(id).exec()
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
            content: "No se encuentra el Usuario",
        }
    }

    return query;
}

/**
 * Crea un Usuario nuevo
 * 
 * @param data El objeto con todos los datos del Usuario (menos el Id que es autogenerado)
 */
export const usuarios_create_post = async function (data: IUsuario) {
    data._id = new mongoose.Types.ObjectId;

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
            }
        });
    return newUsuario;
}

/**
 * Actualiza los datos de un Usuario
 * 
 * @param id El Id del Usuario a modificar
 * @param data Los datos actualizados del Usuario (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export const usuarios_put = async function (id: TMongoID, data: IUsuario) {
    data._id = undefined;

    const query = await Usuario.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
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
            content: "No se encuentra al Usuario",
        }
    }

    return query;
}

/**
 * Elimina un Usuario 
 * 
 * @param id El Id del Usuario
 */
export const usuarios_delete = async function (id: TMongoID) {
    const answer = await Usuario.deleteOne({ _id: id }).exec()
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
            content: "No se encuentra el Usuario",
        }
    }

    return answer;
}

/**
 * Obtiene un Usuario segun su Nombre de la Cuenta y agrega la contraseña a los datos.
 * 
 * @param nombreCuenta El nombre de la cuenta del Usuario
 */
export const usuarios_get_by_name_with_password = async function (nombreCuenta: string) {
    const query = await Usuario.findOne({ nombreCuenta }).select('+password').exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Nombre incorrecto",
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
            content: "No se encuentra el Usuario",
        }
    }

    return query;
}

/**
 * Obtiene un Usuario segun su Id y agrega la contraseña a los datos.
 * 
 * @param id El Id del Usuario
 */
export const usuarios_get_with_password = async function (id: TMongoID) {
    const query = await Usuario.findById(id).select('+password').exec()
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
            content: "No se encuentra el Usuario",
        }
    }

    return query;
}

/**
 * Actualiza los datos de las predicciones de Jugadores de un Usuario
 * 
 * @param id El Id del Usuario
 * @param prediccionMejorJugador El Id del Jugador a establecer como prediccion de Mejor Jugador
 * @param prediccionMejorArquero El Id del Jugador a establecer como prediccion de Mejor Arquero
 * @param prediccionMejorGoleador El Id del Jugador a establecer como prediccion de Mejor Goleador
 */
export const usuarios_put_prediccion_jugador = async function (id: TMongoID, prediccionMejorJugador: TMongoID, prediccionMejorArquero: TMongoID, prediccionMejorGoleador: TMongoID) {
    if (prediccionMejorJugador != undefined) await jugadores_get(prediccionMejorJugador);
    if (prediccionMejorArquero != undefined) await jugadores_get(prediccionMejorArquero);
    if (prediccionMejorGoleador != undefined) await jugadores_get(prediccionMejorGoleador);

    const query = await Usuario.findOneAndUpdate({ _id: id }, {
        prediccionMejorJugador,
        prediccionMejorArquero,
        prediccionMejorGoleador
    }, { new: true }).exec()
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
            content: "No se encuentra al Usuario",
        }
    }

    return query;
}