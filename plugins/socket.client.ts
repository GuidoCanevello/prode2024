import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  if (process.server) return

  let socket = io(window.location.host, {
    path: '/api/socket.io',
    transports: ["websocket"],
    autoConnect: false,
  });

  return {
    provide: {
      socket,
    },
  }
})