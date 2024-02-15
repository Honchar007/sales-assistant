import { IAccountDTO } from '../submodules/public-common/interfaces/dto/account/iaccount.interface';
import { IAccessDTO } from '../submodules/public-common/interfaces/dto/auth/iaccess.interface';
import { IErrorDTO } from '../submodules/public-common/interfaces/dto/common/ierror.interface';

export interface IData {
  access: IAccessDTO,
  account: IAccountDTO,
  sessionId: string,
}

interface ILoginFullResponse {
  data: IData,
  error: IErrorDTO | null,
  statusCode: number,
  success: boolean,
}

export default ILoginFullResponse;
