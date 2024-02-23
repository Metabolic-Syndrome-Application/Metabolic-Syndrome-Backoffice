import { IoMdCloudUpload } from 'react-icons/io';

import { cn } from '@/lib/utils';

type UploadImageDisplayProps = {
  displayType?: string;
};

export default function UploadImageDisplay({
  displayType,
}: UploadImageDisplayProps) {
  return (
    <div
      className={cn(
        'border-main-gray focus:outline-main-form-placeholder flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-transparent px-14'
      )}
    >
      <div
        className={cn(
          'flex h-fit w-full flex-wrap items-center justify-around space-y-2 px-2 py-4',
          displayType === 'large' &&
          'flex w-full flex-col items-center justify-center space-y-3'
        )}
      >
        <IoMdCloudUpload className='h-16 w-16' />
        <div className='space-y-1 text-center'>
          <p className='text-[13px]'>Select a file or drag and drop here</p>
          <p className='text-[12px] opacity-40'>
            JPG, PNG or PDF, file size no more than 10MB
          </p>
        </div>
        <div className='text-default-blue border-light-blue rounded-lg border-2 bg-transparent px-3 py-1.5 text-center text-sm md:text-base'>
          SELECT FILE
        </div>
      </div>
    </div>
  );
}
