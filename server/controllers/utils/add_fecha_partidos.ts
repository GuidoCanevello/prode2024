import { Equipo } from "~/server/models/Equipo.model";
import { Partido } from "~/server/models/Partido.model";

const PARTIDOS_TEST = true

export default async function () {
    const equipos = await Equipo.find({ isTest: PARTIDOS_TEST })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    const partidos = await Partido.find({ isTest: PARTIDOS_TEST })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });

    const data = [
        [new Date(2024, 5, 25, 22), 'Chile', 'Argentina'],
        [new Date(2024, 5, 21, 21), 'Chile', 'Peru'],
        [new Date(2024, 5, 29, 21), 'Peru', 'Argentina'],
        [new Date(2024, 5, 29, 21), 'Canada', 'Chile'],
        [new Date(2024, 5, 20, 21), 'Canada', 'Argentina'],
        [new Date(2024, 5, 25, 19), 'Canada', 'Peru'],

        [new Date(2024, 5, 26, 22), 'Venezuela', 'Mexico'],
        [new Date(2024, 5, 30, 21), 'Ecuador', 'Mexico'],
        [new Date(2024, 5, 22, 19), 'Venezuela', 'Ecuador'],
        [new Date(2024, 5, 22, 22), 'Jamaica', 'Mexico'],
        [new Date(2024, 5, 26, 19), 'Jamaica', 'Ecuador'],
        [new Date(2024, 5, 30, 21), 'Jamaica', 'Venezuela'],

        [new Date(2024, 5, 27, 19), 'Panama', 'Estados Unidos'],
        [new Date(2024, 6, 1, 22), 'Uruguay', 'Estados Unidos'],
        [new Date(2024, 5, 23, 22), 'Panama', 'Uruguay'],
        [new Date(2024, 5, 27, 22), 'Bolivia', 'Uruguay'],
        [new Date(2024, 5, 23, 19), 'Bolivia', 'Estados Unidos'],
        [new Date(2024, 6, 1, 22), 'Bolivia', 'Panama'],

        [new Date(2024, 5, 28, 22), 'Paraguay', 'Brazil'],
        [new Date(2024, 5, 24, 19), 'Paraguay', 'Colombia'],
        [new Date(2024, 5, 28, 19), 'Costa Rica', 'Colombia'],
        [new Date(2024, 6, 2, 22), 'Costa Rica', 'Paraguay'],
        [new Date(2024, 6, 2, 22), 'Colombia', 'Brazil'],
        [new Date(2024, 5, 24, 22), 'Costa Rica', 'Brazil'],
    ];

    data.forEach(d => {
        const equipo1Id = equipos.find(e => e.nombre == d[1])?.id;
        const equipo2Id = equipos.find(e => e.nombre == d[2])?.id;
        const partidoId = partidos.find(p => p.equipo1 == equipo1Id && p.equipo2 == equipo2Id);

        if (partidoId != undefined) {
            Partido.findOneAndUpdate({ _id: partidoId }, {
                fecha: d[0]
            }, { new: true }).exec()
                .catch((error) => {
                    if (error.name === "CastError") {
                        // REVIEW Cambiar error, da cuando un valor de data esta mal tamb
                        throw {
                            number: 400,
                            content: "Id incorrecto",
                        };
                    } else {
                        throw {
                            content: error,
                        };
                    }
                });
        }
    })
}
