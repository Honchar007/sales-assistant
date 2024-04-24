import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

// store
import { logout } from '../authSlicer';

// services
import localStorageService from '../../services/local-storage.service';

// models
import { IAccessDTO } from '../../submodules/public-common/interfaces/dto/auth/iaccess.interface';
import { BaseRoutes } from '../../submodules/public-common/enums/routes/base-routes.enum';
import { AuthRoutes } from '../../submodules/public-common/enums/routes/auth-routes.enum';
import ILoginFullResponse from '../../interfaces/login-full-response';

// constants
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}`});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const tokenBundle: IAccessDTO = localStorageService.get();
      try {
        const refreshResult = await baseQuery(
          {
            url: `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`,
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: tokenBundle.refreshToken }),
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const tokenBundle = (refreshResult.data as ILoginFullResponse).data.access;
          localStorageService.set(tokenBundle);

          const argsUpdatedHeaders = { ...args as FetchArgs };
          if (argsUpdatedHeaders.headers?.['Authorization']) {
            argsUpdatedHeaders.headers['Authorization'] = `Bearer ${tokenBundle.accessToken}`;
          }

          result = await baseQuery(argsUpdatedHeaders, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default baseQueryWithReauth;
