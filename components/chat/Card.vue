<script setup lang="ts">
const { $socket } = useNuxtApp()

const store = useChatStore();
const { isSocketConnected } = storeToRefs(useChatStore());

const form = ref<any>(null);
const newMessageText = ref("");

function onSendMessage() {
  store.sendMessage(newMessageText.value);
  newMessageText.value = ""
}

onMounted(() => {
  store.dispatchGetInitialData();

  if (!$socket.connected) {
    isSocketConnected.value = false;
    $socket.once('connect', () => {
      useChatStore().isSocketWorking = true;
      isSocketConnected.value = true;
    })
    $socket.on('newMessage', (data: IChatMessage) => {
      store.addMessage(data);
    })

    $socket.on('connect_error', onConnectionError)
    $socket.on('connect_failed', onConnectionError)
    $socket.on('disconnect', onConnectionError)

    $socket.connect();
  }
})

function onConnectionError(err: any) {
  console.log(err)
  useChatStore().isSocketWorking = false;
  useRouter().push('/')
}
</script>

<template>
  <v-card class="chat-card">
    <v-container class="chat-container">
      <chat-all-messages-card />

      <v-form ref="form" @submit="onSendMessage" @submit.prevent>
        <v-text-field v-model="newMessageText" label="Mensaje" append-icon="mdi-send" variant="outlined" type="text"
          clearable hide-details="auto" :loading="!isSocketConnected" :disabled="!isSocketConnected"
          @click:append="onSendMessage" />
      </v-form>
    </v-container>
  </v-card>
</template>

<style scoped>
.chat-card {
  width: 100%;
  height: 100%;
  padding: 1.5vh;

  .chat-container {
    display: flex;
    flex-flow: column;
    height: 100%;
    padding: 0%;
    margin-inline: 0px;
    max-width: 100%;

    .v-form {
      margin-top: 16px;
      padding-right: 12px;
    }
  }

  @media (max-width: 600px) {
    .chat-container {
      padding-inline: 0;
    }
  }
}

:deep(.history-card) {
  overflow-y: scroll;
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: 1vh;
}
</style>