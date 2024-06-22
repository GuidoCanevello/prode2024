import { RefreshToken } from "~/server/models/RefreshToken.model";

export default async function () {
    const response =  await RefreshToken.deleteMany();
    return response
};
