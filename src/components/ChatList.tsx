import * as React from 'react';

import {
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';

// component
import StyledLink from './StyledLink';
import Table from './CustomTable';
import ChatItemFunc from './ChatItem';

// models
type ChatList = {
  chatName: string
  id: string
};

// example data
const defaultData: ChatList[] = [
  {
    chatName: 'Hi there! How can I help you?',
    id: 'linsley',
  },
  {
    chatName: 'Hi there! How can I help you?',
    id: 'miller',
  },
  {
    chatName: 'Hi there! How can I help you?',
    id: 'dirte',
  },
  {
    chatName: 'Hi there! How can I help you?',
    id: 'linsley',
  },
  {
    chatName: 'Hi there! How can I help you?',
    id: 'miller',
  },
  {
    chatName: 'Hi there! How can I help you?',
    id: 'dirte',
  },
];

// columns
const columnHelper = createColumnHelper<ChatList>();

const columns: ColumnDef<ChatList, string>[] = [
  columnHelper.accessor('chatName', {
    cell: (info) => <StyledLink onClick={()=>console.log(info.getValue())}>{info.getValue()}</StyledLink>,
    header: () => <span>Chat Name</span>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => {
      const rowData = info.row.original;
      return <ChatItemFunc id={info.getValue()} name={rowData.chatName} />;
    },
    header: () => <span>Last Name</span>,
  }),
];

export default function ChatList() {
  const [data, setData] = React.useState(() => [...defaultData]);

  React.useEffect(()=> {
    setData([...defaultData]);
  }, []);

  return (
    <Table data={data} columns={columns} showHeader={false} />
  );
}
