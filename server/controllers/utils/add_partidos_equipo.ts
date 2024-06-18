import mongoose from "mongoose";
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

    const nombresGrupos = ["A", "B", "C", "D"];

    nombresGrupos.forEach(nombreGrupo => {
        const equiposGrupo = equipos.filter(e => e.grupo == nombreGrupo);
        const equiposAgregados: IEquipo[] = []

        equiposGrupo.forEach(equipo1 => {
            equiposAgregados.forEach(equipo2 => {
                Partido.create({
                    _id: new mongoose.Types.ObjectId(),
                    equipo1: equipo1._id,
                    equipo2: equipo2._id,
                    grupo: nombreGrupo,
                    seRealizo: false,
                    esEliminatoria: false,
                    isTest: PARTIDOS_TEST,
                }).catch((error) => {
                    throw {
                        number: 500,
                        content: error,
                    };
                })
            })

            equiposAgregados.push((equipo1 as IEquipo));
        });
    })
}