import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import UploadImageDisplay from '@/components/form/components/UploadImageDisplay';
import { IPlanData } from '@/types/plan';
import React from 'react';
import parse from 'html-react-parser'; // Import the parse function
import OutlineButton from '@/components/buttons/OutlineButton';
import { PiBowlFood } from 'react-icons/pi';
import { TypePlan, iconTypeMapping } from '@/helpers/typeIcon';

export const CardPlan = ({ name, type, description, photo }: IPlanData) => {
  const {
    icon: Icon,
    variant,
    label: thaiLabel,
  } = iconTypeMapping[type as TypePlan] || iconTypeMapping.default;
  const displayValueType = thaiLabel || type; //if label is not available

  return (
    <div className='shadow-default-shadow flex h-fit w-full flex-col gap-4 rounded-xl p-4 md:w-[450px]'>
      <UploadImageDisplay></UploadImageDisplay>
      <div>{photo}</div>

      <div className='flex w-full flex-wrap items-center justify-between gap-2'>
        <h4 className='text-wrap text-balance max-w-[280px] whitespace-pre-line font-semibold leading-normal tracking-wide'>
          {name}
        </h4>
        <OutlineButton variant={variant} icon={Icon}>
          {displayValueType}
        </OutlineButton>
      </div>

      <h5 className='font-normal'>รายละเอียด</h5>
      <div className='ProseMirror ProseMirror hr  textEditor border-none'>
        {description ? (
          parse(description)
        ) : (
          <p className='text-default-gray text-center'>ไม่มีรายละเอียด</p>
        )}
      </div>

      <div className='flex w-full'>
        <IconFlatButton
          title='เพิ่มลงในแผนนี้'
          //onClick={openModal}
        />
      </div>
    </div>
  );
};
