/**
 * Crea o actualiza una prediccion para el partido recibido
 * 
 * @param partidoId Id del partido
 * @param golesEquipo1 Goles para el equipo 1
 * @param golesEquipo2 Goles para el equipo 2
 */
export default async function (state: NUserStore.IStoreState, partidoId: TMongoID, golesEquipo1: number | string, golesEquipo2: number | string) {
    const prediccion = useProdeStore().predicciones.find(p => p.partidoId == partidoId);
    const body: IPrediccion = { partidoId, golesEquipo1, golesEquipo2 }

    try {
        //* Si existe, lo actualizo sino, lo creo
        const updPrediccion = await $fetchWithAuth(
            prediccion != undefined ?
                `/api/usuarios/${state.usuarioId}/predicciones/${prediccion?._id}` :
                `/api/usuarios/${state.usuarioId}/predicciones`,
            { method: prediccion != undefined ? "put" : "post", body }
        ) as IPrediccion

        if (updPrediccion != undefined) {
            const index = useProdeStore().predicciones.findIndex(p => p._id === updPrediccion._id);
            if (index !== -1) {
                useProdeStore().predicciones.splice(index, 1, updPrediccion);
            } else {
                useProdeStore().predicciones.push(updPrediccion);
            }
        }
        return updPrediccion;
    } catch (error) {
        console.log("error", error);
    }
}