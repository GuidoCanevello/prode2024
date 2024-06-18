/**
 * Traduce un numero a dia en español
 * 
 * @param dia El numero del dia
 * 
 * @returns El String correspondiente al Dia
 */
export default function (dia: number) {
    let nombre;

    switch (dia) {
        case 0:
            nombre = 'Domingo';
            break;
        case 1:
            nombre = 'Lunes';
            break;
        case 2:
            nombre = 'Martes';
            break;
        case 3:
            nombre = 'Miercoles';
            break;
        case 4:
            nombre = 'Jueves';
            break;
        case 5:
            nombre = 'Viernes';
            break;
        case 6:
            nombre = 'Sabado';
            break;
    }

    return nombre
}