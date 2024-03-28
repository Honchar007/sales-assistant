import { FilterFn } from '@tanstack/react-table';

const diapasonFilter: FilterFn<unknown> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId) as number;
  if (Array.isArray(value) && columnId) {
    return value.some((el)=>{
      return el[0] <= rowValue && rowValue <= el[1] ? true : false;
    });
  } else {
    return true;
  }
};

export { diapasonFilter };
