import { useMemo } from 'react';

// component
import Table from '../CustomTable';

// store
import { useGetChatsQuery } from '../../redux/rtk/chatHistory.api';
import chatHistoryColumns from './config-table';

export default function ChatList() {
  const { data } = useGetChatsQuery();

  const rows = useMemo(() => {
    return data?.data.map((row) => ( {
      name: row.name,
      id: row.id,
      accountId: row.accountId,
    }));
  }, [data]);

  const columns = chatHistoryColumns;

  return (
    <Table data={rows || []} columns={columns} showHeader={false} />
  );
}
