import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { FormRadioBtnPropsTest } from '@/types/form';

const RadioSelectStage = ({
  groupLabel,
  groupName,
  options,
  onChange,
}: FormRadioBtnPropsTest) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const radioGroupHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(event); // Pass the event to parent component

    // // Check if the selected value is 'yes' and trigger a function
    // if (newValue === 'yes') {
    //   // Trigger a function or change the step here
    //   console.log('Selected value is YES!');
    //   // Call the function to change the step in the parent component
    //   // Example: functionToChangeStep();
    // }
  };

  useEffect(() => {
    console.log('select', selectedValue);
  }, [selectedValue]);

  return (
    <Stack>
      <FormLabel id={`${groupName}-label`} className='text-black'>
        {groupLabel}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${groupName}-label`}
        name={groupName}
        onChange={radioGroupHandler}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );
};

// const RadioSelectStage = ({
//   groupLabel,
//   groupName,
//   options,
//   selectedValue,
//   onChange,
// }: RadioButtonProps) => {
//   const [selected, setSelectedValue] = useState<String>('');

//   function radioGroupHandler(event: React.ChangeEvent<HTMLInputElement>) {
//     setSelectedValue(event.target.value);
//     console.log('checked', selected);
//   }
//   return (
//     <Stack>
//       <FormLabel id='demo-radio-buttons-group-label' className='text-black'>
//         {groupLabel}
//       </FormLabel>
//       <RadioGroup
//         row
//         aria-label={groupName}
//         name={groupName}
//         value={selectedValue}
//         onChange={onChange}
//       >
//         {options.map((option) => (
//           <FormControlLabel
//             key={option.value}
//             value={option.value}
//             control={<Radio />}
//             label={option.label}
//           />
//         ))}
//       </RadioGroup>
//     </Stack>
//   );
// };

export default RadioSelectStage;
