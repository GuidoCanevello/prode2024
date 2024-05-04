import { Equipo } from "~/server/models/Equipo.model";

export default defineEventHandler(async (event) => {
    const query = await Equipo.findById(event.context.params?.id).exec()
        .catch((error) => {
            if (error.name === "CastError") {
                throw {
                    number: 400,
                    content: "Id incorrecto",
                }
            } else {
                throw {
                    content: error,
                }
            }
        });

    if (query === null) {
        throw {
            number: 404,
            content: "No se encuentra el Equipo",
        }
    }

    return query;
})