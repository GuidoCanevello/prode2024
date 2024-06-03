// Usuarios no de test a ignorar (undefined es para evitar error)
const NOMBRES_USUARIOS_ESPECIALES: (string | undefined)[] = ["ADMIN"]

function addSorted(list: NProdeStore.Ranking.IData[], element: NProdeStore.Ranking.IData) {
    const elementIndex = list.findIndex(e => e.puntos < element.puntos);

    if (elementIndex === -1) {
        list.push(element);
    } else {
        list.splice(elementIndex, 0, element);
    }
}

export default function (state: NProdeStore.IProdeStoreState): NProdeStore.Ranking.IData[] {
    const dataRanking: NProdeStore.Ranking.IData[] = [];

    //* Agregar Usuarios ordenando segun "puntos"
    state.usuarios
        .filter(user => !NOMBRES_USUARIOS_ESPECIALES.includes(user.nombreCuenta))
        .forEach(user => {
            addSorted(dataRanking, {
                posicion: 0,
                iconoJugador: user.imagenSrc === undefined ? '' : user.imagenSrc,
                nombreJugador: user.nombreJugador ?? "NOMBRE",
                nombreCuenta: user.nombreCuenta ?? "NOMBRE",
                puntos: user.puntos ?? 0,
            });
        });

    //* Definir posicion de cada Usuario segun sus puntos a comparacion del resto (puede haber mas de un jugador en la misma posicion)
    let pos = 0;
    let previousScore = 100000;
    dataRanking.forEach(e => {
        if (e.puntos < previousScore) {
            pos++;
            previousScore = e.puntos;
        }
        e.posicion = pos;
    })

    return dataRanking;
}