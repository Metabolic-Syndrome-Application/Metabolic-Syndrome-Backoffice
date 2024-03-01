import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

import { InputText } from '@/components/form/InputText';
import { MultiselectCheckboxTags } from '@/components/form/MultiselectCheckboxTags';

import FormCard from '@/app/plan/components/create-plan/Formcard';
import { DaysOfWeekOptions } from '@/constant/plan';

const Kuay = () => {
  const { control, handleSubmit, watch } = useFormContext();

  const {
    fields: detailFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    name: 'detail',
    control,
  });

  const {
    fields: descriptionFields,
    append: appendDescription,
    remove: removeDescription,
  } = useFieldArray({
    name: 'description',
    control,
  });

  const selectedDays = watch('day'); // Get selected days from CheckboxesTags

  return (
    <FormCard heading='General'>
      <h4 className='mt-2'>Plan</h4>
      {/* Input fields for name and type */}
      <InputText name='name' control={control} label='name' />
      <InputText name='type' control={control} label='type' />

      <h4 className='mt-2'>Description</h4>
      <div className='flex flex-col gap-2'>
        {/* Mapping over the description fields */}
        {descriptionFields.map((field, index) => (
          <div key={field.id} className='flex gap-3'>
            {/* Input field for description */}
            <InputText
              name={`description[${index}].value`}
              control={control}
              label={`Description ${index + 1}`}
            />
            {/* Render a button to remove the description field */}
            {descriptionFields.length > 1 && (
              <button
                type='button'
                className='btn-remove'
                onClick={() => removeDescription(index)}
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
        ))}
        {/* Button to add a new description */}
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-primary mt-1'
            onClick={() => {
              // Append a new object with empty value
              appendDescription({ value: '' });
            }}
          >
            + Add new description
          </button>
        </div>
      </div>
      <h4 className='mt-4'>Detail</h4>
      <div className='flex flex-col gap-2'>
        {/* Mapping over the detail fields */}
        <MultiselectCheckboxTags
          name='day'
          control={control}
          label='เลือกวันที่ต้องการ'
          options={DaysOfWeekOptions}
        />
        {detailFields.map((field, index) => (
          <div key={field.id} className='flex gap-3'>
            {/* Input field for detail name */}
            <InputText
              name={`detail[${index}].name`}
              control={control}
              label={`name ${index + 1}`}
            />

            {/* Render a button to remove the detail field */}
            {detailFields.length > 1 && (
              <button
                type='button'
                className='btn-remove'
                onClick={() => removeDetail(index)}
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
        ))}
        {/* Button to add a new detail */}
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-primary mt-1'
            onClick={() => {
              // Append a new object with empty name and day values
              appendDetail({ name: '', day: selectedDays });
            }}
          >
            + Add new detail
          </button>
        </div>
      </div>
    </FormCard>
  );
};

export default Kuay;