import { useFieldArray, useFormContext } from 'react-hook-form';

import FormCard from '@/app/plan/components/create-plan/Formcard';
import NestedDiscription from '@/app/plan/components/create-plan/nested-form/NestDescription';
import { InputText } from '@/components/form/InputText';

type Props = {
  heading: string;
  name: string;
};

const NestedForm = ({ heading, name }: Props) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  return (
    <FormCard heading={heading}>
      <div className='mt-4'>
        {fields.map((item, index) => (
          <div key={item.id} className='mt-4'>
            <div className='flex justify-between'>
              <h4>Name</h4>
            </div>
            <InputText
              key={item.id}
              name={`${name}.${index}.name`}
              control={control}
              label=''
            />

            <h4 className='mt-2'>Description</h4>
            <NestedDiscription name={name} nestIndex={index} />
            {fields.length > 1 && (
              <button
                type='button'
                className='relative bottom-6 text-red-500'
                onClick={() => remove(index)}
              >
                Delete {heading.slice(0, -1)}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className='flex justify-end'>
        <button
          type='button'
          className='bg-primary active:bg-primary/60 mt-4 rounded-md px-4 py-2 text-sm text-white'
          onClick={() =>
            append({
              name,
              items: [{ item: 'item', value: '' }],
            })
          }
        >
          Add {heading.slice(0, -1)}
        </button>
      </div>
    </FormCard>
  );
};

export default NestedForm;
