import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

interface SwitchToggleProps {
  name: string;
  control?: any;
  label: string;
  options: { value: string }[];
  status: string;
}

export const SwitchToggle: React.FC<SwitchToggleProps> = ({
  name,
  control,
  label,
  options,
  status,
}) => {
  const [enabled, setEnabled] = useState<boolean>(status === 'active' || false); // Set initial state based on status
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className=''>
          <Switch.Group>
            <Switch.Label className='mr-4'>{label}</Switch.Label>
            <Switch
              checked={enabled}
              value={value}
              onChange={(isChecked) => {
                setEnabled(isChecked);
                const selectedOption = isChecked
                  ? options[0].value
                  : options[1].value;
                onChange(selectedOption); // Update value based on isChecked
                console.log('selectedOption', selectedOption);
              }}
              className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className='sr-only'>Enable notifications</span>
              <span
                className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Switch.Group>
        </div>
      )}
    />
  );
};

// SwitchToggle component

// import { Switch } from '@headlessui/react';
// import { useState } from 'react';
// import { Controller } from 'react-hook-form';

// interface SwitchToggleProps {
//   name: string;
//   control?: any;
//   label: string;
//   status?: string; // Add status prop
// }

// export const SwitchToggle: React.FC<SwitchToggleProps> = ({
//   name,
//   control,
//   label,
//   status,
// }) => {
//   const [enabled, setEnabled] = useState<boolean>(status === "active" || false); // Set initial state based on status

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value }, fieldState: { error } }) => (
//         <div className=''>
//           <Switch.Group>
//             <Switch.Label className="mr-4">{label}</Switch.Label>
//             <Switch
//               checked={enabled}
//               onChange={(isChecked) => {
//                 setEnabled(isChecked);
//                 onChange(isChecked ? 'active' : 'inactive');
//               }}
//               className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
//                 } relative inline-flex h-6 w-11 items-center rounded-full`}
//             >
//               <span className="sr-only">Enable notifications</span>
//               <span
//                 className={`${enabled ? 'translate-x-6' : 'translate-x-1'
//                   } inline-block h-4 w-4 transform rounded-full bg-white transition`}
//               />
//             </Switch>
//           </Switch.Group>
//         </div>
//       )}
//     />
//   );
// };
