/**
 * Agrega un 0 si el numero es de 1 sola cifra para que siempre sea de 2
 * 
 * @param num El numero a transformar
 * 
 * @returns String con un cero agregado si el numero es de un solo digito
 */
export default function (num: number): string {
    return `${num > 9 ? "" : "0"}${num}`
}