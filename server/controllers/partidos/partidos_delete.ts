import usuarios_list from "../usuarios/usuarios_list";
import usuarios_put from "../usuarios/usuarios_put";
import { Partido } from "../../models/Partido.model";

/**
 * Elimina un Partido y las Predicciones asociadas
 *
 * @param id El Id del Partido
 */
export default async function (id: TMongoID) {
    const answer = await Partido.deleteOne({ _id: id }).exec()
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

    if (answer.deletedCount === 0) {
        throw {
            number: 404,
            content: "No se encuentra el Partido",
        };
    } else {
        // Si se borra el Partido, borrar las Predicciones asociadas
        const usuarios = await usuarios_list();

        for (const usuario of usuarios) {
            await usuarios_put(usuario.id, {
                predicciones: usuario.predicciones.filter(p => p.partidoId != id)
            })
        }
    }
    return answer;
};
