'use client';
import { FormHelperText } from '@mui/material';
import * as React from 'react';
import { Controller } from 'react-hook-form';

import { FormInputMultilineProps } from '@/types/form';

//Textarea
export const InputMultiline = ({
  name,
  control,
  label,
}: FormInputMultilineProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div>
            <textarea
              id='outlined-multiline-flexible'
              className='border-form-gray block h-full min-h-[100px] w-full resize rounded-lg border p-2.5 focus:border-[#C9E1FD]'
              value={value}
              onChange={onChange}
              placeholder={label}
            />
            {error && (
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
};
