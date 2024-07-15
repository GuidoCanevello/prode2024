import * as path from 'node:path';
import * as fs from 'node:fs';
import { Equipo } from '~/server/models/Equipo.model';
import { Jugador } from '~/server/models/Jugador.model';
import mongoose from 'mongoose';

const PARTIDOS_TEST = false;

export default async function () {
  await Jugador.deleteMany({ isTest: PARTIDOS_TEST });

  const equipos = await Equipo.find({ isTest: PARTIDOS_TEST })
    .catch((error) => {
      throw {
        number: 500,
        content: error,
      };
    });

  let playerArray: IJugador[] = [];
  for (const equipo of equipos) {
    const filePath = path.join(process.cwd(), 'assets/squads', `${equipo.nombre.trim().toLowerCase().replaceAll(' ', "-")}.txt`);

    let data = await fs.promises.readFile(filePath, 'utf-8');
    data = data.substring(data.indexOf('1,'), data.lastIndexOf(')') + 1).replaceAll('\r\n\r\n', '\r\n')

    let playersStrArray: string[] = toPlayerStrArray(data);
    for (const line of playersStrArray) {
      const firstComma = line.indexOf(','),
        secondComma = line.indexOf(',', firstComma + 1),
        thirdComma = line.indexOf(',', secondComma + 1);

      const numero = Number(line.substring(0, firstComma)),
        nombre = line.substring(firstComma + 1, secondComma).trim(),
        posicion = getPosicion(line.substring(secondComma + 1, thirdComma).trim());

      playerArray.push({
        numero,
        nombre,
        posicion,
        equipo: equipo._id,
        isTest: PARTIDOS_TEST,
        esMejorJugador: false,
        esMejorArquero: false,
        esMejorGoleador: false,
      })
    }
  }

  for (const jugador of playerArray) {
    jugador._id = new mongoose.Types.ObjectId();

    await Jugador.create(jugador)
      .catch((error) => {
        return {
          content: error,
        };
      });
  }
}

function toPlayerStrArray(data: string): string[] {
  const strArray: string[] = [];

  let remainingData = data;
  while (remainingData.length > 0) {
    const lineEndingIndex = remainingData.indexOf(')') + 1;

    if (lineEndingIndex != -1) {
      strArray.push(remainingData.substring(0, lineEndingIndex).trim());
      remainingData = remainingData.substring(lineEndingIndex + 2);
    } else {
      remainingData = "";
    }
  }

  return strArray;
}

function getPosicion(posicion: string): TPosicionJugador | undefined {
  switch (posicion) {
    case "GK":
      return "Arquero";
    case "DF":
      return "Defensor";
    case "MF":
      return "Mediocampista";
    case "FW":
      return "Delantero";
    default:
      return undefined;
  }
}