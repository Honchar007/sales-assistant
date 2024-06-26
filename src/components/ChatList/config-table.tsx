import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

// components
import StyledLink from '../StyledLink';
import ChatItemFunc from './ChatItemFunc';

// models
import { IChatItem } from '../../submodules/public-common/interfaces/dto/chat/dto/ichat-item';

const columnHelper = createColumnHelper<IChatItem>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chatHistoryColumns = (goById: (string) => void, isChatPage = false): ColumnDef<IChatItem, any>[] => [
  columnHelper.accessor('name', {
    cell: (info) => <StyledLink className='chat-name' onClick={()=>goById(info.row.original.id)}>{info.getValue()}</StyledLink>,
    header: () => <span>Chat Name</span>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'chat-id',
    cell: (info) => {
      const rowData = info.row.original;
      return <ChatItemFunc id={info.getValue()} name={rowData.name} isChatPage={isChatPage} />;
    },
    header: () => <span>Last Name</span>,
  }),
];

export default chatHistoryColumns;
