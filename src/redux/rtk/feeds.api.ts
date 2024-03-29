import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// models
import { IApiResponseGenericDTO } from '../../submodules/public-common/interfaces/dto/common/iapi-response.interface';
import { IUpworkResponseListFeedsDto } from '../../submodules/public-common/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto';
import { IUpworkFeedsItemRequest, IUpworkFeedsUpdateItemRequest } from '../../interfaces/upwork-feeds';
import { IUpworkFeedDetailItemDTO } from '../../submodules/public-common/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto';
import localStorageService from '../../services/local-storage.service';
import { IGetAllUpworkFeedPaginatedRequest } from '../../interfaces/all-feed-response';

export const feedsApi = createApi({
  reducerPath: 'feeds',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  endpoints: (build) => ({
    getFeeds: build.query<IApiResponseGenericDTO<IUpworkResponseListFeedsDto>, IGetAllUpworkFeedPaginatedRequest>({
      query: ({ ...upworkFeedReq }: IGetAllUpworkFeedPaginatedRequest) => {
        const token = localStorageService.get().accessToken;
        if (token) {
          return ({
            url: '/upwork-feeds/get-feeds',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
            body: upworkFeedReq,
          });
        } else {
          return '';
        }
      }
      ,
    }),
    getFeedById: build.query<IApiResponseGenericDTO<IUpworkFeedDetailItemDTO>, IUpworkFeedsItemRequest>({
      query: ({ token, id }: {token: string, id: string }) => ({
        url: `/upwork-feeds/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
      }),
    }),
    updateFeed: build.mutation<IApiResponseGenericDTO<IUpworkFeedDetailItemDTO>, IUpworkFeedsUpdateItemRequest>({
      query: ({ token, id, upworkFeedReq }: IUpworkFeedsUpdateItemRequest) => ({
        url: `/upwork-feeds/${id}`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: upworkFeedReq,
      }),
    }),
  }),
});

export const { useGetFeedsQuery, useGetFeedByIdQuery, useUpdateFeedMutation } = feedsApi;
