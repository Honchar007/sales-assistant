import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

// components
import SearchFilter from '../../../components/filters/SearchFilter';
import DateFilter from '../../../components/filters/DateFilter';
import OptionFilter from '../../../components/filters/OptionFilter';

// models
import FeedList from '../../../interfaces/feed-list';
import { IOptionInterface } from '../../../submodules/public-common/interfaces/dto/common/ioption.interface';
import { ReviewType } from '../../../submodules/public-common/enums/upwork-feed/review-type.enum';

// utils
import { formatDate, getColor } from '../util';

// constants
const reactionOptions = [
  {
    label: ReviewType.Like,
    value: ReviewType.Like,
  },
  {
    label: ReviewType.Dislike,
    value: ReviewType.Dislike,
  },
];

function getColumns(scoreOptions: IOptionInterface[] | undefined, keywordsOptions: IOptionInterface[] | undefined,) {
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
        options: keywordsOptions,
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
        options: scoreOptions,
        filterable: true,
        toggleabale: true,
      },
      filterFn: 'diapason',
      enableResizing: false,
      size: 140,
      minSize: 140,
    }),
    columnHelper.accessor(('review'), {
      cell: (info) =>
        <div className='body-cell-text review'>
          <span className={`${info.getValue()}`}>
          </span>
        </div>,
      header: () => <span>Reaction</span>,
      meta: {
        filter: OptionFilter,
        options: reactionOptions,
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

  return columns;
}

export default getColumns;
