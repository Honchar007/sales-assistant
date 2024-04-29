// models
import { IAccessDTO } from '../submodules/public-common/interfaces/dto/auth/iaccess.interface';
import ILoginFullResponse from '../interfaces/login-full-response';
import IRecoverFullResponse from '../interfaces/recover-user';
import localStorageService from '../services/local-storage.service';
import { AuthRoutes } from '../submodules/public-common/enums/routes/auth-routes.enum';
import { BaseRoutes } from '../submodules/public-common/enums/routes/base-routes.enum';

const authApiUrl = `${process.env.REACT_APP_API_URL}${BaseRoutes.V1}/${AuthRoutes.BasePrefix}`;

const AuthApi = {
  async authUser(email: string, password: string): Promise<ILoginFullResponse> {
    const response = await fetch(`${authApiUrl}/${AuthRoutes.Login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate user');
    }

    return response.json();
  },

  async refreshToken(token: string): Promise<ILoginFullResponse> {
    const response = await fetch(`${authApiUrl}/${AuthRoutes.RefreshToken}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return response.json();
  },

  async recoverUser(token: string): Promise<IRecoverFullResponse> {
    const response = await fetch(`${authApiUrl}/${AuthRoutes.RecoverUser}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const handledResponse = await this.handleResponse(response);

    if (handledResponse.ok) {
      return await handledResponse.json() as IRecoverFullResponse;
    } else {
      throw new Error('Request failed with status ' + handledResponse.status);
    }
  },

  async handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      if (response.status === 401) {
        const tokenBundle: IAccessDTO = localStorageService.get();
        const newDataWithAccess = await this.refreshToken(tokenBundle.refreshToken);
        localStorageService.set(newDataWithAccess.data.access);
        if (newDataWithAccess.data.access.accessToken) {
          const newResponse = await fetch(response.url, {
            ...response,
            headers: {
              ...response.headers,
              'Authorization': `Bearer ${newDataWithAccess.data.access.accessToken}`,
            },
          });

          return newResponse;
        }
      } else {
        throw new Error('Unable to refresh ' + response.status);
      }
    }

    return response;
  },

};

export default AuthApi;
