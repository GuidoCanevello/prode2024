type Client = {
  id: string
  send: (message: string) => void
  readyState: number
}

declare global {
  var wss: WebSocketServer
  var clients: Client[]
}

let wss: WebSocketServer
let clients: Client[] = []

export default defineEventHandler((event) => {

  if (!global.wss) {
    wss = new WebSocketServer({ server: event.node.res.socket?.server })

    wss.on("connection", function (socket) {
      console.log("new Client")

      socket.send("connected")

      socket.on("message", function (message) {
        console.log("chau")
        wss.clients.forEach(function (client) {
          console.log("hola")
          if (client == socket && client.readyState === WebSocket.OPEN) {
            clients.push({
              id: message.toString(),
              send: (data: string) => client.send(data),
              readyState: client.readyState,
            })
            global.clients = clients
          }
        })
      })
      global.wss = wss
    })
  }
})