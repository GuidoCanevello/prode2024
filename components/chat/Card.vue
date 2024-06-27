<script setup lang="ts">

const form = ref<any>(null);
const newMessageText = ref("");

function onSendMessage() {
  console.log("Send Message", newMessageText.value)
}
</script>

<template>
  <v-card class="chat-card">
    <v-container class="chat-container">
      <chat-messages-card />

      <v-form ref="form" @submit="onSendMessage">
        <v-text-field v-model="newMessageText" append-icon="mdi-send" variant="outlined" type="text" clearable
          label="Mensaje" hide-details="auto" @click:append="onSendMessage" />
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