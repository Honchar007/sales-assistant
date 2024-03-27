import { Column } from '@tanstack/react-table';

// components
import DebouncedInput from '../DebounceFunction';

function SearchFilter({
  column,
}: {
  column: Column<unknown, unknown>
}) {
  const columnFilterValue = column.getFilterValue() ?? '';

  return (
    <DebouncedInput
      type="text"
      value={columnFilterValue as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder=''
      className="w-36 border shadow rounded"
      list={column.id + 'list'}
    />
  );
}

export default SearchFilter;
