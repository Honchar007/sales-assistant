// models
import { IAccessDTO } from '../submodules/public-common/interfaces/dto/auth/iaccess.interface';
import { IAccountResponseDTO } from '../submodules/public-common/interfaces/dto/account/iaccount-response.interfaces';
import ILoginFullResponse from '../interfaces/login-full-response';

const AuthApi = {
  async authUser(email: string, password: string): Promise<ILoginFullResponse> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
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

  async refreshToken(token: string): Promise<IAccessDTO> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/token/refresh`, {
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

  async recoverUser(token: string): Promise<IAccountResponseDTO> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/recover-user}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to recover user');
    }

    return response.json();
  },
};

export default AuthApi;
