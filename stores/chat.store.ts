import { defineStore } from 'pinia';


export const useChatStore = defineStore('chatStore', {
    state: (): NChatStore.IStoreState => ({
        //* Datos de Mensajes
        msgPorFecha: [],
        userColors: [],

        //* State Booleans
        isGettingData: false,
        hasData: false,
    }),

    getters: {
    },

    actions: {
        async dispatchGetInitialData() {
            this.isGettingData = true;

            this.userColors = [];
            this.msgPorFecha = [];

            // TODO NO SIRVE, TENGO QUE USAR SOCKETS
            const mensajes = await $fetchWithAuth(`/api/chat-messages`, {
                query: {
                    isOnlyTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
                }
            }) as IChatMessage[];

            //* Ordenar Mensajes
            const freeColors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            const addedUsers: string[] = [];
            const addedDates: string[] = [];
            mensajes.forEach(mensaje => {
                //* Insertar Usuario si no estaba
                if (addedUsers.find(uid => uid == mensaje.usuarioId) == undefined) {
                    addedUsers.push(mensaje.usuarioId);

                    const colorIndex = randomInt(freeColors.length);
                    this.userColors.push({
                        color: `chat-card-${freeColors[colorIndex]}`,
                        isUsuario: useAuthStore().userId == mensaje.usuarioId,
                        usuarioId: mensaje.usuarioId
                    })
                    freeColors.splice(colorIndex, 1);
                }

                //* Insertar Mensaje en fecha adecuada
                const fechaIndex = addedUsers.findIndex(uid => uid == mensaje.fecha?.toLocaleDateString())
                if (fechaIndex == -1) {
                    const fecha = mensaje.fecha?.toLocaleDateString() ?? new Date().toLocaleDateString();
                    addedDates.push(fecha)

                    this.msgPorFecha.push({ fecha, messages: [mensaje] })
                } else {
                    this.msgPorFecha[fechaIndex].messages.push(mensaje)
                }
            });

            this.isGettingData = false;
            this.hasData = true;
        },
    }
});