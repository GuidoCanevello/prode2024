import jsonwebtoken from 'jsonwebtoken';

/**
 * For validating Access Tokens
 */
export default defineEventHandler((event) => {
    if (checkAllowedCases(event)) return;

    // Check token
    const authHeader = event.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (token == null || token == undefined) throw createError({ statusCode: 401 })

    if (token != useRuntimeConfig().public.MASTER_TOKEN)
        jsonwebtoken.verify(token, useRuntimeConfig().public.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw createError({ statusCode: 403 });
        })
})

/**
 * Check allowed cases, when the token is not necessary
 */
function checkAllowedCases(event: { _path?: string | undefined, method: string, [key: string | number | symbol]: any }) {
    //* Check if the Path is undefined
    if (event._path == undefined) return true;

    //* Check only server paths (elements in the folder /server/api)
    if (!event._path.startsWith('/api')) return true;

    //* Specific path exceptions
    if (['/login', '/token', '/logout', '/test'].some(p =>
        `/api${p}` == event._path) ||
        event._path.startsWith('/api/_content') ||
        event._path.startsWith('/api/socket.io')
    ) return true;

    //* Allow any GET functions for Equipos and Partidos
    if (event.method == "GET" && ['/equipos', '/partidos', '/jugadores'].some(p => event._path?.startsWith(`/api${p}`))) return true;

    //* Allow general GET function for Usuario
    if (event.method == "GET" && (event._path.startsWith('/api/usuarios?') || event._path == '/api/usuarios')) return true;

    return false;
}

