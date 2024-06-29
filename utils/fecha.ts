import addCero from "./addCero";
import obtenerNombreDia from "./obtenerNombreDia";

/**
 * Da el formato de "<nombre-dia> <dia>/<mes> - <hora>:<minuto>" a una Fecha
 * 
 * @param fecha la Fecha a dar Formato
 * 
 * @returns El string resultante
 */
export function formatoCompleto(fecha: Date) {
    return formatoFecha(fecha) + " - " + formatoHora(fecha);
}

export function formatoFecha(fecha: Date) {
    const nombreDia = obtenerNombreDia(fecha.getDay()),
        dia = addCero(fecha.getDate()),
        mes = addCero(fecha.getMonth() + 1);

    return `${nombreDia} ${dia}/${mes}`;
}

export function formatoHora(fecha: Date) {
    const hora = addCero(fecha.getHours()),
        minutos = addCero(fecha.getMinutes());

    return `${hora}:${minutos}`;
}