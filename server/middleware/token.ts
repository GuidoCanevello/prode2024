import jsonwebtoken from 'jsonwebtoken';

/**
 * For validating Access Tokens
 */
export default defineEventHandler((event) => {
    // Check if the path doesn't need an access token
    const nonSecurePaths = ['/login', '/token', '/logout']; // '/test'
    if (event._path != undefined && !event._path.startsWith('/api') && nonSecurePaths.some(p => `/api${p}` == event._path)) return;

    const authHeader = event.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (token == null || token == undefined) throw createError({ statusCode: 401 })

    if (token != useRuntimeConfig().public.MASTER_TOKEN)
        jsonwebtoken.verify(token, useRuntimeConfig().public.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw createError({ statusCode: 403 });
            // req.user = user;
            // next();
        })
})