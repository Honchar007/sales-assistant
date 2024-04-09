// store
import { MainApi } from './main.api';

// services
import localStorageService from '../../services/local-storage.service';

// models
import { IApiResponseGenericDTO } from '../../submodules/public-common/interfaces/dto/common/iapi-response.interface';
import { IUpworkResponseListMessageDto } from '../../interfaces/response-list-messages';
import { Id } from '../../interfaces/chats';
import { IMessageDTO } from '../../submodules/public-common/interfaces/dto/message/imessage-dto';
import { ISendMessageRequest } from '../../submodules/public-common/interfaces/dto/message/isend-message-request.interface';
import { getSocket } from '../../utils/get-socket';
import { NotificationEvents } from '../../submodules/public-common/enums/notification/notification-events.enum';
import { MessagesRoutesEnum } from '../../submodules/public-common/enums/routes/messages-routes.enum';

export const chatAPI = MainApi.injectEndpoints({
  endpoints: (build) => ({
    getMessagesWithPagination: build.query<IApiResponseGenericDTO<IUpworkResponseListMessageDto>, Id>({
      query: ({id}: Id) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: `messages/get-messages/${id}`,
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
          });
        } else return '';
      },
      providesTags: ['Message'],
    }),
    getMessages: build.query<IApiResponseGenericDTO<IMessageDTO[]>, Id>({
      query: ({id}: Id) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: `messages/${id}`,
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
          });
        } else return '';
      },
      providesTags: ['Message'],
    }),
    sendMessage: build.mutation<IApiResponseGenericDTO<IMessageDTO>, ISendMessageRequest>({
      query: ({ chatId, content }: ISendMessageRequest) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: '/messages/send-message',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
            body: {
              chatId,
              content,
            },
          });
        } else {
          return '';
        }
      },
      invalidatesTags: ['Message'],
    }),
    subscribe: build.query<any, Id>({
      query: ({ id }: Id) => `messages/subscribe/${id}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const token = localStorageService.get().accessToken;
        if (token) {
          const ws = new WebSocket(`ws://trainee-api.chat.abcloudz.com/api/v1/messages/subscribe/?chatId=${arg.id}&accessToken=${token}`);
          try {
            await cacheDataLoaded;
            const listener = (event: MessageEvent) => {
              const data = JSON.parse(event.data);
              if (data || data.channel !== arg) return;

              updateCachedData((draft) => {
                draft.push(data);
              });
            };

            ws.addEventListener('message', listener);
          } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
          }
          // cacheEntryRemoved will resolve when the cache subscription is no longer active
          await cacheEntryRemoved;
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          ws.close();
        }
      },
    }),
    getMessagesSocket: build.query<IMessageDTO[], number>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        id,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
      ) {
        try {
          const token = localStorageService.get().accessToken;
          console.log('start');
          await cacheDataLoaded;
          console.log('almost');
          const socket = await getSocket(token);
          console.log('socket');
          socket.on('connect', async () => {
            console.log('socket connection!');
          });
          console.log('connected');

          const result = await new Promise<IApiResponseGenericDTO<any>>((result) => {
            socket.emit(MessagesRoutesEnum.Subscribe, {
              chatId: id,
              accessToken: token,
            }, (response) => {
              console.log(response);
              return result(response);
            });
          });

          console.log('result');
          console.log(result);

          socket.on('subscribe', (messages: IMessageDTO[]) => {
            updateCachedData(() => {
              console.log('messages');
              return {...messages};
            });
          });


          socket.on(NotificationEvents.ChatResponse, (messages: IMessageDTO[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...messages);
            });
          });

          // await cacheEntryRemoved;

          // socket.off('subscribe');
          // socket.off('connect');
          // socket.off(NotificationEvents.ChatResponse);
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
          await cacheEntryRemoved;
        }
      },
    }),
  }),
});

export const {
  useGetMessagesSocketQuery,
  useSubscribeQuery,
  useGetMessagesQuery,
  useGetMessagesWithPaginationQuery,
  useSendMessageMutation,
} = chatAPI;
