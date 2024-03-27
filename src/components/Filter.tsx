/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { Column, Table } from '@tanstack/react-table';

// components
import DebouncedInput from './DebounceFunction';
import MultiSelect from './MultiSelect';
import CustomDatePicker from './DatePicker';

export type Option = {
  value: number | string | number[];
  label: string;
};

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue() as any;

  const options = useMemo(() => {
    if (Array.isArray(firstValue)) {
      const options = new Set<string | number>();
      table.getPreFilteredRowModel().flatRows.forEach((row) => {
        row.getValue<any>(column.id).forEach((el) => options.add(el));
      });
      return [...Array.from(options).map((i) => ({label: i, value: i}))];
    } else if (typeof firstValue === 'number') {
      return [...[{
        label: '0 - 100',
        value: [0, 100],
      },
      {
        label: '100 - 150',
        value: [100, 150],
      },
      {
        label: '150 - 200',
        value: [150, 200],
      },
      {
        label: '200 - 250',
        value: [200, 250],
      },
      {
        label: '250+',
        value: [250, Number(column.getFacetedMinMaxValues()?.[1] ?? 250)],
      },
      ]];
    } else {
      return [...Array.from(column.getFacetedUniqueValues().keys()).map((el)=> ({label: el, value: el}))];
    }
  }, [column.id, table.getPreFilteredRowModel]);

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
      column.setFilterValue(null) :
      column.setFilterValue([...values]);
  };

  return (
    <>
      {/* {typeof firstValue === 'number' &&
      <StyledSelect
        name={column.id}
        value={diapason}
        onChange={(e) => {
          const value = (e?.['value'] ?? '').toString().toLowerCase() === 'all' ? '' : e?.['value'];
          column.setFilterValue([value[0], value[1]]);
        }}
        options={[{label: 'All', value: 'All'}, ...options]}
      />
      } */}
      {typeof firstValue === 'number' &&
        <MultiSelect onChange={handleChange}
          value={optionSelected}
          isAllSelected={isAllSelected}
          options={[{label: 'All', value: 'All'}, ...options]}
          setIsAllSelected={setIsAllSelected}
        />
      }
      {Array.isArray(firstValue) &&
      <>
        {/* <StyledSelect
          isMulti
          name={column.id}
          value={value}
          onChange={(e) => {
            const value = (e?.['value'] ?? '').toString().toLowerCase() === 'all' ? '' : e?.['value'];
            column.setFilterValue([value]);
          }}
          options={[{label: 'All', value: 'All'}, ...options]}
        /> */}
        <MultiSelect
          key="example_id"
          name={column.id}
          onChange={handleChange}
          value={optionSelected}
          isAllSelected={isAllSelected}
          width='240px'
          options={[{label: 'All', value: 'All'}, ...options]}
          setIsAllSelected={setIsAllSelected}
        />
      </>
      }
      {typeof firstValue === 'string' &&
        <>
          {!isNaN(new Date(firstValue) as any) ?
            <CustomDatePicker /> :
            <DebouncedInput
              type="text"
              value={(columnFilterValue ?? '') as string}
              onChange={(value) => column.setFilterValue(value)}
              placeholder=''
              className="w-36 border shadow rounded"
              list={column.id + 'list'}
            />
          }
        </>
      }
    </>
  );
}

export default Filter;
