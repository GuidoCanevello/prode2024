import jsonwebtoken from 'jsonwebtoken';

export default function (user: IUsuario) {
    return jsonwebtoken.sign(user, useRuntimeConfig().public.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}