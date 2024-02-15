// models
import { IAccessDTO } from '../submodules/public-common/interfaces/dto/auth/iaccess.interface';

class LocalStorageService {
  get() {
    const tokenBundle = window.localStorage.getItem('user_data');

    if (tokenBundle) {
      return JSON.parse(tokenBundle);
    }

    return null;
  }

  set(tokenBundle: IAccessDTO) {
    const tokenBundleJson = tokenBundle.accessToken && tokenBundle.refreshToken ? JSON.stringify(tokenBundle) : '';
    window.localStorage.setItem('user_data', tokenBundleJson);
  }

  clear() {
    window.localStorage.removeItem('user_data');
  }
}

export default new LocalStorageService();
