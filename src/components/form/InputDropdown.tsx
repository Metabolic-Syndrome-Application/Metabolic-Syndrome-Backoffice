import {
  Autocomplete,
  FilterOptionsState,
  Paper,
  TextField,
  createFilterOptions,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

import { FormDropdownProps } from '@/types/form';

// Set display max height menulist dropdown show
const CustomPaperComponent = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const maxHeight = 195;

    return (
      <Paper {...props} ref={ref} style={{ maxHeight, overflowY: 'auto' }} />
    );
  }
);

export const InputDropdown: React.FC<FormDropdownProps> = ({
  name,
  control,
  label,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          disablePortal={false}
          autoHighlight
          selectOnFocus
          autoComplete
          value={
            value !== undefined && value !== null
              ? options.find((option) => option.value === value) || {
                  value: '',
                  label: value || '',
                }
              : null
          }
          onChange={(e, selectedValue) =>
            onChange(selectedValue?.value || null)
          }
          options={options}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          componentsProps={{
            popper: {
              modifiers: [
                {
                  name: 'flip',
                  enabled: false,
                },
              ],
            },
          }}
          PaperComponent={CustomPaperComponent}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error ? error?.message : null}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  height: 50,
                  borderRadius: '0.575rem',
                },
              }}
            />
          )}
        />
      )}
    />
  );
};
