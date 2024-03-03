import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

import { FormDropdownProps } from '@/types/form';


export const RadioOption: React.FC<FormDropdownProps> = ({
  name,
  control,
  label,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Stack>
            <FormLabel component='legend'>{label}</FormLabel>
            <RadioGroup row value={value || ''} onChange={onChange}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{
                    mr: 4,
                  }}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </Stack>
        );
      }}
    />
  );
};
