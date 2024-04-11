'use client';
import Image from 'next/image';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

import useModal from '@/hooks/useModal';

import HeaderArticle from '@/components/common/HeaderArticle';
import FormHeaderText from '@/components/form/components/FormHeaderText';

function InfoAccountPatient() {
  const { Modal, openModal } = useModal();

  return (
    <div className='w-full'>
      <HeaderArticle
        title='จัดการบัญชีคนไข้'
        variant='h1'
        className='flex justify-start gap-2'
      >
        <IoMdInformationCircle
          className='text-default-blue h-5 w-5 md:h-6 md:w-6'
          onClick={openModal}
        />
      </HeaderArticle>

      <Modal>
        <FormHeaderText
          icon={IoMdInformationCircle}
          title='คำแนะนำการใช้งาน'
          useBigestHeader
        />
        <div className='flex min-h-[350px] w-full flex-col items-center justify-center md:max-w-[530px]'>
          <div className='flex flex-col items-center justify-center pb-4'>
            <Image
              className='h-[250px] w-[250px] object-contain'
              src='/assets/images/warning.png'
              width={350}
              height={350}
              alt='warning'
              placeholder='blur'
              blurDataURL='/assets/images/warning.png'
            />
            <p className='text-center indent-4 leading-relaxed antialiased'>
              กรุณาตรวจสอบข้อมูลให้ถี่ถ้วนก่อนการดำเนินการ
              เมื่อกดปุ่มลบหรือไอคอน 🗑️
              ทางด้านขวามือของตารางจะถือว่าเป็นการลบบัญชีผู้ใช้ทันที
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InfoAccountPatient;
