<script setup lang="ts">
const { $socket } = useNuxtApp()

onMounted(() => {
  console.log("onMounted")
  // TODO no lo puedo hacer andar, ver si lo arreglo o busco otro
  $socket.onopen = () => {
    console.log("Send")
    $socket.send(useAuthStore().userId)
  }

  $socket.onmessage = ({ data }: any) => {
    console.log("data", data)
    // message.value = data
  }

  $socket.onclose = function () {
    console.log("disconnected")
  }
})

function doTest() {
  useChatStore().sendMessage("TEST")
}
</script>

<template>
  <v-container id="page-container">
    <v-btn color="info" @click="doTest">TEst</v-btn>
    <v-row>
      <v-col>
        <v-container>
          <HomeDondeEmpezarCard />
        </v-container>

        <v-container>
          <HomePartidoProximoCard />
        </v-container>

        <v-container>
          <HomeListadoPartidosCard />
        </v-container>
      </v-col>

      <v-col>
        <v-container>
          <HomeRankingCard />
        </v-container>

        <v-container>
          <HomeNovedadesCard />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>