'use client';
import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

import { FormInputProps } from '@/components/types/form';

export const InputText: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type = 'text',
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            label={label}
            value={value || ''}
            onChange={onChange}
            type={type}
            error={!!error}
            helperText={error ? error.message : null}
            fullWidth
            sx={{
              //width: { sm: 200, md: 350 },
              // width: '100%',
              '& .MuiInputBase-root': {
                height: 50,
                borderRadius: '0.575rem',
              },
              //mb: 2,
            }}
          />
        );
      }}
    />
  );
};
