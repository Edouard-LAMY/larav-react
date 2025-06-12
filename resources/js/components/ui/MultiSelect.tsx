import React from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';
import chroma from 'chroma-js';

export type SelectOption = {
  value: number | string;
  label?: string;
  name?: string;
  color?: string;
};

type MultiSelectProps = {
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  placeholder?: string;
  id?: string
};

const colourStyles: StylesConfig<SelectOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color ?? '#cccccc');
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color ?? '#cccccc');
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color ?? '#000000',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color ?? '#000000',
    ':hover': {
      backgroundColor: data.color ?? '#000000',
      color: 'white',
    },
  }),
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  id,
}) => {
  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={(newValue: MultiValue<SelectOption>) =>
        onChange(newValue as SelectOption[])
      }
      closeMenuOnSelect={false}
      styles={colourStyles}
      placeholder={placeholder}
      id={id}
    />
  );
};

export default MultiSelect;
