import { useState } from 'react';
import DatePicker from 'react-datepicker';

interface DatePicker {
  onChangeDate?: (diapason: string | undefined) => void,
}

const CustomDatePicker = ({ onChangeDate }: DatePicker) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onChangeDate) onChangeDate(start ? `${start} - ${end ?? start}` : undefined);
  };

  return (
    <DatePicker
      className='date-picker'
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      maxDate={new Date()}
      dateFormat="dd/MM/YYYY"
      calendarStartDay={1}
      formatWeekDay={(nameOfDay: string) => nameOfDay.substring(0, 3).toUpperCase()}
      selectsRange
      isClearable
    />
  );
};

export default CustomDatePicker;
