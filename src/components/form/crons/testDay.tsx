// // In ToggleDays.js
// import React, { useState } from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { styled } from '@mui/system';

// interface Day {
//   value: string;
//   label: string;
//   name: string;
//   control: any;
// }

// interface Props {
//   selectedDays: number[];
//   setSelectedDays: (selectedDays: number[]) => void;
// }

// const DAYS: Day[] = [
//   {
//     value: 'sunday',
//     label: 'S',
//   },
//   {
//     value: 'monday',
//     label: 'M',
//   },
//   // Add other days
// ];

// const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
//   '& .MuiToggleButtonGroup-grouped': {
//     padding: '0px 8px',
//     '&:not(:first-child)': {
//       borderRadius: '50%',
//     },
//   },
// });

// const StyledToggleButton = styled(ToggleButton)({
//   color: '#692B7C',
//   '&.Mui-selected': {
//     color: 'white',
//     background: '#692B7C',
//   },
//   '&:hover': {
//     borderColor: '#BA9BC3',
//     background: '#BA9BC3',
//   },
//   '&.Mui-selected:hover': {
//     borderColor: '#BA9BC3',
//     background: '#BA9BC3',
//   },
//   minWidth: 32,
//   maxWidth: 32,
//   height: 32,
//   textTransform: 'unset',
//   fontSize: '0.75rem',
// });

// const ToggleDays: React.FC<Props & { index: number }> = ({
//   selectedDays,
//   setSelectedDays,
//   name,
//   control,
//   label,
// }) => {
//   const handleToggle = (
//     event: React.MouseEvent<HTMLElement>,
//     newDays: number[]
//   ) => {
//     setSelectedDays(newDays);
//   };

//   return (
//     <StyledToggleButtonGroup
//       size='small'
//       aria-label='Days of the week'
//       value={selectedDays}
//       onChange={handleToggle}
//     >
//       {DAYS.map((day, index) => (
//         <StyledToggleButton key={index} value={index} aria-label={day.value}>
//           {selectedDays.includes(index) ? day.label : ''}{' '}
//         </StyledToggleButton>
//       ))}
//     </StyledToggleButtonGroup>
//   );
// };

// export default ToggleDays;

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';

interface Day {
  value: string;
  label: string;
}

interface Props {
  name: string;
  control: any;
  defaultValue?: string[]; // Add a defaultValue prop
}

const DAYS: Day[] = [
  {
    value: 'sunday',
    label: 'S',
  },
  {
    value: 'monday',
    label: 'M',
  },
  // Add other days
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  '& .MuiToggleButtonGroup-grouped': {
    padding: '0px 8px',
    '&:not(:first-child)': {
      borderRadius: '50%',
    },
  },
});

const StyledToggleButton = styled(ToggleButton)({
  color: '#692B7C',
  '&.Mui-selected': {
    color: 'white',
    background: '#692B7C',
  },
  '&:hover': {
    borderColor: '#BA9BC3',
    background: '#BA9BC3',
  },
  '&.Mui-selected:hover': {
    borderColor: '#BA9BC3',
    background: '#BA9BC3',
  },
  minWidth: 32,
  maxWidth: 32,
  height: 32,
  textTransform: 'unset',
  fontSize: '0.75rem',
});

const ToggleDays: React.FC<Props> = ({ name, control, defaultValue = [] }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} // Pass defaultValue to Controller
      render={({ field }) => (
        <StyledToggleButtonGroup
          size='small'
          aria-label='Days of the week'
          value={field.value} // Use field.value to get the controlled value
          onChange={(e, newValue) => {
            field.onChange(newValue); // Update field value
            console.log(newValue); // Log the selected value
          }}
        >
          {DAYS.map((day, index) => (
            <StyledToggleButton
              key={index}
              value={day.value}
              aria-label={day.value}
            >
              {day.label}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
      )}
    />
  );
};

export default ToggleDays;
