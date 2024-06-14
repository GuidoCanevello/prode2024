import jsonwebtoken from 'jsonwebtoken';
import { Types } from 'mongoose';

export default function (user: IUsuario) {
    return jsonwebtoken.sign(user, useRuntimeConfig().public.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}