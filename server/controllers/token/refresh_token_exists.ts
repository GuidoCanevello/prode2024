import { Types } from "mongoose";
import { RefreshToken } from "~/server/models/RefreshToken.model";

export default async function (refreshToken: {
    _id: Types.ObjectId,
    refreshToken: string,
}) {
    const query = await RefreshToken.findOne({ refreshToken }).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw { number: 403 };
            } else {
                throw { content: error };
            }
        });

    return query != null;
};
