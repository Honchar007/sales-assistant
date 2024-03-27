import { SortDirection } from '../submodules/public-common/enums/common/sort-direction.enum';
import { UpworkFeedSortBy } from '../submodules/public-common/enums/upwork-feed/upwork-feed-sort-by.enum';

interface SortParams {
  sortDirection: SortDirection | undefined,
  sortBy: UpworkFeedSortBy | undefined,
}

export default SortParams;
