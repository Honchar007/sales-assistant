import React, { useEffect, useMemo } from 'react';
import { ColumnDef, FilterFn, Row, createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import Table from '../../components/CustomTable';
// import StyledLink from '../../components/StyledLink';

// store
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { optionsChange, paginationChange, selectPagination } from '../../redux/tableSlicer';
import { selectIsOpen } from '../../redux/sidebarSlicer';
import { useGetFeedsQuery } from '../../redux/rtk/feeds.api';

// services
import localStorageService from '../../services/local-storage.service';

// utils
import getColor from '../../utils/get-color';

// models
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
    footer: (props) => props.column.id,
    meta: {
      filterable: true,
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
    footer: (props) => props.column.id,
    meta: {
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
    footer: (props) => props.column.id,
    meta: {
      filterable: true,
      toggleabale: true,
    },
    minSize: 278,
    size: 278,
  }),
  columnHelper.accessor(('published'), {
    cell: (info) =>
      <div className='body-cell-text'>
        <span className='date'>{info.getValue()}</span>
      </div>,
    header: () => <span>Published</span>,
    footer: (props) => props.column.id,
    meta: {
      filterable: true,
      toggleabale: true,
    },
    size: 140,
    minSize: 140,
  }),
  columnHelper.accessor(('keywords'), {
    cell: (info) =>
      <div className='keywords-wrapper body-cell-bubble'>
        {info.getValue().map((el) =>
          <span key={el} className='keywords'>{el}</span>)}
      </div>,
    header: () => <span>Keywords</span>,
    footer: (props) => props.column.id,
    meta: {
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
    footer: (props) => props.column.id,
    meta: {
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
    footer: (props) => props.column.id,
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
    footer: (props) => props.column.id,
    meta: {
      filterable: false,
      toggleabale: false,
    },
    minSize: 110,
    size: 110,
  }),
];

function Feed() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectPagination);

  const isOpen = useAppSelector(selectIsOpen);

  const { data } = useGetFeedsQuery({
    token: localStorageService.get().accessToken,
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  }, { refetchOnMountOrArgChange: true });

  console.log(isOpen);

  const rows = useMemo(() => {
    // call warning Cannot update a component (`Feed`) while rendering a different component (`Feed`).
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

  useEffect(()=>{
    dispatch(optionsChange({
      scoreOptions: data?.data.scoreOptions,
      keywordsOptions: data?.data.keywordsOptions,
    }));
    dispatch(paginationChange({
      totalCount: data?.data.items.totalCount,
      totalPages: data?.data.items.totalPages,
    }));
  }, [data]);

  const goById = (row: Row<FeedList>) => {
    if (row.id) navigate(`/feeds/${row.id}`);
  };

  useEffect(() => {
    console.log(data?.data.keywordsOptions);
  }, []);

  return (
    <div className='feed-wrapper'>
      <SideBar />
      <div className='main-wrapper' style={{width: isOpen ? 'calc(100% - 320px)' : '100%' }}>
        <StyledHeader />
        <Table
          data={rows || []}
          columns={columns}
          rowFunction={goById}
          pageCount={pagination.totalPages}
          pageSize={pagination.pageSize}
          itemsCount={pagination.totalCount}
          hasGlobalFilter
          hasPagination
        />
      </div>
    </div>
  );
}

export default Feed;
