import mongoose from "mongoose";
import { Jugador } from "~/server/models/Jugador.model";
import { usuarios_list, usuarios_put } from "./Usuario.controller";

/**
 * Obtiene el listado de todos los Jugadores cargados
 */
export const jugadores_list = async function () {
    const query = await Jugador.find()
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
}

/**
 * Obtiene un Jugador segun su Id
 * 
 * @param id El Id del Jugador
 */
export const jugadores_get = async function (id: TMongoID) {
    const query = await Jugador.findById(id).exec()
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
            content: "No se encuentra el Jugador",
        }
    }

    return query;
}

/**
 * Crea un Jugador nuevo
 * 
 * @param data El objeto con todos los datos del Jugador (menos el Id que es autogenerado)
 */
export const jugadores_create_post = async function (data: IJugador) {
    data._id = new mongoose.Types.ObjectId();

    const newJugador = await Jugador.create(data)
        .catch((error) => {
            return {
                content: error,
            }
        });
    return newJugador;
}

/**
 * Actualiza los datos de un Jugador
 * 
 * @param id El Id del Jugador a modificar
 * @param data Los datos actualizados del Jugador (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export const jugadores_put = async function (id: TMongoID, data: IJugador) {
    data._id = undefined;

    const query = await Jugador.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
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
            content: "No se encuentra el Jugador",
        }
    }

    return query;
}

/**
 * Elimina un Jugador 
 * 
 * @param id El Id del Jugador
 */
export const jugadores_delete = async function (id: TMongoID) {
    const answer = await Jugador.deleteOne({ _id: id }).exec()
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
            content: "No se encuentra el Jugador",
        }
    }

    return answer;
}


export const jugadores_actualizar_mejores = async function (idMejorJugador: TMongoID, idMejorArquero: TMongoID, idMejorGoleador: TMongoID) {
    const queryMejorJugador = await Jugador.findOneAndUpdate({ _id: idMejorJugador }, { esMejorJugador: true }).exec()
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

    if (queryMejorJugador === null) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        }
    }

    const queryMejorArquero = await Jugador.findOneAndUpdate({ _id: idMejorArquero }, { esMejorArquero: true }).exec()
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

    if (queryMejorArquero === null) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        }
    }

    const queryMejorGoleador = await Jugador.findOneAndUpdate({ _id: idMejorGoleador }, { esMejorGoleador: true }).exec()
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

    if (queryMejorGoleador === null) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        }
    }

    const usuarios = await usuarios_list();
    const puntosPorAcierto = 6;

    for (const usuario of usuarios) {
        let puntosJugadores = 0;

        puntosJugadores += String(usuario.prediccionMejorJugador) == String(idMejorJugador) ? puntosPorAcierto : 0;
        puntosJugadores += String(usuario.prediccionMejorArquero) == String(idMejorArquero) ? puntosPorAcierto : 0;
        puntosJugadores += String(usuario.prediccionMejorGoleador) == String(idMejorGoleador) ? puntosPorAcierto : 0;

        await usuarios_put(usuario._id, { puntos: usuario.puntos + puntosJugadores });
    }

    return true;
}