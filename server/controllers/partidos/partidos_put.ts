import { Partido } from "../../models/Partido.model";

/**
 * Actualiza los datos de un Partido
 *
 * @param id El Id del Partido a modificar
 * @param data Los datos actualizados del Partido (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export default async function (id: TMongoID, data: IPartido) {
    data._id = undefined;

    if (data.equipo1 == "") data.equipo1 = undefined;
    if (data.equipo2 == "") data.equipo2 = undefined;

    const query = await Partido.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                // TODO Cambiar error, da cuando un valor de data esta mal tamb
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
            content: "No se encuentra el Partido",
        };
    }

    return query;
};
