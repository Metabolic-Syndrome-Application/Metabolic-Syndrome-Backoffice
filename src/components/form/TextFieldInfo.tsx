// Use in Profile Doctor/Staff
import React from 'react';
import { TextField } from '@mui/material';

type TextFieldInfo = {
  label: string;
  value: string | unknown;
};

export const TextFieldInfo = ({ label, value }: TextFieldInfo) => (
  <TextField
    id='outlined-read-only-input'
    label={label}
    value={value}
    InputProps={{
      readOnly: true,
    }}
    sx={{
      width: '100%',
      '& .MuiInputBase-root': {
        height: 50,
        borderRadius: '0.575rem',
      },
    }}
  />
);
