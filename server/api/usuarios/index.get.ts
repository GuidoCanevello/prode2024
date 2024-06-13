import usuarios_list from "~/server/controllers/usuarios/usuarios_list";
import usuarios_list_test from "~/server/controllers/usuarios/usuarios_list_test";
import handleControllerError from "~/server/utils/handleControllerError";

export default defineEventHandler(async (event) => {
    const isWithTest = getQuery(event).isWithTest;
    const isOnlyTest = getQuery(event).isOnlyTest;

    try {
        if (isOnlyTest != undefined && isOnlyTest == "true") {
            return await usuarios_list_test();
        } else {
            return await usuarios_list(isWithTest == "true");
        }
    } catch (error) {
        handleControllerError(error)
    }
})