import jugadores_list from "~/server/controllers/jugadores/jugadores_list";
import jugadores_list_test from "~/server/controllers/jugadores/jugadores_list_test";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const isWithTest = getQuery(event).isWithTest;
    const isOnlyTest = getQuery(event).isOnlyTest;

    try {
        if (isOnlyTest != undefined && isOnlyTest == "true") {
            return await jugadores_list_test();
        } else {
            return await jugadores_list(isWithTest == "true");
        }
    } catch (error) {
        return handleControllerError(event, error);
    }
})