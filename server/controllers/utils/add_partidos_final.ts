import mongoose from "mongoose";
import { Partido } from "~/server/models/Partido.model";

const PARTIDOS_TEST = true

export default async function () {
    //* Cuartos
    const identificadorCuartos = ["1", "2", "3", "4"];
    const partidosCuartos: IPartido[] = []
    for (let i = 0; i < 4; i++) {
        const newPartido: IPartido = {
            _id: new mongoose.Types.ObjectId(),
            seRealizo: false,
            esEliminatoria: true,
            isTest: PARTIDOS_TEST,
            identificadorEliminatorias: identificadorCuartos[i],
            tipoEliminatoria: "Cuartos",

        };
        partidosCuartos.push(newPartido)

        await Partido.create(newPartido).catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });
    }

    //* Semis
    const identificadorSemis = ["A", "B"];
    const partidosSemis: IPartido[] = []
    for (let i = 0; i < 2; i++) {
        const newPartido: IPartido = {
            _id: new mongoose.Types.ObjectId(),
            seRealizo: false,
            esEliminatoria: true,
            isTest: PARTIDOS_TEST,
            identificadorEliminatorias: identificadorSemis[i],
            tipoEliminatoria: "Semis",
            partidoEquipo1: partidosCuartos[i * 2],
            partidoEquipo2: partidosCuartos[(i * 2) + 1],
        };
        partidosSemis.push(newPartido)

        await Partido.create(newPartido).catch((error) => {
            throw {
                number: 500,
                content: error,
            };
        });
    }

    //* Tercero
    await Partido.create({
        _id: new mongoose.Types.ObjectId(),
        seRealizo: false,
        esEliminatoria: true,
        isTest: PARTIDOS_TEST,
        identificadorEliminatorias: "Tercero",
        tipoEliminatoria: "Tercero",
        partidoEquipo1: partidosSemis[0],
        partidoEquipo2: partidosSemis[1],
    }).catch((error) => {
        throw {
            number: 500,
            content: error,
        };
    });

    //* Final
    await Partido.create({
        _id: new mongoose.Types.ObjectId(),
        seRealizo: false,
        esEliminatoria: true,
        isTest: PARTIDOS_TEST,
        identificadorEliminatorias: "Final",
        tipoEliminatoria: "Final",
        partidoEquipo1: partidosSemis[0],
        partidoEquipo2: partidosSemis[1],
    }).catch((error) => {
        throw {
            number: 500,
            content: error,
        };
    });
}