export interface columnFilter {
  searchQuery: string[] | string | null,
  searchBy: string,
}

export interface Option {
  value: number | string | number[];
  label: string;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}

export interface TotalItemsPages {
  totalCount: number,
  totalPages: number,
}

interface ITableState {
  pagination: Pagination,
  searchParameters: columnFilter[] | null,
  sortDirection: string,
  sortBy: string,
  options: {
    scoreOptions: Option[],
    keywordsOptions: Option[],
  },
}

export default ITableState;
