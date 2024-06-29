import { defineStore } from 'pinia';

export const useChatStore = defineStore('chatStore', {
  state: (): NChatStore.IStoreState => ({
    //* Datos de Mensajes
    msgPorFecha: [],
    userColors: [],

    //* State Booleans
    isSocketWorking: true,
    isSendingMessage: false,
    isSocketConnected: false,
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

      let mensajes = await $fetchWithAuth(`/api/chat-messages`, {
        query: {
          isOnlyTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
        }
      }) as IChatMessage[];
      mensajes = mensajes.reverse();

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
        if (mensaje.fecha != undefined) {
          const fechaIndex = addedDates.findIndex(fecha => fecha == new Date(mensaje.fecha ?? "").toLocaleDateString())
          if (fechaIndex == -1) {
            const fecha = new Date(mensaje.fecha).toLocaleDateString();
            addedDates.push(fecha)

            this.msgPorFecha.push({ fecha, messages: [mensaje] })
          } else {
            this.msgPorFecha[fechaIndex].messages.push(mensaje)
          }
        }
      });

      this.isGettingData = false;
      this.hasData = true;
    },

    async sendMessage(texto: string) {
      this.isSendingMessage = true;

      const mensaje = await $fetchWithAuth(`/api/chat-messages`, {
        method: "POST",
        body: {
          usuarioId: useAuthStore().userId,
          texto,
          isTest: useRuntimeConfig().public.USE_TEST_DATA == "true"
        }
      }) as IChatMessage;

      this.addMessage(mensaje);

      this.isSendingMessage = false;
    },

    addMessage(newMessage: IChatMessage) {
      //* Si el mensaje ya esta ingresado, no lo agrega
      if (this.msgPorFecha.some(msgs => msgs.messages.some(m => m._id == newMessage._id))) return;

      //* Insertar Usuario si no estaba
      if (this.userColors.find(uid => uid == newMessage.usuarioId) == undefined) {
        let color: string;
        if (newMessage.usuarioId == useAuthStore().userId) {
          color = 'chat-card-user'
        } else {
          const freeColors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(n => !this.userColors.some(u => u.color == `chat-card-${n}`));
          const colorIndex = randomInt(freeColors.length);
          color = `chat-card-${freeColors[colorIndex]}`;
          freeColors.splice(colorIndex, 1);
        }

        this.userColors.push({
          color,
          isUsuario: useAuthStore().userId == newMessage.usuarioId,
          usuarioId: newMessage.usuarioId
        })
      }

      //* Insertar Mensaje en fecha adecuada
      if (newMessage.fecha != undefined) {
        const fechaIndex = this.msgPorFecha.findIndex(msgs => msgs.fecha == new Date(newMessage.fecha ?? "").toLocaleDateString())
        if (fechaIndex == -1) {
          const fecha = new Date(newMessage.fecha).toLocaleDateString();

          this.msgPorFecha.unshift({ fecha, messages: [newMessage] })
        } else {
          this.msgPorFecha[fechaIndex].messages.unshift(newMessage)
        }
      }
    }
  }
});