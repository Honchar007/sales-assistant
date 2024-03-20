/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select, { PropsValue } from 'react-select';

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: any;
  isMulti?: boolean;
  width?: string;
  options: any;
  onChange: (selectedOption: PropsValue<typeof Option>) => void;
}

function StyledSelect({
  name,
  width,
  label,
  placeholder,
  value,
  options,
  onChange,
  isMulti = false,
  ...props
}: SelectProps) {
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      background: 'var(--white)',
      display: 'flex',
      flexWrap: 'nowrap',
      borderColor: 'var(--gray-400)',
      color: 'var(--black)',
      width: width ? `${width}px` : '100%',
      borderRadius: '8px',
      height: '100%',
    }),
    menu: (provided) => ({
      ...provided,
      background: 'var(--white)',
      color: 'var(--black)',
      borderColor: 'var(--gray-400)',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'var(--black)',
      backgroundColor: state.isFocused ? 'var(--gray-200)' : 'var(--white)',
    }),
    singleValue: (provided) => ({
      ...provided,
      background: 'var(--white)',
      color: 'var(--black)',
      borderColor: 'var(--gray-400)',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--black)',
    }),
  };

  return (
    <div className='select-container'>
      {label && <label htmlFor={name} className='input-label'>{label}</label>}
      <Select
        menuPlacement="auto"
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}

        styles={customSelectStyles}
        placeholder={placeholder}
        className='select'
        {...props}
      />
    </div>
  );
}

StyledSelect.propTypes = {

};

export default StyledSelect;

