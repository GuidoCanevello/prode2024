import { RefreshToken } from "~/server/models/RefreshToken.model";

export default async function () {
    return await RefreshToken.deleteMany();
};
