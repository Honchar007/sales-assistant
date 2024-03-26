import { IPaginatedRequestDTO } from '../submodules/public-common/interfaces/dto/common/ipaginated-request.interface';
import { IGetAllUpworkFeedRequest } from '../submodules/public-common/interfaces/dto/upwork-feed/iget-all-upwork-feed-request.interface';

export interface IGetAllUpworkFeedPaginatedRequest extends IGetAllUpworkFeedRequest, IPaginatedRequestDTO {}
