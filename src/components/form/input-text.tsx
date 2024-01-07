'use client';
import { TextField } from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

import { FormInputProps } from '@/components/types/form';

export const InputText: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type = 'text',
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const inputType = showPasswordToggle && !showPassword ? 'password' : type;

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
            // type={type}
            type={inputType}
            error={!!error}
            helperText={error ? error.message : null}
            fullWidth
            InputProps={
              showPasswordToggle
                ? {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleTogglePassword} edge='end'>
                          {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : undefined
            }
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
