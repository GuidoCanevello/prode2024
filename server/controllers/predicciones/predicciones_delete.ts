import { Usuario } from "../../models/Usuario.model";

/**
 * Elimina una Prediccion
 *
 * @param usuarioId El Id del Usuario
 * @param prediccionId El Id de la Prediccion
 */
export default async function (usuarioId: TMongoID, prediccionId: TMongoID) {
    const usuario = await Usuario.findById(usuarioId).exec()
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

    if (usuario === null) {
        throw {
            number: 404,
            content: "No se encuentra el Usuario",
        };
    } else {
        const indexElemUsuario = usuario.predicciones.findIndex(p => String(p._id) === String(prediccionId));

        if (indexElemUsuario === -1) {
            throw {
                number: 404,
                content: "No se encuentra la Prediccion",
            };
        } else {
            usuario.predicciones.splice(indexElemUsuario, 1)[0];
            await usuario.save();
            return { acknowledged: true, deletedCount: 1 };
        }
    }
};
