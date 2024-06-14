import jsonwebtoken from 'jsonwebtoken';
import generateAccessToken from '../utils/generateAccessToken';
import refresh_token_exists from '../controllers/token/refresh_token_exists';

export default defineEventHandler(async (event) => {
    const refreshToken = (await readBody(event)).token;

    if (refreshToken == null) throw createError({ statusCode: 401 })

    let tokenExists = await refresh_token_exists(refreshToken);
    if (!tokenExists) throw createError({ statusCode: 403 })

    jsonwebtoken.verify(refreshToken, useRuntimeConfig().public.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) throw createError({ statusCode: 403 })

        const accessToken = generateAccessToken({
            _id: user._id,
            nombreCuenta: user.nombreCuenta,
        });

        setResponseStatus(event, 200);
        return { accessToken };
    })
});