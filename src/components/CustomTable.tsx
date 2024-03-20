import { Fragment, useEffect, useState } from 'react';

// components
import Filter from './Filter';
import StyledButton from './StyledButton';

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import type {
  ColumnDef,
  Row,
  Table as ReactTable,
  PaginationState,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import StyledSelect from './StyledSelect';
import IconButton from './IconButton';
import { useAppDispatch } from '../redux/hook';
import { paginationChange } from '../redux/tableSlicer';

interface MetaCustomType {
  filterable: boolean,
  toggleabale: boolean,
}

interface ReactTableProps<T extends object> {
  data: T[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[],
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement,
  pageIndex?: number,
  pageSize?: number,
  pageCount?: number,
  itemsCount?: number,
  onPaginationChange?: (pagination: PaginationState) => void,
  className?: string,
  showHeader?: boolean,
  hasGlobalFilter?: boolean,
  hasPagination?: boolean,
  rowFunction?: (row: Row<T>) => void,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const diapasonFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId) as number;
  if (Array.isArray(value) && columnId) {
    return value.some((el)=>{
      return el[0] <= rowValue && rowValue <= el[1] ? true : false;
    });
  } else {
    return true;
  }
};

function Table<T extends object>({
  data,
  columns,
  renderSubComponent,
  pageIndex,
  pageSize,
  pageCount,
  itemsCount,
  showHeader = true,
  hasGlobalFilter = false,
  hasPagination = false,
  rowFunction,
}: ReactTableProps<T>) {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 10,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({'id': false, 'url': false});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    pageCount,
    filterFns: {
      diapason: diapasonFilter,
    },
    state: {
      pagination,
      columnFilters: columnFilters,
      sorting: sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  });

  const handleRowClick = (row) => {
    if (rowFunction) rowFunction(row);
  };

  useEffect(() => {
    console.log(pagination);
    dispatch(paginationChange(pagination));
  }, [pagination]);

  useEffect(() => {
    if (columnFilters) console.log('columnFilters');
  }, [columnFilters]);

  useEffect(() => {
    if (sorting) console.log('sorting');
  }, [sorting]);

  return (
    <>
      { hasGlobalFilter &&
      <div className='subheader'>
        {/* <StyledSelect
          options={[{label: 'All', value: ''}, ...options]}
          name='global-filter'
          width='600'
          value={globalFilter ? {label: globalFilter, value: globalFilter} : ''}
          onChange={(e) => {
            const value = (e?.['value'] ?? '').toString().toLowerCase() === 'all' ? '' : e?.['value'];
            setGlobalFilter(value);
          }}
        /> */}
        <StyledButton preIcon='restart'>Refresh RSS</StyledButton>
      </div>
      }
      <div className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {showHeader &&
                    headerGroup.headers.map((header) => (
                      <th key={header.id} >
                        {header.isPlaceholder ?
                          null :
                          <>
                            <div className={`header-cell ${
                              header.column.columnDef.meta &&
                            !(header.column.columnDef.meta as MetaCustomType).filterable && 'no-filter'
                            }`}>
                              <div className='header-cell-title'>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                                {header.column.columnDef.meta &&
                                (header.column.columnDef.meta as MetaCustomType).toggleabale &&
                                <span onClick={header.column.getToggleSortingHandler()} className='table-icon toggle' />
                                }
                              </div>
                              {header.column.columnDef.meta &&
                              (header.column.columnDef.meta as MetaCustomType).filterable &&
                              <div className='filter-container'>
                                <Filter column={header.column} table={table}/>
                              </div>}
                            </div>
                          </>}

                      </th>
                    ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr
                  className={ row.getIsExpanded() ? 'expanded' : '' }
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize,
                        maxWidth: cell.column.columnDef.maxSize,
                      }}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>

                  ))}
                </tr>

                {renderSubComponent ? (
                  <tr key={row.id + '-expanded'}>
                    <td colSpan={columns.length}>
                      {renderSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {hasPagination && <Pagination table={table} itemsCount={itemsCount || 1}/> }
    </>
  );
}

function Pagination<T>({
  table,
  itemsCount,
}: React.PropsWithChildren<{
  table: ReactTable<T>;
  itemsCount: number;
}>) {
  const dispatch = useAppDispatch();

  const [startNumberShown, setStartNumberShown] = useState(0);

  useEffect(()=>{
    dispatch(paginationChange(table.getState().pagination));
    setStartNumberShown(table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1);
  }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize]);

  return (
    <>
      <div className="pagination-wrapper">
        <span className='pagination-info'>
          <span>Items shown:</span>
          <span className='bold-text'>{`${startNumberShown}-${startNumberShown + table.getState().pagination.pageSize > itemsCount ? itemsCount : startNumberShown + table.getState().pagination.pageSize - 1}`}</span>
          <span>out of</span>
          <span className='bold-text'>{itemsCount}</span>
        </span>
        <div className='separator' />
        <div className='per-page'>
          <span>Items per page:</span>
          <StyledSelect
            name='pagination-select'
            value={{label: table.getState().pagination.pageSize, value: table.getState().pagination.pageSize}}
            onChange={(e) => {
              const value = (e?.['value'] ?? '').toString().toLowerCase() === 'all' ? '' : e?.['value'];
              table.setPageSize(Number(value));
            }}
            options={[10, 20, 30, 40, 50].map((pageSize) => (
              {label: pageSize, value: pageSize}
            ))}
          />
        </div>
        <div className='pagination-func'>
          <IconButton
            classNames="pagination-button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            icon='left-pipe-chevron'
          />
          <IconButton
            classNames="pagination-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon='left-chevron'
          />
          <div className='page-list'>
            {[...Array(6)].map((_, i) => {
              const pageNumber = i + table.getState().pagination.pageIndex;
              return (
                <StyledButton
                  key={pageNumber}
                  onClick={() => table.setPageIndex(pageNumber)}
                  classNames={`page-number ${pageNumber === table.getState().pagination.pageIndex && 'current-page'}`}
                >
                  {pageNumber + 1}
                </StyledButton>
              );
            })}
          </div>
          <IconButton
            classNames="pagination-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon='right-chevron'
          />
          <IconButton
            classNames="pagination-button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            icon='right-pipe-chevron'
          />
        </div>
      </div>
    </>
  );
}

export default Table;
