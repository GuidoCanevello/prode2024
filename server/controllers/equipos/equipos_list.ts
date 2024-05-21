import { Equipo } from "~/server/models/Equipo.model";

/**
 * Obtiene el listado de todos los Equipos cargados
 * 
 * @param isWithTest Agregar los datos con isTest = true a la lista
 */
export default async function (isWithTest?: boolean) {
    // Por defecto no trae los de Test a menos que se especifique
    const query = await Equipo.find({ isTest: isWithTest ?? false })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
