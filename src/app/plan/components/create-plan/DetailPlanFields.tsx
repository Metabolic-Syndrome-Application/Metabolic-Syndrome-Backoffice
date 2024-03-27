//nestedform : Add detail Plan -> name , days
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

import { InputText } from '@/components/form/InputText';
import { MultiselectCheckboxTags } from '@/components/form/MultiselectCheckboxTags';

import { DaysOfWeekOptions } from '@/constant/plan';

const DetailPlanFields = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'detail.name',
    control,
  });

  return (
    <div className='flex w-full flex-col gap-4 '>
      <MultiselectCheckboxTags
        name='detail.day'
        control={control}
        label='เลือกวันที่ต้องการ'
        options={DaysOfWeekOptions}
      />

      {/* Mapping detail fields */}
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className='flex gap-3'>
            {/* Input field for name */}
            <InputText
              name={`detail.name[${index}].name`}
              control={control}
              label={`รายการที่ ${index + 1}`}
            />
            {/* button to remove */}
            {fields.length > 1 && (
              <button
                type='button'
                className='btn-remove border-form-gray rounded-[0.575rem] border px-4 text-center'
                onClick={() => remove(index)}
              >
                <AiOutlineClose className='text-default-gray' />
              </button>
            )}
          </div>
        </div>
      ))}
      <div className='flex items-center justify-center'>
        <button
          type='button'
          className='cursor-ponter text-default-blue border-form-gray hover:bg-light-blue  mt-1  w-full rounded-[0.575rem] border p-[3.5px]'
          onClick={() => {
            // Append a new object with empty name
            append({ name: [''] });
          }}
        >
          + เพิ่มรายการ
        </button>
      </div>
    </div>
  );
};

export default DetailPlanFields;
