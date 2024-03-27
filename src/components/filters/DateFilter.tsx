/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Column } from '@tanstack/react-table';

// components
import CustomDatePicker from '../DatePicker';

export type Option = {
  value: number | string | number[];
  label: string;
};

function DateFilter({
  column,
}: {
  column: Column<any, unknown>
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
