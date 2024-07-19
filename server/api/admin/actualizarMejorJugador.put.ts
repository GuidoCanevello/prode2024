
import jugadores_actualizar_mejores from "~/server/controllers/jugadores/jugadores_actualizar_mejores";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const data = await readBody(event) as {
        idMejorJugador: TMongoID;
        idMejorArquero: TMongoID; 
        idMejorGoleador: TMongoID;
    };

    if (data.idMejorJugador == undefined || data.idMejorJugador == "" || 
        data.idMejorArquero == undefined || data.idMejorArquero == "" || 
        data.idMejorGoleador == undefined || data.idMejorGoleador == "") handleControllerError({
            number: 400,
            content: "Id Faltante",
        })

    try {
        let response = await jugadores_actualizar_mejores(data.idMejorJugador, data.idMejorArquero, data.idMejorGoleador);
        setResponseStatus(event, 200);
        return response;
    } catch (error) {
        handleControllerError(error)
    }
})