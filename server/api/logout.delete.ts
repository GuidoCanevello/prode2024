import refresh_token_delete from "../controllers/token/refresh_token_delete";

export default defineEventHandler(async (event) => {
    const refreshToken = (await readBody(event)).token;

    // No tira error si el token no existe porque no pasa nada
    await refresh_token_delete(refreshToken);

    setResponseStatus(event, 204);
    return;
});