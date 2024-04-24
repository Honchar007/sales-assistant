// services
import localStorageService from '../../services/local-storage.service';

// models
import { IApiResponseGenericDTO } from '../../submodules/public-common/interfaces/dto/common/iapi-response.interface';
import { ICreateChatRequest } from '../../submodules/public-common/interfaces/dto/chat/dto/icreate-chat-request.interface';
import { IChatItem } from '../../submodules/public-common/interfaces/dto/chat/dto/ichat-item';
import { ChatUpdateRequest, IAllChatsResponse, Id } from '../../interfaces/chats';
import { MainApi } from './main.api';

export const chatHistoryAPI = MainApi.injectEndpoints({
  endpoints: (build) => ({
    createChat: build.mutation<IApiResponseGenericDTO<IChatItem>, ICreateChatRequest>({
      query: ({ name }: ICreateChatRequest) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: '/chats',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
            body: {name},
          });
        } else {
          return '';
        }
      },
      invalidatesTags: ['ChatItem'],
    }),
    getChats: build.query<IApiResponseGenericDTO<IChatItem[]>, void>({
      query: () => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: '/chats',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
          });
        } else return '';
      },
      providesTags: ['ChatItem'],
    }),
    getChatsWithPagination: build.query<IApiResponseGenericDTO<IAllChatsResponse>, void>({
      query: () => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: '/chats',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
          });
        } else return '';
      },
      providesTags: ['ChatItem'],
    }),
    getChatById: build.query<IApiResponseGenericDTO<IChatItem>, Id>({
      query: ({ id }: Id) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: `/chats/${id}`,
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
          });
        } else return '';
      },
    }),
    updateChat: build.mutation<IApiResponseGenericDTO<IChatItem>, ChatUpdateRequest>({
      query: ({ id, name }: ChatUpdateRequest) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: `/chats/${id}`,
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
            body: {name},
          });
        } else return '';
      },
      invalidatesTags: ['ChatItem'],
    }),
    removeChat: build.mutation<IApiResponseGenericDTO<IChatItem>, Id>({
      query: ({ id }: { id: string }) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: `/chats/${id}`,
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
          });
        } else return '';
      },
      invalidatesTags: ['ChatItem'],
    }),
  }),
});

export const {
  useGetChatsWithPaginationQuery,
  useGetChatsQuery,
  useCreateChatMutation,
  useGetChatByIdQuery,
  useRemoveChatMutation,
  useUpdateChatMutation,
} = chatHistoryAPI;
