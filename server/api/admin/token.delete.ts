import refresh_token_delete_all from "~/server/controllers/token/refresh_token_delete_all";

export default defineEventHandler(async (event) => {
    refresh_token_delete_all()
        .then((answer) => {
            return answer
        })
        .catch((error) => {
            handleControllerError(error)
        });
});