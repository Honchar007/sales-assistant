import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// component
import Table from '../CustomTable';

// store
import { useGetChatsQuery } from '../../redux/rtk/chatHistory.api';
import chatHistoryColumns from './config-table';

export default function ChatList({isChatPage = false}: {isChatPage: boolean}) {
  const { data } = useGetChatsQuery();
  const navigate = useNavigate();

  const rows = useMemo(() => {
    return data?.data.map((row) => ( {
      name: row.name,
      id: row.id,
      accountId: row.accountId,
    }));
  }, [data]);

  const goById = (id: string) => {
    if (id) navigate(`/chats/${id}`);
  };

  const columns = chatHistoryColumns(goById, isChatPage);

  return (
    <Table data={rows || []} columns={columns} showHeader={false} />
  );
}
