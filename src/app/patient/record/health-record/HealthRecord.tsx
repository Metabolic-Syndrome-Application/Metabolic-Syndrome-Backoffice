'use client';
import React from 'react';

import ActionButton from '@/components/buttons/ActionButton';
import ColorButton from '@/components/buttons/ColorButton';

function HealthRecord() {
  return (
    <div>
      HealthRecord
      <div>
        <ColorButton variant='blue'>blue</ColorButton>
        <ColorButton variant='yellow'>yellow</ColorButton>
        <ColorButton variant='green'>green</ColorButton>
        <ColorButton variant='red' isLoading={false}>
          red
        </ColorButton>
        <ColorButton variant='gray'>gray</ColorButton>
        <ActionButton>submit</ActionButton>
        <ActionButton variant='cancel'>cancel</ActionButton>
        <ActionButton variant='delete'>delete</ActionButton>
      </div>
    </div>
  );
}

export default HealthRecord;
