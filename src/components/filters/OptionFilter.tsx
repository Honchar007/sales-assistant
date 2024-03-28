import { useEffect, useMemo, useState } from 'react';
import { Column } from '@tanstack/react-table';

// components
import MultiSelect from '../MultiSelect';

// models
import { Option } from '../../interfaces/table-state';

function OptionFilter({
  column,
  options,
}: {
  column: Column<unknown, unknown>,
  options: Option[],
}) {
  const columnFilterValue = column.getFilterValue() as string;

  const newoptions = useMemo(() => {
    if (Array.isArray(options)) return [...Array.from(options)];
    return [];
  }, [column.id, options]);

  const [optionSelected, setSelected] = useState<Option[]>(
    [{ label: columnFilterValue, value: columnFilterValue }] || []);
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

  useEffect(()=> {
    if (!columnFilterValue) setSelected([]);
  }, [columnFilterValue]);

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
