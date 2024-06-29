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
      isSocketConnected.value = true;
    })
    $socket.connect();
  }
})
</script>

<template>
  <v-card class="chat-card">
    <v-container class="chat-container">
      <chat-messages-card />

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

    .v-form {
      margin-top: 16px;

      padding-right: 12px;
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