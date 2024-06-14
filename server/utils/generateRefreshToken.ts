import jsonwebtoken from 'jsonwebtoken';
import { Types } from 'mongoose';

export default function (user: IUsuario) {
    // TODO ver de agregar expiracion
    return jsonwebtoken.sign(user, useRuntimeConfig().public.REFRESH_TOKEN_SECRET);
}