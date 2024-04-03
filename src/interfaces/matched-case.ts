import { IInfoBlockInterfaceDto } from '../submodules/public-common/interfaces/dto/web-document/iinfo-block.interface.dto';

export interface IUpworkFeedMatchedCase {
  title: string;
  link: string;
  content: string;
  infoBlock: IInfoBlockInterfaceDto[] | null;
}
