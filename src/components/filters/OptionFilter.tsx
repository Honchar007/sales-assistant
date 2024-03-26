/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { Column } from '@tanstack/react-table';

// components
import MultiSelect from '../MultiSelect';

export type Option = {
  value: number | string | number[];
  label: string;
};

function OptionFilter({
  column,
  options,
}: {
  column: Column<any, unknown>,
  options: Option[],
}) {
  // const firstValue = table
  //   .getPreFilteredRowModel()
  //   .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue() as any;
  // const value = !!columnFilterValue ?
  //   {value: columnFilterValue, label: columnFilterValue} :
  //   {value: 'All', label: 'All'};
  const newoptions = useMemo(() => {
    if (Array.isArray(options)) return [...Array.from(options)];
    return [];
  }, [column.id, options]);

  const [optionSelected, setSelected] = useState<Option[]>(columnFilterValue || []);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const handleChange = (selected: Option[]) => {
    setSelected([...selected]);
    const values = selected.map((el) => el.value);
    if (selected.length === options.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
    selected.length === options.length || selected.length === 0 ?
      column.setFilterValue(undefined) :
      column.setFilterValue([...values]);
  };

  return (
    <MultiSelect
      key="example_id"
      name={column.id}
      onChange={handleChange}
      value={optionSelected}
      isAllSelected={isAllSelected}
      width='240px'
      options={[{label: 'All', value: 'All'}, ...newoptions]}
      setIsAllSelected={setIsAllSelected}
    />
  );
}

export default OptionFilter;
