//Form Input Text
export type FormInputProps = {
  name: string;
  control: any;
  label: string;
  type?: string;
  showPasswordToggle?: boolean;
  unit?: string;
  defaultValue?: any;
  disabled?: boolean;
};

//Form Options
export interface FormOptionProps extends FormInputProps {
  options: {
    label: string;
    value: string | number;
  }[];
}

//Use in AutocompleteDropdown & RadioGroup
export type FormDropdownProps = Omit<
  FormInputProps,
  'setValue' | 'type' | 'showPasswordToggle' | 'unit'
> & {
  options: FormOptionProps['options'];
};

export type FormRadioBtnPropsTest = {
  name: string;
  control: any;
  groupLabel: string;
  groupName: string;
  //options: { label: string; value: string }[];
  options: FormOptionProps['options'];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Use in Autocomplete Multiselect checkbox
export type FormMultiCheckboxProps = {
  name: string;
  control: any;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: any;
};

//Form Input Text
export type FormInputMultilineProps = {
  name: string;
  control: any;
  label: string;
  type?: string;
};
