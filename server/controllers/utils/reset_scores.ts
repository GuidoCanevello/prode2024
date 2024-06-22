import { Equipo } from "~/server/models/Equipo.model";
import { Partido } from "~/server/models/Partido.model";
import usuarios_list from "../usuarios/usuarios_list";
import usuarios_put from "../usuarios/usuarios_put";
import predicciones_put from "../predicciones/predicciones_put";
import partidos_put from "../partidos/partidos_put";

// TODO implementar fase final
export default async function (isTest: boolean) {
    const resultados: {
        _id: TMongoID,
        equipo1: TMongoID,
        equipo2: TMongoID,
        golesEquipo1: number,
        golesEquipo2: number,
    }[] = (await Partido.find({ isTest, seRealizo: true })
        .catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        })).map(p => ({
            _id: p._id as TMongoID,
            equipo1: p.equipo1 as TMongoID,
            equipo2: p.equipo2 as TMongoID,
            golesEquipo1: p.golesEquipo1 as number,
            golesEquipo2: p.golesEquipo2 as number,
        }));

    const usuarios = await usuarios_list(isTest);

    // Limpiar los datos
    for (const e of resultados) {
        await Equipo.findOneAndUpdate({ _id: e.equipo1 }, { puntos: 0 }).exec()
            .catch((error) => {
                if (error.name === "CastError") {
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

        await Equipo.findOneAndUpdate({ _id: e.equipo2 }, { puntos: 0 }).exec()
            .catch((error) => {
                if (error.name === "CastError") {
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

        for (const u of usuarios) {
            const prediccion = u.predicciones.find(p => p.partidoId == e._id);
            if (prediccion != undefined) await predicciones_put(u._id, prediccion._id, { puntos: 0 });
        }
    }

    // Limpiar los datos
    for (const e of resultados) {
        await partidos_put(e._id, { golesEquipo1: e.golesEquipo1, golesEquipo2: e.golesEquipo2 });
    }
}