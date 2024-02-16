import { Chip, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';

interface User {
  id: number;
  name: string;
}

export const userList: User[] = [
  { id: 1, name: 'name 1' },
  { id: 2, name: 'name 2' },
  { id: 3, name: 'name 3' },
  { id: 4, name: 'name 4' },
  { id: 5, name: 'name 5' },
];

interface AutocompleteControlledProps {
  name: string;
  label: string;
  control: any; // Add control prop
  defaultValue?: any; // Add defaultValue prop
  //options?: { name: string; id: string }[]; // Declare options as readonly array
  //options?: User[]; // Adjust the type of options to accept User[]
}

export const AutocompleteControlled: React.FC<AutocompleteControlledProps> = ({
  name,
  label,
  control,
  defaultValue, // Destructure defaultValue from props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} // Pass defaultValue to Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          id='tags-filled'
          value={value} // Ensure value is always controlled
          onChange={(_, newValue) => onChange(newValue)}
          options={userList.map((option) => option.name)}
          // options={options}
          filterOptions={(x) => x}
          freeSolo
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                // key={index}
                variant='outlined'
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant='filled'
              label={label}
              placeholder='Search'
            />
          )}
        />
      )}
    />
  );
};
