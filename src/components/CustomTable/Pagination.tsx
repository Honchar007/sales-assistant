import { useEffect, useState } from 'react';
import type {
  Updater,
} from '@tanstack/react-table';

// components
import StyledSelect from '../StyledSelect';
import IconButton from '../IconButton';
import StyledButton from '../StyledButton';

// hooks
import { usePagination } from '../../hooks/usePagination';

function Pagination({
  itemsCount,
  setPageSize,
  goPreviousPage,
  goNextPage,
  goPageByIndex,
  canPreviousPage,
  canNextPage,
  currPageIndex,
  currPageSize,
  totalPages,
}: React.PropsWithChildren<{
  itemsCount: number,
  setPageSize: (updater: Updater<number>) => void,
  goPageByIndex: (updater: Updater<number>) => void
  goPreviousPage: () => void,
  goNextPage: () => void,
  canPreviousPage: boolean,
  canNextPage: boolean,
  currPageIndex: number,
  currPageSize: number,
  totalPages: number,
}>) {
  const [startNumberShown, setStartNumberShown] = useState(0);

  const pagState = usePagination({
    totalCount: itemsCount,
    pageSize: currPageSize,
    currentPage: currPageIndex,
  });

  useEffect(() => {
    setStartNumberShown(currPageIndex * currPageSize + 1);
  }, [currPageIndex, currPageSize]);

  return (
    <>
      <div className="pagination-wrapper">
        <span className='pagination-info'>
          <span>Items shown:</span>
          <span className='bold-text'>{`${startNumberShown}-${startNumberShown + currPageSize > itemsCount ? itemsCount : startNumberShown + currPageSize - 1}`}</span>
          <span>out of</span>
          <span className='bold-text'>{itemsCount}</span>
        </span>
        <div className='separator' />
        <div className='per-page'>
          <span>Items per page:</span>
          <StyledSelect
            name='pagination-select'
            value={{label: currPageSize, value: currPageSize}}
            onChange={(e) => {
              const value = (e?.['value'] ?? '').toString().toLowerCase() === 'all' ? '' : e?.['value'];
              setPageSize(Number(value));
            }}
            options={[10, 20, 30, 40, 50].map((pageSize) => (
              {label: pageSize, value: pageSize}
            ))}
          />
        </div>
        <div className='pagination-func'>
          <IconButton
            classNames="pagination-button"
            onClick={() => goPageByIndex(0)}
            disabled={!canPreviousPage}
            icon='left-pipe-chevron'
          />
          <IconButton
            classNames="pagination-button"
            onClick={() => goPreviousPage()}
            disabled={!canPreviousPage}
            icon='left-chevron'
          />
          <div className='page-list'>
            {pagState && pagState.map((el, index) => {
              return (
                typeof el === 'number'?
                  <StyledButton
                    key={el}
                    onClick={() => goPageByIndex(el-1)}
                    classNames={`page-number ${(el-1) === currPageIndex && 'current-page'}`}
                  >
                    {el}
                  </StyledButton> :
                  <span
                    key={`${el}${index}`}
                    className={'page-number dots'}
                  >
                    {el}
                  </span>
              );
            })}
          </div>
          <IconButton
            classNames="pagination-button"
            onClick={() => goNextPage()}
            disabled={!canNextPage}
            icon='right-chevron'
          />
          <IconButton
            classNames="pagination-button"
            onClick={() => goPageByIndex(totalPages)}
            disabled={!canNextPage}
            icon='right-pipe-chevron'
          />
        </div>
      </div>
    </>
  );
}

export default Pagination;
