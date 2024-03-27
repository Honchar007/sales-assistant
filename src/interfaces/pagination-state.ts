export interface IUsePagination {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export interface IPagination extends IUsePagination {
  baseUrl: string,
  withoutLink?: boolean;
  gotoPage?: (pageIndex: number) => void;
  isDisabled?: boolean;
}
