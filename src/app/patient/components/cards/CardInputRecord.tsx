import React from 'react';

interface CardInputProps {
  name: string
  children: React.ReactNode;
}

export const CardInputRecord: React.FC<CardInputProps> = ({ name, children }) => {
  return (
    <div key='id' className='flex flex-col p-4 border border-light-gray gap-4 rounded-lg'>
      <h5 className='font-medium'>{name}</h5>
      {children}
    </div>
  );
};


