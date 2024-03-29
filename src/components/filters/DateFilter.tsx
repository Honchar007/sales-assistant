import { useEffect, useState } from 'react';
import { Column } from '@tanstack/react-table';

// components
import CustomDatePicker from '../DatePicker';

function DateFilter({
  column,
}: {
  column: Column<unknown, unknown>
}) {
  const [diapasonDate, setDiapasonDate] = useState<string>();

  useEffect(()=> {
    if (diapasonDate) column.setFilterValue(diapasonDate);
    else column.setFilterValue(undefined);
  }, [diapasonDate]);

  return (
    <CustomDatePicker
      onChangeDate={setDiapasonDate}
    />
  );
}

export default DateFilter;
