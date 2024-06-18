import { Usuario } from "../../models/Usuario.model";

/**
 * Obtiene el listado de todos los Usuarios cargados
 */
export default async function () {
    const query = await Usuario.find({ isTest: true })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
