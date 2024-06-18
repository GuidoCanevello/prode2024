import partidos_list from "~/server/controllers/partidos/partidos_list";
import partidos_list_test from "~/server/controllers/partidos/partidos_list_test";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const isWithTest = getQuery(event).isWithTest;
    const isOnlyTest = getQuery(event).isOnlyTest;

    try {
        if (isOnlyTest != undefined && isOnlyTest == "true") {
            return await partidos_list_test();
        } else {
            return await partidos_list(isWithTest == "true");
        }
    } catch (error) {
        handleControllerError(error)
    }
})