import React, { useEffect, useMemo, useState } from 'react';
import { ColumnFiltersState, FilterFn, PaginationState, Row, SortingState } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import Table from '../../components/CustomTable';

// store
import { useAppSelector } from '../../redux/hook';
import { selectIsOpen } from '../../redux/sidebarSlicer';
import { useGetFeedsQuery } from '../../redux/rtk/feeds.api';

// models
import { UpworkFeedSearchBy } from '../../submodules/public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { UpworkFeedSortBy } from '../../submodules/public-common/enums/upwork-feed/upwork-feed-sort-by.enum';
import { SortDirection } from '../../submodules/public-common/enums/common/sort-direction.enum';
import FeedList from '../../interfaces/feed-list';

// config
import getColumns from './components/config-table';

declare module '@tanstack/table-core' {
  interface FilterFns {
    diapason: FilterFn<unknown>
  }
}

function Feed() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const isOpen = useAppSelector(selectIsOpen);

  const { data, isLoading } = useGetFeedsQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    ...(sorting && sorting.length > 0 && {
      sortBy: sorting[0].id as UpworkFeedSortBy,
      sortDirection: (sorting[0].desc ? SortDirection.DESC : SortDirection.ASC),
    }),
    ...(columnFilters.length >= 1 && {searchParameters: [...columnFilters.map((el)=> ({
      searchBy: el.id as UpworkFeedSearchBy, searchQuery: (el.value as string | string[]) ?? '',
    }))]}),
  }, { refetchOnMountOrArgChange: true });

  const rows = useMemo(() => {
    return data?.data.items.items.map((row) => ( {
      url: row.url,
      id: row.id,
      title: row.title,
      published: row.published,
      keywords: row.keywords,
      review: row.review && row.review.type,
      score: row.score,
      matchedCases: row.matchedCases,
      matchedBlogs: row.matchedBlogs,
    }));
  }, [data]);

  // columns
  const columns = getColumns(data?.data.scoreOptions, data?.data.keywordsOptions);

  useEffect(()=>{
    setTotalPages(data?.data.items.totalPages || 0);
    setTotalItems(data?.data.items.totalCount || 0);
  }, [data]);

  const goById = (row: Row<FeedList>) => {
    if (row.id) navigate(`/feed/${row.id}`);
  };

  return (
    <div className='feed-wrapper'>
      <SideBar />
      {/* style={{width: isOpen ? 'calc(100% - 320px)' : '100%' }} */}
      <div className={`main-container ${isOpen ? 'isOpen' : 'isClose'}`} >
        <StyledHeader />
        <div className={'main-wrapper'} >
          <Table
            data={rows || []}
            columns={columns}
            rowFunction={goById}
            pageCount={totalPages}
            pagination={pagination}
            onPaginationChange={setPagination}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            onSortingChange={setSorting}
            sorting={sorting}
            itemsCount={totalItems}
            isLoading={isLoading}
            hasGlobalFilter
            hasPagination
          />
        </div>
      </div>
    </div>
  );
}

export default Feed;
