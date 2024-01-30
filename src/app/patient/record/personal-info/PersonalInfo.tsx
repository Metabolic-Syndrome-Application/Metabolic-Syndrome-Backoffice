'use client';
import React from 'react';

import FormHeaderText from '@/components/form/FormHeaderText';

function PersonalInfo() {
  return (
    <div className=''>
      <FormHeaderText title='ข้อมูลส่วนตัว' useBigestHeader={false} />
      <FormHeaderText title='การเพิ่มสิทธิ์ให้แพทย์' useBigestHeader={false} />
      <FormHeaderText title='การปรับเปลี่ยนพฤติกรรม' useBigestHeader={false} />
    </div>
  );
}

export default PersonalInfo;
