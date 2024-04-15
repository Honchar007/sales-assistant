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

export const chatAPI = MainApi.injectEndpoints({
  endpoints: (build) => ({
    getMessagesWithPagination: build.query<IApiResponseGenericDTO<IUpworkResponseListMessageDto>, Id>({
      query: ({id}: Id) => {
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
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
    }),
    getMessages: build.query<IApiResponseGenericDTO<IMessageDTO[]>, Id>({
      query: ({id}: Id) => {
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
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
    }),
    sendMessage: build.mutation<IApiResponseGenericDTO<IMessageDTO>, ISendMessageRequest>({
      query: ({ chatId, content }: ISendMessageRequest) => {
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
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
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessagesWithPaginationQuery,
  useSendMessageMutation,
} = chatAPI;
