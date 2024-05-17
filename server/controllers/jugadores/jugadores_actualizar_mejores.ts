import { Jugador } from "~/server/models/Jugador.model";
import { usuarios_put } from "../usuarios/usuarios_put";
import { usuarios_list } from "../usuarios/usuarios_list";

/**
 * Actualiza los resultados de votacion de Mejores Jugadores
 * 
 * @param idMejorJugador El Id del Jugador
 * @param idMejorArquero El Id del Jugador
 * @param idMejorGoleador El Id del Jugador
 */
export default async function (idMejorJugador: TMongoID, idMejorArquero: TMongoID, idMejorGoleador: TMongoID) {
    const queryMejorJugador = await Jugador.findOneAndUpdate({ _id: idMejorJugador }, { esMejorJugador: true }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                };
            } else {
                throw {
                    content: error,
                };
            }
        });

    if (queryMejorJugador === null) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        };
    }

    const queryMejorArquero = await Jugador.findOneAndUpdate({ _id: idMejorArquero }, { esMejorArquero: true }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                };
            } else {
                throw {
                    content: error,
                };
            }
        });

    if (queryMejorArquero === null) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        };
    }

    const queryMejorGoleador = await Jugador.findOneAndUpdate({ _id: idMejorGoleador }, { esMejorGoleador: true }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                };
            } else {
                throw {
                    content: error,
                };
            }
        });

    if (queryMejorGoleador === null) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        };
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
};
