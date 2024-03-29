import { Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri';

import { CustomPaperComponent } from '@/components/form/InputDropdown';

import { FormMultiCheckboxProps } from '@/types/form';

//change color chekbox -> wait add styled more
// const BlueCheckbox = styled(Checkbox)(() => ({
//   '&.Mui-checked': {
//     color: 'blue',
//   },

// }));

//Icon Checkbox
const icon = <RiCheckboxBlankCircleLine fontSize='large' />;
const checkedIcon = (
  <RiCheckboxCircleFill fontSize='large' style={{ color: 'blue' }} />
);

//MultiSelect Form Checkbox Dropdown
export const MultiselectCheckboxTags: React.FC<FormMultiCheckboxProps> = ({
  name,
  control,
  label,
  options = [],
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={(
        { field: { onChange, value = [] }, fieldState: { error } } // Ensure value is always an array
      ) => (
        <Autocomplete
          multiple
          id='checkboxes-tags-demo'
          value={value}
          onChange={(event: any, newValue: string[]) => {
            onChange(newValue);
            //console.log(newValue);
          }}
          options={options}
          disableCloseOnSelect
          // getOptionLabel={(option) => option.label}
          getOptionLabel={(option) => `${option.label}`}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props} key={option.value}>
                <Checkbox
                  key={option.value}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            );
          }}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.value}
                label={option.label}
                sx={{
                  fontSize: '16px',
                  //backgroundColor: '#C9E1FD',
                }}
              />
            ));
          }}
          fullWidth
          disablePortal={true}
          PaperComponent={(props) => (
            <CustomPaperComponent {...props} maxHeight={280} />
          )}
          componentsProps={{
            popper: {
              modifiers: [
                {
                  name: 'flip',
                  enabled: false,
                },
              ],
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder='วัน...'
              error={!!error}
              helperText={error ? error?.message : null}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '0.575rem',
                },
              }}
            />
          )}
        />
      )}
    />
  );
};
