"use client"
import * as React from 'react';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { FormInputMultilineProps } from '@/types/form';

export const InputMultiline = ({ name, control, label }: FormInputMultilineProps) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {

        return (
          <div>
            <textarea
              id="outlined-multiline-flexible"
              className="block p-2.5 w-full h-full min-h-[100px] resize rounded-lg border border-form-gray focus:border-[#C9E1FD]"
              value={value}
              onChange={onChange}
              placeholder={label}
            />
            {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error.message}</FormHelperText>}
          </div>
        );
      }}
    />
  );
};

