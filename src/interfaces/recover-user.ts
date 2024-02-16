import { IAccountDTO } from '../submodules/public-common/interfaces/dto/account/iaccount.interface';
import { IErrorDTO } from '../submodules/public-common/interfaces/dto/common/ierror.interface';

export interface IData {
  account: IAccountDTO,
  sessionId: string,
}

interface IRecoverFullResponse {
  data: IData,
  error: IErrorDTO | null,
  statusCode: number,
  success: boolean,
}

export default IRecoverFullResponse;
