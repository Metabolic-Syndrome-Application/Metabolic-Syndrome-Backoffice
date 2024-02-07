import FormCard from '@/app/plan/components/create-plan/Formcard';
import { InputText } from '@/components/form/InputText';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

const GeneralFormChallenge = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'description',
    control,
  });

  return (
    <FormCard heading='General'>
      <h4 className='mt-2'>Challenge</h4>
      {/* Input fields for name and type */}
      <InputText name='name' control={control} label='name' />
      <InputText name='allPoints' control={control} label='allPoints' />

      <h4 className='mt-2'>Description</h4>
      <div className='flex flex-col gap-2'>
        {/* Mapping over the description fields */}
        {fields.map((field, index) => (
          <div key={field.id} className='flex gap-3'>
            {/* Input field for title */}
            <InputText
              name={`description.${index}.title`}
              control={control}
              label='title'
            />
            {/* Input field for point */}
            <InputText
              name={`description.${index}.point`}
              control={control}
              label='point'
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
      {/* Button to add a new description */}
      <div className='flex justify-end'>
        <button
          type='button'
          className='text-primary mt-1'
          onClick={() => {
            // Append a new object with empty name and day values
            append({ title: '', point: '' });
          }}
        >
          + Add new description
        </button>
      </div>
    </FormCard>
  );
};

export default GeneralFormChallenge;
