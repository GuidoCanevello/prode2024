import partidos_list from "~/server/controllers/partidos/partidos_list";
import partidos_list_test from "~/server/controllers/partidos/partidos_list_test";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const isWithTest = getQuery(event).isWithTest;
    const isOnlyTest = getQuery(event).isOnlyTest;

    try {
        if (isOnlyTest != undefined && isOnlyTest == "true") {
            const response = await partidos_list_test();
            return response
        } else {
            const response = await partidos_list(isWithTest == "true");
            return response
        }
    } catch (error) {
        handleControllerError(error)
    }
})