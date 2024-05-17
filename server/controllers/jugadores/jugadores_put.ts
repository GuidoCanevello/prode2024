import { Jugador } from "~/server/models/Jugador.model";

/**
 * Actualiza los datos de un Jugador
 *
 * @param id El Id del Jugador a modificar
 * @param data Los datos actualizados del Jugador (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export default async function (id: TMongoID, data: IJugador) {
    data._id = undefined;

    const query = await Jugador.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
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

    if (query === null) {
        throw {
            number: 404,
            content: "No se encuentra el Jugador",
        };
    }

    return query;
};
