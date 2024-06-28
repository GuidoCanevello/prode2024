import { defineStore } from 'pinia';


export const useChatStore = defineStore('chatStore', {
  state: (): NChatStore.IStoreState => ({
    //* Datos de Mensajes
    msgPorFecha: [],
    userColors: [],

    //* State Booleans
    isSendingMessage: false,
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

      const mensajes = await $fetchWithAuth(`/api/chat-messages`, {
        query: {
          isOnlyTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
        }
      }) as IChatMessage[];

      //* Ordenar Mensajes
      const freeColors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const addedUsers: string[] = [];
      const addedDates: string[] = [];
      mensajes.forEach(mensaje => {
        //* Insertar Usuario si no estaba
        if (addedUsers.find(uid => uid == mensaje.usuarioId) == undefined) {
          addedUsers.push(mensaje.usuarioId);

          let color: string;
          if (mensaje.usuarioId == useAuthStore().userId) {
            color = 'chat-card-user'
          } else {
            const colorIndex = randomInt(freeColors.length);
            color = `chat-card-${freeColors[colorIndex]}`;
            freeColors.splice(colorIndex, 1);
          }

          this.userColors.push({
            color,
            isUsuario: useAuthStore().userId == mensaje.usuarioId,
            usuarioId: mensaje.usuarioId
          })
        }

        //* Insertar Mensaje en fecha adecuada
        const fechaIndex = addedDates.findIndex(fecha => fecha == mensaje.fecha?.toLocaleDateString())
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

    async sendMessage(texto: string) {
      this.isSendingMessage = true;

      const usuarioId = useAuthStore().userId;

      const mensaje = await $fetchWithAuth(`/api/chat-messages`, {
        method: "POST",
        body: {
          usuarioId,
          texto,
          isTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
        }
      }) as IChatMessage;

      //* Insertar Usuario si no estaba
      if (this.userColors.find(uid => uid == usuarioId) == undefined) {
        this.userColors.push({
          color: 'chat-card-user',
          isUsuario: true,
          usuarioId: mensaje.usuarioId
        })
      }

      //* Insertar Mensaje en fecha adecuada
      const fechaIndex = this.msgPorFecha.findIndex(msgs => msgs.fecha == mensaje.fecha?.toLocaleDateString())
      if (fechaIndex == -1) {
        const fecha = mensaje.fecha?.toLocaleDateString() ?? new Date().toLocaleDateString();

        this.msgPorFecha.push({ fecha, messages: [mensaje] })
      } else {
        this.msgPorFecha[fechaIndex].messages.push(mensaje)
      }

      this.isSendingMessage = false;
    }
  }
});