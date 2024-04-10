import { Manager } from 'socket.io-client';

import { MessagesRoutesEnum } from '../submodules/public-common/enums/routes/messages-routes.enum';

const manager = new Manager(`${process.env.REACT_APP_API_URL}`, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
  query: {},
});

export const socket = manager.socket(MessagesRoutesEnum.BasePrefix);
