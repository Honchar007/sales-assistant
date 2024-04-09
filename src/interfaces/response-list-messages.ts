// models
import { IPaginatedResultDTO } from '../submodules/public-common/interfaces/dto/common/ipaginated-result.interface';
import { IMessageDTO } from '../submodules/public-common/interfaces/dto/message/imessage-dto';

export interface IUpworkResponseListMessageDto {
  items: IPaginatedResultDTO<IMessageDTO>;
}
