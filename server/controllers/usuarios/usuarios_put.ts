import { Usuario } from "../../models/Usuario.model";
import jugadores_get from "../jugadores/jugadores_get";

/**
 * Actualiza los datos de un Usuario
 *
 * @param id El Id del Usuario a modificar
 * @param data Los datos actualizados del Usuario (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export default async function (id: TMongoID, data: IUsuario) {
    data._id = undefined;

    // Validar que todos los Ids de Jugadores son validos (get tira error si no existe)
    if (data.prediccionMejorJugador != undefined) await jugadores_get(data.prediccionMejorJugador);
    if (data.prediccionMejorArquero != undefined) await jugadores_get(data.prediccionMejorArquero);
    if (data.prediccionMejorGoleador != undefined) await jugadores_get(data.prediccionMejorGoleador);

    const query = await Usuario.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
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
            content: "No se encuentra al Usuario",
        };
    }

    return query;
};
