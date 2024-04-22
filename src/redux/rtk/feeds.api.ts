import { createApi } from '@reduxjs/toolkit/query/react';

// api
import baseQueryWithReauth from './baseQueryWithReauth.api';

// services
import localStorageService from '../../services/local-storage.service';

// models
import { IApiResponseGenericDTO } from '../../submodules/public-common/interfaces/dto/common/iapi-response.interface';
import { IUpworkResponseListFeedsDto } from '../../submodules/public-common/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto';
import { IUpworkFeedsUpdateItemRequest } from '../../interfaces/upwork-feeds';
import { IUpworkFeedDetailItemDTO } from '../../submodules/public-common/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto';
import { IGetAllUpworkFeedPaginatedRequest } from '../../interfaces/all-feed-response';
import { BaseRoutes } from '../../submodules/public-common/enums/routes/base-routes.enum';
import { UpworkFeedsRoutesEnum } from '../../submodules/public-common/enums/routes/upwork-feeds-routes.enum';

export const FeedsApi = createApi({
  reducerPath: 'feeds',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getFeeds: build.query<IApiResponseGenericDTO<IUpworkResponseListFeedsDto>, IGetAllUpworkFeedPaginatedRequest>({
      query: ({ ...upworkFeedReq }: IGetAllUpworkFeedPaginatedRequest) => {
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token) {
          return ({
            url: `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}/${UpworkFeedsRoutesEnum.GetFeeds}`,
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
    getFeedById: build.query<IApiResponseGenericDTO<IUpworkFeedDetailItemDTO>, string>({
      query: (id : string) => {
        const tokenBundle = localStorageService.get();
        const token = (tokenBundle && tokenBundle.accessToken) ?? null;
        if (token && id) {
          return ({
            url: `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}/${id}`,
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
              'Content-type': 'application/json',
            },
          });
        } else return '';
      },
    }),
    updateFeed: build.mutation<IApiResponseGenericDTO<IUpworkFeedDetailItemDTO>, IUpworkFeedsUpdateItemRequest>({
      query: ({ token, id, upworkFeedReq }: IUpworkFeedsUpdateItemRequest) => ({
        url: `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}/${id}`,
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

export const { useGetFeedsQuery, useGetFeedByIdQuery, useUpdateFeedMutation } = FeedsApi;
