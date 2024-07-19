import { Jugador } from "~/server/models/Jugador.model";
import usuarios_put from "../usuarios/usuarios_put";
import usuarios_list from "../usuarios/usuarios_list";
import usuarios_list_test from "../usuarios/usuarios_list_test";

const PUNTOS_POR_ACTIERTO = 6;

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

    let usuarios;
    if (queryMejorJugador.isTest) {
        usuarios = await usuarios_list_test();
    } else {
        usuarios = await usuarios_list();
    }

    // TODO actualizar puntos si ya sume para no hacerlo 2 veces

    for (const usuario of usuarios) {
        let puntosJugadores = 0;

        if (usuario.nombreCuenta == "UTEST01") console.log(usuario.prediccionMejorJugador, idMejorJugador, String(usuario.prediccionMejorJugador) == String(idMejorJugador))

        puntosJugadores += String(usuario.prediccionMejorJugador) == String(idMejorJugador) ? PUNTOS_POR_ACTIERTO : 0;
        puntosJugadores += String(usuario.prediccionMejorArquero) == String(idMejorArquero) ? PUNTOS_POR_ACTIERTO : 0;
        puntosJugadores += String(usuario.prediccionMejorGoleador) == String(idMejorGoleador) ? PUNTOS_POR_ACTIERTO : 0;

        await usuarios_put(usuario._id, { puntos: usuario.puntos + puntosJugadores });
    }

    return true;
};
