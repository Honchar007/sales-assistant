import { IChatItem } from '../submodules/public-common/interfaces/dto/chat/dto/ichat-item';
import { IEditChatRequest } from '../submodules/public-common/interfaces/dto/chat/dto/iedit-chat-request.interface';
import { IPaginatedResultDTO } from '../submodules/public-common/interfaces/dto/common/ipaginated-result.interface';

export interface Id {
  id: string,
}

export interface IAllChatsResponse {
  data: IPaginatedResultDTO<IChatItem>,
}

export interface ChatUpdateRequest extends IEditChatRequest, Id {}
