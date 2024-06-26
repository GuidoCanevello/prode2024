import { Server, Socket } from 'socket.io';

declare global {
  var io: Server
  var clients: Socket[]
}

let io: Server
let clients: Socket[] = []

export default defineEventHandler((event) => {
  if (global.io == undefined && event.node.res.socket?.server != undefined) {
    io = new Server({
      path: '/api/socket.io',
      serveClient: false,
      allowEIO3: true,
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      },
    });
    io.attach(event.node.res.socket?.server);

    io.on("connect", (socket) => {
      socket.on('disconnect', () => {
        clients = clients.filter(c => c == socket);
        global.clients = clients;
      })

      clients.push(socket);
      global.clients = clients;
      console.log("->New Client Connected")
    })
    global.io = io
    console.log("->Socket Server Created")
  }
})