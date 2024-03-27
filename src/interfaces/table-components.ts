import type {
  ColumnDef,
  Row,
  PaginationState,
  ColumnFiltersState,
  SortingState,
  Column,
  OnChangeFn,
} from '@tanstack/react-table';
import { Option } from '../interfaces/table-state';

export interface filterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>,
  options?: Option[],
}

export interface MetaCustomType {
  filterable: boolean,
  toggleabale: boolean,
  filter: (props: filterProps) => JSX.Element,
  options: Option[],
}

export default interface ReactTableProps<T extends object> {
  data: T[],
  columns: ColumnDef<T, string>[],
  pageCount?: number,
  itemsCount?: number,
  pagination?: PaginationState,
  onPaginationChange?: OnChangeFn<PaginationState>,
  sorting?: SortingState,
  columnFilters?: ColumnFiltersState,
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>,
  onSortingChange?: OnChangeFn<SortingState>,
  className?: string,
  showHeader?: boolean,
  hasGlobalFilter?: boolean,
  hasPagination?: boolean,
  rowFunction?: (row: Row<T>) => void,
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement,
}
