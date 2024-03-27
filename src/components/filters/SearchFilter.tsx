/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from '@tanstack/react-table';

// components
import DebouncedInput from '../DebounceFunction';

function SearchFilter({
  column,
}: {
  column: Column<any, unknown>
}) {
  const columnFilterValue = column.getFilterValue() as any;

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder=''
      className="w-36 border shadow rounded"
      list={column.id + 'list'}
    />
  );
}

export default SearchFilter;
