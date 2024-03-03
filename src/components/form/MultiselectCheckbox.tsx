"use client"
import { FormHelperText } from '@mui/material';
import { LucideIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

type ToggleSelectedType = (type: string) => void;

//Form Multiselect CheckboxProps
export type FormMultiselectCheckboxProps = {
  className?: string;
  name: string;
  control: any;
  label: string;
  type?: string;
  isSelected?: boolean;
  setSelectedType: ToggleSelectedType;
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
}

export const MultiselectCheckbox = ({
  className,
  name,
  control,
  label,
  isSelected,
  setSelectedType, // Add setSelectedType prop
  classNames,
  icon: Icon,
}: FormMultiselectCheckboxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div>
            <label
              htmlFor={name}
              className={cn(
                'inline-flex items-center justify-between text-center',
                'px-1.5 md:px-3 py-2',
                'text-sm md:text-base  md:min-w-[150px] w-full',
                'shadow-light-shadow rounded-lg border border-light-gray',
                'peer has-[:checked]:bg-light-blue has-[:checked]:text-dark-blue',
                'has-[:checked]:ring has-[:checked]:ring-offset-0',
                className
              )}
            >
              <div className="flex group items-center justify-center text-center gap-1">
                {Icon && <Icon size="1em" className={cn('text-center', classNames?.icon)} />}
                <span className="text-base cursor-pointer">{label}</span>
                <input
                  id={name}
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    onChange(e.target.checked);
                    setSelectedType(name); // Set selected type when checkbox is checked
                    //console.log("setSelectedType", name)
                  }}
                  value={value || ''}
                  className="ml-2 appearance-none rounded-full border border-gray-400 outline-none peer-has-[:checked]:border-default-blue"
                />
              </div>
            </label>
            {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error.message}</FormHelperText>}
          </div>
        );
      }}
    />
  );
};

