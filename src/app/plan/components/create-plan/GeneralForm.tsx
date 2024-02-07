import FormCard from '@/app/plan/components/create-plan/Formcard';
import { InputText } from '@/components/form/InputText';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

const GeneralForm = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'description',
    control,
  });

  return (
    <FormCard heading='General'>
      <h4 className='mt-2'>Plan</h4>
      <InputText name='name' control={control} label='name' />
      <InputText name='type' control={control} label='type' />

      <h4 className='mt-2'>description</h4>
      <div className='flex flex-col gap-2'>
        {fields.map((field, index) => (
          <div key={field.id} className='flex gap-3'>
            {/* Render the value of the description object */}
            <InputText
              name={`description.${index}.value`}
              control={control}
              label='description'
            />

            {/* Render a button to remove the description field */}
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
        ))}
      </div>
      <div className='flex justify-end'>
        <button
          type='button'
          className='text-primary mt-1'
          onClick={() => {
            append({ label: 'description', value: '' });
          }}
        >
          + Add new description
        </button>
      </div>
    </FormCard>
  );
};

export default GeneralForm;
