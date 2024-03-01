'use client';
import React from 'react';

import ColorButton from '@/components/buttons/ColorButton';
import FormHeaderText from '@/components/form/FormHeaderText';
import { TextFieldInfo } from '@/components/form/TextFieldInfo';

import { getStatusPatientColor } from '@/helpers/status';

import { IPatientData } from '@/types/patient';


export const CardInfo = ({
  hn,
  firstName,
  lastName,
  yearOfBirth,
  gender,
  status,
  mainDoctorID,
  mainDoctor
}: IPatientData) => {

  return (
    <div className=''>
      <div className='flex w-full flex-col '>
        <div className='flex flex-col'>
          <FormHeaderText title='ข้อมูลส่วนตัว' useBigestHeader={false} />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-[800px]'>
            <TextFieldInfo label='รหัสคนไข้' value={hn} />



            <TextFieldInfo label='ชื่อ-นามสกุล' value={`${firstName} ${lastName}`} />

            <TextFieldInfo label='ปีเกิด' value={yearOfBirth} />
            <TextFieldInfo label='เพศ' value={gender} />

            <div className='สถานะ'>
              <ColorButton variant={getStatusPatientColor(status)?.color} size='sm'>
                {getStatusPatientColor(status)?.text}
              </ColorButton>
            </div>

            <TextFieldInfo label='เเพทย์ผู้รับผิดชอบ' value={mainDoctorID} />

            {mainDoctor && (
              <TextFieldInfo label='เเพทย์ผู้รับผิดชอบ' value={`${mainDoctor.prefix}${mainDoctor.firstName} ${mainDoctor.lastName}`} />
            )}

          </div>
        </div>
      </div>
    </div>


  );
};
