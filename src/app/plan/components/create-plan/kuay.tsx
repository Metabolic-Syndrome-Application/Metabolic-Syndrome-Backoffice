import FormCard from '@/app/plan/components/create-plan/Formcard';
import { InputText } from '@/components/form/InputText';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

const kuay = () => {
  const { control } = useFormContext();

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
        {detailFields.map((field, index) => (
          <div key={field.id} className='flex gap-3'>
            {/* Input field for detail name */}
            <InputText
              name={`detail[${index}].name`}
              control={control}
              label={`Detail ${index + 1}`}
            />
            {/* Select input for repeat day */}
            <select
              name={`detail[${index}].day`}
              // ref={control}
              className='input-field'
            >
              <option value='monday'>Monday</option>
              <option value='tuesday'>Tuesday</option>
              <option value='wednesday'>Wednesday</option>
              <option value='thursday'>Thursday</option>
              <option value='friday'>Friday</option>
              <option value='saturday'>Saturday</option>
              <option value='sunday'>Sunday</option>
            </select>
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
              appendDetail({ name: '', day: '' });
            }}
          >
            + Add new detail
          </button>
        </div>
      </div>
    </FormCard>
  );
};

export default kuay;
