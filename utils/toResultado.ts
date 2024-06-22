/**
 * Traduce los resultados del Partido a valores preestablecidos
 * 
 * @param golesEquipo1 Los goles del Equipo 1
 * @param golesEquipo2 Los goles del Equipo 2
 * @returns 0 si es Empate, 1 si Gana el Equipo 1 y 2 si Gana el Equipo 2
 */
export default function (golesEquipo1: number, golesEquipo2: number) {
    if (golesEquipo1 > golesEquipo2) return 1;
    else if (golesEquipo2 > golesEquipo1) return 2;
    else return 0;
}