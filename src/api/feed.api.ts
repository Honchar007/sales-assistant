// models
import { IGetWebDocumentsRequestDTO } from '../submodules/public-common/interfaces/dto/web-document/iget-web-documents-request.interface';
import { IApiResponseGenericDTO } from '../submodules/public-common/interfaces/dto/common/iapi-response.interface';
import { IUpdateUpworkFeedDto } from '../submodules/public-common/interfaces/dto/upwork-feed/iupdate-upwork-feed.dto';
import { IUpworkResponseListFeedsDto } from '../submodules/public-common/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto';
import { IUpworkFeedItemDTO } from '../submodules/public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';

const FeedApi = {
  async getFeeds(
    token: string,
    upworkFeedReq: IGetWebDocumentsRequestDTO
  ): Promise<IApiResponseGenericDTO<IUpworkResponseListFeedsDto>> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upwork-feeds/get-feeds`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...upworkFeedReq }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate user');
    }

    return response.json();
  },

  async getFeed(token: string, id: string): Promise<IApiResponseGenericDTO<IUpworkFeedItemDTO>> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upwork-feeds/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return response.json();
  },

  async updateFeed(
    token: string,
    id: string, update: IUpdateUpworkFeedDto
  ): Promise<IApiResponseGenericDTO<IUpworkFeedItemDTO>> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upwork-feeds/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...update }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return response.json();
  },
};

export default FeedApi;
