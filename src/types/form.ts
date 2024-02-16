//Form Input Text
export type FormInputProps = {
  name: string;
  control: any;
  label: string;
  type?: string;
  showPasswordToggle?: boolean;
};

//Form Options
export interface FormOptionProps extends FormInputProps {
  options: {
    label: string;
    value: string;
  }[];
}

//Use in AutocompleteDropdown & RadioGroup
export type FormDropdownProps = Omit<
  FormInputProps,
  'setValue' | 'type' | 'showPasswordToggle'
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
};
