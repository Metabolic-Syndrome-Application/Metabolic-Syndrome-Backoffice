export type FormInputProps = {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  type?: string;
};

export interface FormOptionProps extends FormInputProps {
  options: {
    label: string;
    value: string;
  }[];
}

//Use in AutocompleteDropdown & RadioGroup
export type FormDropdownProps = Omit<FormInputProps, 'setValue' | 'type'> & {
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
