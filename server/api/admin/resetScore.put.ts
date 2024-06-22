import reset_scores from "~/server/controllers/utils/reset_scores";

export default defineEventHandler(async (event) => {
    const isTest = getQuery(event).isTest == "true";

    try {
        await reset_scores(isTest);
        return;
    } catch (error) {
        handleControllerError(error)
    }
})