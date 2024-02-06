'use client';
import { FormHelperText, FormLabel } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

import Tiptap from '@/components/text-editor/Tiptap';

interface TiptapTextFieldProps {
  name: string;
  control: any;
  label: string;
}

const TiptapTextField: React.FC<TiptapTextFieldProps> = ({
  name,
  control,
  label,
}) => {
  // const {
  //   field: { onChange, value },
  //   fieldState: { error },
  // } = useController({
  //   name,
  //   control,
  //   defaultValue: '', // Set your initial value here
  // });

  // const handleTiptapChange = (richText: string) => {
  //   onChange(richText);
  // };

  return (
    <div>
      <FormLabel component='legend'>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Tiptap
              description={value}
              onChange={(richText) => onChange(richText)}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </div>
  );
};

export default TiptapTextField;
