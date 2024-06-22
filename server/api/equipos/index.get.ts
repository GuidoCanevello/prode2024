import equipos_list from "~/server/controllers/equipos/equipos_list";
import equipos_list_test from "~/server/controllers/equipos/equipos_list_test";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const isWithTest = getQuery(event).isWithTest;
    const isOnlyTest = getQuery(event).isOnlyTest;

    try {
        if (isOnlyTest != undefined && isOnlyTest == "true") {
            const response = await equipos_list_test();
            return response
        } else {
            const response = await equipos_list(isWithTest == "true");
            return response
        }
    } catch (error) {
        handleControllerError(error)
    }
})