import { Usuario } from "../../models/Usuario.model";

/**
 * Obtiene un Usuario segun su Id
 *
 * @param id El Id del Usuario
 */
export default async function (id: TMongoID) {
    const query = await Usuario.findById(id).exec()
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
            content: "No se encuentra el Usuario",
        };
    }

    return query;
};
