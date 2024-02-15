import { IAccountDTO } from '../submodules/public-common/interfaces/dto/account/iaccount.interface';
import { IErrorDTO } from '../submodules/public-common/interfaces/dto/common/ierror.interface';

interface IAccountState {
  isLogin: boolean,
  account: IAccountDTO,
  sessionId: string,
  greeting: string,
  isFetching: boolean,
  initialFetching: boolean,
  error: IErrorDTO,
}

export default IAccountState;
