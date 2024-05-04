import { Equipo } from "~/server/models/Equipo.model";

export default defineEventHandler(async (event) => {
    const query = await Equipo.find()
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    return query;
})