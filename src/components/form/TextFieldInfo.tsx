// Use in Profile Doctor/Staff
// import React from 'react';
// import { TextField } from '@mui/material';

// type TextFieldInfo = {
//   label: string;
//   value: string | unknown;
// };

// export const TextFieldInfo = ({ label, value }: TextFieldInfo) => (
//   <TextField
//     id='outlined-read-only-input'
//     label={label}
//     value={value}
//     InputProps={{
//       readOnly: true,
//     }}
//     sx={{
//       width: '100%',
//       '& .MuiInputBase-root': {
//         height: 50,
//         borderRadius: '0.575rem',
//       },
//     }}
//   />
// );
import { TextField } from '@mui/material';
import React from 'react';

interface TextFieldInfoProps {
  label: string;
  value: string | string[] | unknown;
}

export const TextFieldInfo: React.FC<TextFieldInfoProps> = ({
  label,
  value,
}) => {
  const renderTextField = (text: string | unknown, index?: number) => (
    <TextField
      key={index}
      id={`outlined-read-only-input-${index}`}
      label={label}
      value={text}
      InputProps={{
        readOnly: true,
      }}
      fullWidth
      sx={{
        '& .MuiInputBase-root': {
          height: 50,
          borderRadius: '0.575rem',
        },
      }}
    />
  );

  return (
    <div className=''>
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

export default TextFieldInfo;
