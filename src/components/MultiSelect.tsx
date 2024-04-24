/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { components } from 'react-select';

// models
import { Option } from '../interfaces/table-state';


interface MultiSelect {
  options: Option[],
  value?: Option[],
  onChange?: any,
  isAllSelected?: boolean,
  width?: string,
  widthSelect?: string,
  name?: string,
  setIsAllSelected?: (boolean) => void,
}

const MultiSelect = ({options, width, widthSelect, name, value, onChange, isAllSelected, ...props}: MultiSelect) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      'background': 'var(--white)',
      'display': 'flex',
      'flexWrap': 'nowrap',
      'borderColor': 'var(--gray-400)',
      'color': 'var(--black)',
      'borderRadius': '8px',
      'height': '100%',
      'width': widthSelect ?? '100%',
      '&:hover': {
        borderColor: '0',
      },
      '&:focus': {
        borderColor: 'var(--primary)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      'background': 'var(--white)',
      'color': 'var(--black)',
      'borderColor': 'var(--gray-400)',
      'width': width ?? '100%',
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: 'left',
      color: 'var(--black)',
      backgroundColor: state.isFocused ? 'var(--gray-200)' : 'var(--white)',
    }),
    singleValue: (provided) => ({
      ...provided,
      background: 'var(--white)',
      color: 'var(--black)',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--black)',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '12px 0px 12px 12px',
      width: '100%',
    }),
  };

  const filterOptions = (options: Option[], currOptions: Option[]) =>
    options.length && options?.filter(({ value }: Option) =>
      currOptions?.some((filterVal) => value === filterVal.value));

  const filteredSelectedOptions = value ? filterOptions(options, value) : [];
  const Option = (props: any) => (
    <>
      <components.Option {...props}>
        {props.value === 'All' && !isAllSelected && Array.isArray(filteredSelectedOptions) &&
      filteredSelectedOptions?.length > 0 ? (
            <input
              key={props.value}
              type="checkbox"
              ref={(input) => {
                if (input) input.indeterminate = true;
              }}
              onChange={() => {
                onChange(options.filter(({value}) => value !== 'All'));
              }}
            />
          ) : (
            <input
              key={props.value}
              type="checkbox"
              checked={props.isSelected || isAllSelected}
              onChange={() => {
                if (props.value === 'All') {
                  if (isAllSelected) {
                    onChange([]);
                  } else {
                    onChange(options.filter(({value}) => value !== 'All'));
                  }
                }
              }}
            />
          )}
        <label style={{ marginLeft: '5px' }}>{props.label}</label>
      </components.Option>
      {props.value === 'All' && <div className='separator' />}
    </>
  );

  const ValueContainer = (props: any) => {
    return (
      <components.ValueContainer {...props}>
        <span>
          {Array.isArray(filteredSelectedOptions) && filteredSelectedOptions.length && !isAllSelected ? filteredSelectedOptions.length > 1 ? `${filteredSelectedOptions.length} selected` : filteredSelectedOptions[0].label : 'All'}
        </span>
      </components.ValueContainer>
    );
  };

  return (
    <Select
      options={options}
      value={filteredSelectedOptions as Option[]}
      onChange={onChange}
      name={name}
      isMulti
      isClearable={false}
      components={{
        Option: Option,
        ValueContainer: ValueContainer,
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
      tabSelectsValue={false}
      hideSelectedOptions={false}
      backspaceRemovesValue={false}
      blurInputOnSelect={true}
      className='select'
      {...props}
    />
  );
};

export default MultiSelect;
