import { Usuario } from "../../models/Usuario.model";

/**
 * Obtiene un Usuario segun su Nombre de la Cuenta y agrega la contraseña a los datos.
 *
 * @param nombreCuenta El nombre de la cuenta del Usuario
 */
export default async function (nombreCuenta: string) {
    const query = await Usuario.findOne({ nombreCuenta }).select('+password').exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Nombre incorrecto",
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
