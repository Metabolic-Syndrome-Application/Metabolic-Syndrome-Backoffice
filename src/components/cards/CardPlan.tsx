import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import UploadImageDisplay from '@/components/form/components/UploadImageDisplay';
import React from 'react';

export const CardPlan = () => {
  return (
    <div className='shadow-default-shadow flex h-fit w-[450px] flex-col gap-2 rounded-xl p-4'>
      <UploadImageDisplay displayType='large' />
      <h4 className='font-medium'>โปรเเกรมความเสี่ยงต่ำ</h4>
      <div className='w-fit rounded-2xl border border-blue-200 px-2 py-1'>
        หมวดอาหาร
      </div>
      <h5 className='font-medium'>รายละเอียด</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur. Pharetra neque dolor tincidunt
        purus. Sit ultrices vulputate sed in libero tellus lectus neque mauris.
        Amet neque cursus ut nulla. Nibh facilisi sodales tristique tincidunt.
      </p>
      <div className='flex w-full'>
        <IconFlatButton
          title='เพิ่มลงในแผนนี้'
          //onClick={openModal}
        />
      </div>
    </div>
  );
};
