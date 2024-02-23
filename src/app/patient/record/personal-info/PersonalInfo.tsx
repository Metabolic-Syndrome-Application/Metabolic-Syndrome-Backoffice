'use client';
import React from 'react';

import FormHeaderText from '@/components/form/FormHeaderText';
import CardInfo from '@/app/patient/components/cards/CardInfo';

function PersonalInfo() {
  return (
    <div className=''>
      <CardInfo></CardInfo>
      <FormHeaderText title='การเพิ่มสิทธิ์ให้แพทย์' useBigestHeader={false} />
      <FormHeaderText title='การปรับเปลี่ยนพฤติกรรม' useBigestHeader={false} />
    </div>
  );
}

export default PersonalInfo;
