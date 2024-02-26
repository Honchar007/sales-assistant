import { Fragment, useEffect, useState } from 'react';

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';

import type {
  ColumnDef,
  Row,
  // Table as ReactTable,
  PaginationState,
} from '@tanstack/react-table';

interface ReactTableProps<T extends object> {
  data: T[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[],
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement,
  pageIndex?: number,
  pageSize?: number,
  pageCount?: number,
  onPaginationChange?: (pagination: PaginationState) => void,
  className?: string,
  showHeader?: boolean,
}

function Table<T extends object>({
  data,
  columns,
  renderSubComponent,
  pageIndex,
  pageSize,
  pageCount,
  onPaginationChange,
  showHeader = true,
}: ReactTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 15,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange(pagination);
    }
  }, [pagination, onPaginationChange]);

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {showHeader &&
                    headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ?
                          null :
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
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
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    style={{
                      width: cell.column.getSize(),
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

      {/* <Pagination table={table} /> */}
    </div>
  );
}

export default Table;
