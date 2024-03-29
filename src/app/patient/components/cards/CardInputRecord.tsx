import React from 'react';

interface CardInputProps {
  name: string;
  children: React.ReactNode;
}

//Create Record Health จดบันทึกค่าสุขภาพ
export const CardInputRecord: React.FC<CardInputProps> = ({
  name,
  children,
}) => {
  return (
    <div
      key='id'
      className='border-light-gray flex flex-col gap-4 rounded-lg border p-4'
    >
      <h5 className='font-medium'>{name}</h5>
      {children}
    </div>
  );
};
