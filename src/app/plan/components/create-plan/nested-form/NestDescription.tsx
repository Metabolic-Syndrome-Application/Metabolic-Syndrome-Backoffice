import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InputText } from '@/components/form/InputText';

type NestedDiscriptionProps = {
  name: string;
  nestIndex: number;
};

const NestedDiscription = ({ name, nestIndex }: NestedDiscriptionProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}[${nestIndex}].items`,
  });

  return (
    <div className='flex flex-col gap-2'>
      {fields.map((item, k) => {
        return (
          <div key={item.id} className='flex gap-3'>
            <InputText
              key={item.id}
              name={`${name}[${nestIndex}].items[${k}].value`}
              control={control}
              label=''
            />

            {fields.length > 1 && (
              <button
                type='button'
                className='btn-remove'
                onClick={() => remove(k)}
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
        );
      })}

      <div className='flex justify-end'>
        <button
          type='button'
          className='text-primary'
          onClick={() => append({ item: 'item', value: '' })}
        >
          + Add Description
        </button>
      </div>
    </div>
  );
};

export default NestedDiscription;
