import { createApi } from '@reduxjs/toolkit/query/react';

// api
import baseQueryWithReauth from './baseQueryWithReauth.api';

// services
import localStorageService from '../../services/local-storage.service';

// models
import { IApiResponseGenericDTO } from '../../submodules/public-common/interfaces/dto/common/iapi-response.interface';
import { ICreateChatRequest } from '../../submodules/public-common/interfaces/dto/chat/dto/icreate-chat-request.interface';
import { IChatItem } from '../../submodules/public-common/interfaces/dto/chat/dto/ichat-item';
import { ChatUpdateRequest, IAllChatsResponse, Id } from '../../interfaces/chats';
import { ChatRoutes } from '../../submodules/public-common/enums/routes/chat-routes.enum';
import { BaseRoutes } from '../../submodules/public-common/enums/routes/base-routes.enum';

export const ChatHistoryApi = createApi({
  reducerPath: 'chatHistory',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ChatItem'],
  endpoints: (build) => ({
    createChat: build.mutation<IApiResponseGenericDTO<IChatItem>, ICreateChatRequest>({
      query: ({ name }: ICreateChatRequest) => {
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token) {
          return ({
            url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}`,
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
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token) {
          return ({
            url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}`,
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
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token) {
          return ({
            url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}`,
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
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token) {
          return ({
            url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`,
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
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token) {
          return ({
            url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`,
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
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token) {
          return ({
            url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`,
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
} = ChatHistoryApi;
