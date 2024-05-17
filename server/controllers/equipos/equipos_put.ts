import { Equipo } from "~/server/models/Equipo.model";

/**
 * Actualiza los datos de un Equipo
 *
 * @param id El Id del Equipo a modificar
 * @param data Los datos actualizados del Equipo (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export default async function (id: TMongoID, data: IEquipo) {
    data._id = undefined;

    const query = await Equipo.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
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
            content: "No se encuentra el Equipo",
        };
    }

    return query;
};
