import { Radio } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

import { InputText } from '@/components/form/InputText';
import { IChoicesQuiz } from '@/types/challenge';

const OptionQuizFields = () => {
  const { control, setValue, watch, formState: { errors } } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'choices',
    control,
  });


  const watchChoices = watch('choices');

  const handleOptionChange = (index: number) => {
    const newChoices = [...watchChoices];
    newChoices.forEach((choice, i) => {
      choice.isCorrect = i === index; // Set isCorrect to true only for the selected choice
    });
    setValue('choices', newChoices);
  };


  return (
    <div className='flex w-full flex-col gap-4 '>
      <h4 className='font-medium text-base'>คำตอบ</h4>
      {fields.map((choice, index) => (
        <div key={choice.id} className='flex gap-3'>
          <Radio
            name={`choices.${index}.isCorrect`}
            checked={watchChoices[index]?.isCorrect}
            onChange={() => handleOptionChange(index)}
            defaultValue={`choices.${index}.isCorrect`}
          />
          <InputText
            name={`choices.${index}.option`}
            control={control}
            label={`ตัวเลือกที่ ${index + 1}`}
            defaultValue={`choices.${index}.option`} // Set default value for option

          />

          {fields.length > 1 && (
            <button
              type='button'
              className='btn-remove border-form-gray rounded-[0.575rem] border px-3 text-center'
              onClick={() => remove(index)}
            >
              <AiOutlineClose className='text-default-gray' />
            </button>
          )}
        </div>
      ))}

      <div className='flex items-center justify-center'>
        <button
          type='button'
          className='text-sm lgr:text-base cursor-ponter text-default-blue border-form-gray hover:bg-light-blue w-full rounded-[0.575rem] border p-[3.5px]'
          onClick={() => {
            append({ option: '', isCorrect: false });
          }}
        >
          + เพิ่มตัวเลือก
        </button>
      </div>
      {errors.choices && typeof errors.choices.message === 'string' && (
        <span className='text-center py-4 text-xs text-[#d32f2f]'>{errors.choices.message}</span>
      )}
    </div>
  );
};

export default OptionQuizFields;