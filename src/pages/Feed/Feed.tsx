import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef, ColumnFiltersState, FilterFn, PaginationState, Row, SortingState, createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import Table from '../../components/CustomTable';
import DateFilter from '../../components/filters/DateFilter';
import SearchFilter from '../../components/filters/SearchFilter';
import OptionFilter from '../../components/filters/OptionFilter';
// import StyledLink from '../../components/StyledLink';

// store
import { useAppSelector } from '../../redux/hook';
import { selectIsOpen } from '../../redux/sidebarSlicer';
import { useGetFeedsQuery } from '../../redux/rtk/feeds.api';

// utils
import getColor from '../../utils/get-color';
import formatDate from '../../utils/format-date';

// models
import { UpworkFeedSearchBy } from '../../submodules/public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { UpworkFeedSortBy } from '../../submodules/public-common/enums/upwork-feed/upwork-feed-sort-by.enum';
import { SortDirection } from '../../submodules/public-common/enums/common/sort-direction.enum';
import Spinner from '../../components/Spinner';

type FeedList = {
  url: string,
  id: string | undefined,
  title: string
  published: string,
  keywords: string[],
  score: number,
  matchedCases: number,
  matchedBlogs: number,
};

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

  const { data, isFetching } = useGetFeedsQuery({
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
      score: row.score,
      matchedCases: row.matchedCases,
      matchedBlogs: row.matchedBlogs,
    }));
  }, [data]);

  // columns
  const columnHelper = createColumnHelper<FeedList>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<FeedList, any>[] = [
    columnHelper.accessor('id', {
      cell: (info) =>
        <div className='body-cell-text'>
          <span className='id'>{info.getValue()}</span>
        </div>,
      header: () => <span>Id</span>,
      meta: {
        filterable: true,
        filter: SearchFilter,
        toggleabale: true,
      },
      enableHiding: true,
    }),
    columnHelper.accessor('url', {
      cell: (info) =>
        <div className='body-cell-text'>
          <span className='link'>{info.getValue()}</span>
        </div>,
      header: () => <span>Link</span>,
      meta: {
        filter: SearchFilter,
        filterable: true,
        toggleabale: true,
      },
      enableHiding: true,
    }),
    columnHelper.accessor('title', {
      cell: (info) =>
        <div className='body-cell-text'>
          <a
            className='title'
            href={info.row.original.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {info.getValue()}
          </a>
        </div>,
      header: () => <span>Title</span>,
      meta: {
        filter: SearchFilter,
        filterable: true,
        toggleabale: true,
      },
      minSize: 278,
      size: 278,
    }),
    columnHelper.accessor(('published'), {
      cell: (info) =>
        <div className='body-cell-text'>
          <span className='date'>{formatDate(info.getValue())}</span>
        </div>,
      header: () => <span>Published</span>,
      meta: {
        filter: DateFilter,
        filterable: true,
        toggleabale: true,
      },
      size: 140,
      minSize: 140,
    }),
    columnHelper.accessor(('keywords'), {
      cell: (info) =>
        <div className='keywords-wrapper body-cell-bubble'>
          {Array.isArray(info.getValue()) && info.getValue().map((el) =>
            <span key={el} className='keywords'>{el}</span>)}
        </div>,
      header: () => <span>Keywords</span>,
      meta: {
        filter: OptionFilter,
        options: data?.data.keywordsOptions,
        filterable: true,
        toggleabale: false,
      },
      filterFn: 'arrIncludesAll',
      enableResizing: false,
      minSize: 278,
      size: 278,
    }),
    columnHelper.accessor(('score'), {
      cell: (info) =>
        <div className='body-cell-bubble'>
          <span className={`score ${getColor(info.getValue())}`}>{info.getValue()}</span>
        </div>,
      header: () => <span>Score</span>,
      meta: {
        filter: OptionFilter,
        options: data?.data.scoreOptions,
        filterable: true,
        toggleabale: true,
      },
      filterFn: 'diapason',
      enableResizing: false,
      size: 140,
      minSize: 140,
    }),
    columnHelper.accessor(('matchedCases'), {
      cell: (info) =>
        <div className='body-cell-text'>
          <span>{info.getValue()}</span>
        </div>,
      header: () => <span>Matched cases</span>,
      meta: {
        filterable: false,
        toggleabale: false,
      },
      minSize: 110,
      size: 110,
    }),
    columnHelper.accessor(('matchedBlogs'), {
      cell: (info) =>
        <div className='body-cell-text'>
          <span>{info.getValue()}</span>
        </div>,
      header: () => <span>Matched blogs</span>,
      meta: {
        filterable: false,
        toggleabale: false,
      },
      minSize: 110,
      size: 110,
    }),
  ];

  useEffect(()=>{
    setTotalPages(data?.data.items.totalPages || 0);
    setTotalItems(data?.data.items.totalCount || 0);
  }, [data]);

  const goById = (row: Row<FeedList>) => {
    if (row.id) navigate(`/feeds/${row.id}`);
  };

  return (
    <div className='feed-wrapper'>
      <SideBar />
      <div className='main-wrapper' style={{width: isOpen ? 'calc(100% - 320px)' : '100%' }}>
        <StyledHeader />
        {isFetching ? <Spinner size='100' /> :
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
            hasGlobalFilter
            hasPagination
          />}
      </div>
    </div>
  );
}

export default Feed;
