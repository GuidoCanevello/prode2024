import { Usuario } from "../../models/Usuario.model";

/**
 * Actualiza los datos de una Prediccion
 *
 * @param usuarioId El Id del Usuario
 * @param prediccionId El Id de la Prediccion a modificar
 * @param data Los datos actualizados de la Prediccion (no es necesario que vengan todos, solo los que se van a actualizar)
 */
export default async function (usuarioId: TMongoID, prediccionId: TMongoID, data: IPrediccion) {
    if (data.partidoId) {
        throw {
            number: 403,
            content: "No se puede modificar el partido",
        };
    }

    const usuario = await Usuario.findById(usuarioId).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "El id de Usuario es incorrecto",
                };
            } else {
                throw {
                    content: error,
                };
            }
        });

    if (usuario === null) {
        throw {
            number: 404,
            content: "No se encuentra el Usuario",
        };
    }

    //* Actualizar prediccion
    const prediccionIndex = usuario.predicciones.findIndex(p => String(p._id) === String(prediccionId));
    if (prediccionIndex === -1) {
        throw {
            number: 404,
            content: "No se encuentra la prediccion",
        };
    } else {
        usuario.predicciones[prediccionIndex].golesEquipo1 = data.golesEquipo1 != undefined ? data.golesEquipo1 : usuario.predicciones[prediccionIndex].golesEquipo1;
        usuario.predicciones[prediccionIndex].golesEquipo2 = data.golesEquipo2 != undefined ? data.golesEquipo2 : usuario.predicciones[prediccionIndex].golesEquipo2;
        usuario.predicciones[prediccionIndex].puntos = data.puntos != undefined ? data.puntos : usuario.predicciones[prediccionIndex].puntos;
        usuario.predicciones[prediccionIndex].partidoId = usuario.predicciones[prediccionIndex].partidoId;

        await usuario.save();

        return usuario.predicciones[prediccionIndex];
    }
};
