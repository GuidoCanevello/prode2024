import { Partido } from "../../models/Partido.model";
import actualizarPuntosFaseFinal from "./actualizarPuntaje/actualizarPuntosFaseFinal";
import actualizarPuntosFaseGrupos from "./actualizarPuntaje/actualizarPuntosFaseGrupos";

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

    if (data.golesEquipo1 != undefined && data.golesEquipo2 != undefined) data.seRealizo = true;

    const query = await Partido.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                // REVIEW Cambiar error, da cuando un valor de data esta mal tamb
                throw {
                    number: 400,
                    content: "Id incorrecto",
                };
            } else {
                throw { content: error };
            }
        });

    // REVIEW test con Postman ambos
    // Si se modifican los goles, actualiza los puntos.
    if (data.golesEquipo1 != undefined && data.golesEquipo2 != undefined) {
        if (data.esEliminatoria) await actualizarPuntosFaseFinal((query as IPartido));
        else await actualizarPuntosFaseGrupos(id, data.golesEquipo1, data.golesEquipo2);
    }

    if (query === null) {
        throw {
            number: 404,
            content: "No se encuentra el Partido",
        };
    }

    return query;
};
