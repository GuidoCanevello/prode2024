import bcrypt from 'bcrypt';
import usuarios_get_by_name_with_password from "../controllers/usuarios/usuarios_get_by_name_with_password";
import refresh_token_post from '../controllers/token/refresh_token_post';
import generateAccessToken from '../utils/generateAccessToken';
import generateRefreshToken from '../utils/generateRefreshToken';

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    try {
        const userWithPass = await usuarios_get_by_name_with_password(data.username);

        if (data.password && await bcrypt.compare(data.password, userWithPass.password)) {
            const user = {
                _id: userWithPass._id,
                nombreCuenta: userWithPass.nombreCuenta,
            }

            const accessToken = generateAccessToken(user);

            // TODO ver si implementar para que haya solo un refresh x user
            const refreshToken = generateRefreshToken(user);
            await refresh_token_post(refreshToken);

            setResponseStatus(event, 200);
            return { accessToken, refreshToken, userId: userWithPass._id };
        } else {
            handleControllerError({
                number: 401,
                content: "Contraseña incorrecta",
            });
        }
    } catch (error) {
        handleControllerError(error);
    }
});