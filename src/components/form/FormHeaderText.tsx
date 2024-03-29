import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

type FormHeaderTextProps = {
  icon?: IconType;
  title: string;
  useBigestHeader?: boolean;
};

const FormHeaderText = ({
  icon: Icon,
  title,
  useBigestHeader = false,
}: FormHeaderTextProps) => {
  const HeaderSize = useBigestHeader ? 'h3' : 'h4';

  return (
    <div className='flex w-full items-center justify-center p-2'>
      <div
        className={cn('flex w-full border-b', {
          'border-default-gray mb-2 p-2 ': useBigestHeader,
          'border-light-gray ': !useBigestHeader,
        })}
      >
        <div className='flex items-center'>
          {Icon && <Icon className='h-4 w-4 md:h-5 md:w-5' />}
          {title && (
            <HeaderSize className={`${Icon ? 'ml-3' : ''} text-center `}>
              {title}
            </HeaderSize>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormHeaderText;
