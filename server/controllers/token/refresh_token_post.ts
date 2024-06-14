import mongoose from "mongoose";
import { RefreshToken } from "~/server/models/RefreshToken.model";

export default async function (refreshTokenString: string) {
    let data = {
        _id: new mongoose.Types.ObjectId(),
        refreshToken: refreshTokenString,
    };

    const newRefreshToken = await RefreshToken.create(data)
        .catch((error) => {
            return { content: error };
        });
    return newRefreshToken;
};
