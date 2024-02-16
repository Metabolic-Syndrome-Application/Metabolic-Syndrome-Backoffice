import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

import { axiosAuth } from '@/lib/axios';

import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { MultiselectCheckboxTags } from '@/components/form/MultiselectCheckboxTags';
import TiptapTextField from '@/components/text-editor/TipTapTextField';

import { DaysOfWeekOptions, typePlanOptions } from '@/constant/plan';

const Kuay3 = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const selectedDays = data.detail.day.map(
        (day: { value: string }) => day.value
      );

      const response = await axiosAuth.post(
        'http://localhost:8000/api/plan/create',
        {
          name: data.name,
          description: data.description,
          type: data.type,
          photo: data.photo,
          detail: {
            name: [data.name],
            day: selectedDays,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error); // from creation or business logic
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: 'detail.name',
    control,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText name='name' control={control} label='Name' />
      <InputDropdown
        name='type'
        control={control}
        label='ประเภท'
        options={typePlanOptions}
      />
      <TiptapTextField
        name='description'
        control={control}
        label='รายละเอียด'
      />
      <InputText name='photo' control={control} label='photo' />

      {/* Detail fields */}
      <h4>Detail</h4>
      <div className='flex flex-col gap-2'>
        {/* Checkboxes for day */}
        <MultiselectCheckboxTags
          name='detail.day'
          control={control}
          label='เลือกวันที่ต้องการให้มีโปรแกรมสุขภาพ'
          options={DaysOfWeekOptions}
        />
        {/* Mapping over the detail fields */}
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className='flex gap-3'>
              {/* Input field for name */}
              <InputText
                name={`detail.name[${index}].name`}
                control={control}
                label={`name${index + 1}`}
              />
              {/* Render a button to remove the detail field */}
              {fields.length > 1 && (
                <button
                  type='button'
                  className='btn-remove'
                  onClick={() => remove(index)}
                >
                  <AiOutlineClose />
                </button>
              )}
            </div>
          </div>
        ))}
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-primary mt-1'
            onClick={() => {
              // Append a new object with empty name and day values
              append({ name: [''] });
            }}
          >
            + Add new detail
          </button>
        </div>
      </div>

      <input type='submit' value='Submit' />
    </form>
  );
};

export default Kuay3;
