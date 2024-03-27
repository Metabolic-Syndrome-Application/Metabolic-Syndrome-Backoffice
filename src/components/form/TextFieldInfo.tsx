/* eslint-disable unused-imports/no-unused-vars */
// eslint-disable-next-line unused-imports/no-unused-vars
import { styled, TextField } from '@mui/material';
import React from 'react';

interface TextFieldInfoProps {
  label: string;
  value: string | string[] | unknown;
  className?: string;
  isSelected?: string | boolean;
}

export const TextFieldInfo: React.FC<TextFieldInfoProps> = ({
  label,
  value,
  className,
  isSelected,
  ...props
}) => {
  // Styled TextField
  const StyledTextField = styled(
    ({ isSelected, ...props }: TextFieldInfoProps) => (
      <TextField {...props} fullWidth />
    )
  )(({ isSelected }: TextFieldInfoProps) => ({
    '& .MuiInputBase-root': {
      height: 50,
      borderRadius: '0.575rem',
      backgroundColor: isSelected ? '#C9E1FD' : '#FFFFFF',
    },
    '& .Mui-focused': {
      backgroundColor: '#C9E1FD',
    },
  }));

  const renderTextField = (text: string | unknown, index?: number) => (
    <StyledTextField
      {...props}
      key={index}
      label={label}
      value={text}
      className={`${className}`}
      isSelected={isSelected} // Convert isSelected to a boolean value
    />
  );

  return (
    //Show array Textfield list plan
    <div>
      {Array.isArray(value) ? (
        <ul className='flex flex-wrap items-center gap-4 '>
          {value.map((item, index) => (
            <li key={index} className='flex w-full items-center justify-center'>
              <div className=' mr-4 flex h-2 w-2 items-center justify-center rounded-full  bg-blue-100'></div>
              {renderTextField(item, index)}
            </li>
          ))}
        </ul>
      ) : (
        renderTextField(value)
      )}
    </div>
  );
};
