import jsonwebtoken from 'jsonwebtoken';

export default function (user: IUsuario) {
    // REVIEW ver de agregar expiracion
    return jsonwebtoken.sign(user, useRuntimeConfig().public.REFRESH_TOKEN_SECRET);
}