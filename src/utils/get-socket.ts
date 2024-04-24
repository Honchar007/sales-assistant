import { Socket, io } from 'socket.io-client';

let socket: Socket;
export function getSocket(token: string) {
  if (!socket) {
    socket = io(`${process.env.REACT_APP_API_URL}`, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
    });
  }
  return socket;
}
