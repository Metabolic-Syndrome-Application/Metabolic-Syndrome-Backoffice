import { TextField } from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FaIdCard } from 'react-icons/fa';

import { FormInputProps } from '@/types/form';

export const IDCardInputText: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type = 'text',
  defaultValue,
  disabled = false,
}) => {
  const handleCardDisplay = (value: string | undefined) => {
    if (!value) return ''; // Return empty string if value is undefined
    const rawText = value.replace(/\s+/g, ''); // Remove old space
    const formattedText = rawText.replace(/(.{4})/g, '$1 '); // Insert space after every 4 characters
    return formattedText.trim(); // Trim any leading/trailing spaces
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            label={label}
            value={handleCardDisplay(value)} // Apply custom formatting to value
            onChange={(e) => onChange(handleCardDisplay(e.target.value))}
            type={type}
            disabled={disabled}
            error={!!error}
            helperText={error ? error.message : null}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <FaIdCard />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 50,
                textAlign: 'center',
                borderRadius: '0.575rem',
                backgroundColor: disabled ? '#F6F6F6' : 'transparent',
              },
            }}
          />
        );
      }}
    />
  );
};
