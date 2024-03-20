import { IApiResponseGenericDTO } from '../submodules/public-common/interfaces/dto/common/iapi-response.interface';
import { IUpdateUpworkFeedDto } from '../submodules/public-common/interfaces/dto/upwork-feed/iupdate-upwork-feed.dto';
import { IUpworkResponseListFeedsDto } from '../submodules/public-common/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto';
import { IGetWebDocumentsRequestDTO } from '../submodules/public-common/interfaces/dto/web-document/iget-web-documents-request.interface';

export interface IUpworkFeedsListRequest extends IGetWebDocumentsRequestDTO {
  token: string,
}


export interface IUpworkFeedsItemRequest {
  token: string,
  id: string,
}

export interface IUpworkFeedsUpdateItemRequest extends IUpworkFeedsItemRequest {
  upworkFeedReq: IUpdateUpworkFeedDto,
}

export interface IUpworkFeedsResponse {
  data: IApiResponseGenericDTO<IUpworkResponseListFeedsDto>,
}
