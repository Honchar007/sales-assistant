import { Fragment, useState } from 'react';
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
  FilterFn,
  VisibilityState,
} from '@tanstack/react-table';

// components
import StyledButton from '../StyledButton';
import Pagination from './Pagination';

// models
import ReactTableProps, { MetaCustomType } from '../../interfaces/table-components';

// utils
const diapasonFilter: FilterFn<unknown> = (row, columnId, value) => {
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
  pageCount,
  itemsCount,
  onSortingChange,
  sorting,
  onColumnFiltersChange,
  columnFilters,
  onPaginationChange,
  pagination,
  showHeader = true,
  hasGlobalFilter = false,
  hasPagination = false,
  rowFunction,
}: ReactTableProps<T>) {
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
    manualFiltering: true,
    manualSorting: true,
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
    onPaginationChange: onPaginationChange,
    onColumnFiltersChange: onColumnFiltersChange,
    onSortingChange: onSortingChange,
  });

  const handleRowClick = (row) => {
    if (rowFunction) rowFunction(row);
  };

  return (
    <>
      { hasGlobalFilter &&
      <div className='subheader'>
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
                              (header.column.columnDef.meta as MetaCustomType).filter &&
                              <div className='filter-container'>
                                {header.column.columnDef.meta &&
                                  (header.column.columnDef.meta as MetaCustomType).options ?
                                  (header.column.columnDef.meta as MetaCustomType).filter({
                                    column: header.column,
                                    options: (header.column.columnDef.meta as MetaCustomType).options,
                                  }) :
                                  (header.column.columnDef.meta as MetaCustomType).filter({
                                    column: header.column})}
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

      {hasPagination &&
      <Pagination
        itemsCount={itemsCount || 1}
        currPageSize={table.getState().pagination.pageSize || 10}
        currPageIndex={table.getState().pagination.pageIndex || 0}
        goNextPage={table.nextPage}
        goPreviousPage={table.previousPage}
        goPageByIndex={table.setPageIndex}
        setPageSize={table.setPageSize}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        totalPages={table.getPageCount() - 1 || 1}
      />
      }
    </>
  );
}

export default Table;
