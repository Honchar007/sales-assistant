import { IAccessDTO } from '../submodules/public-common/interfaces/dto/auth/iaccess.interface';
import IAccountState from './account-state';

interface MainState {
  auth: IAccessDTO,
  accountInfo: IAccountState,
}

export default MainState;
