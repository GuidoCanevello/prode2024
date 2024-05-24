import { Partido } from "../../models/Partido.model";

/**
 * Obtiene el listado de todos los Partidos cargados
 * 
 * @param isWithTest Agregar los datos con isTest = true a la lista
 */
export default async function (isWithTest?: boolean) {
    // Por defecto no trae los de Test a menos que se especifique
    let findQuery = {};
    if (isWithTest == undefined || !isWithTest) {
        findQuery = { isTest: { $nin: [true] } }
    }
    const query = await Partido.find(findQuery)
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
};
