import { Manager } from 'socket.io-client';

import { MessagesRoutesEnum } from '../submodules/public-common/enums/routes/messages-routes.enum';
import { BaseRoutes } from '../submodules/public-common/enums/routes/base-routes.enum';

const manager = new Manager(`${process.env.REACT_APP_API_URL}`, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
  query: {},
});

export const socket = manager.socket(`${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}`);

socket.on('connect', () => {
  console.log('connect');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});
