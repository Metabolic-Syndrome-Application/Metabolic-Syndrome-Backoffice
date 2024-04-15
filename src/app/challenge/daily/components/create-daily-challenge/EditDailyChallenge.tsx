/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { z } from 'zod';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import { SwitchToggle } from '@/components/buttons/SwitchToggle';
import HeaderArticle from '@/components/common/HeaderArticle';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import ImageUpload from '@/components/form/components/UploadImageDisplay';
import { InputText } from '@/components/form/InputText';
import {
  editDailyChallengeSchema,
  editDailyChallengeValues,
} from '@/components/form/validation/ChallengeValidator';
import TiptapTextField from '@/components/text-editor/TipTapTextField';

import DetailDailyFields from '@/app/challenge/daily/components/create-daily-challenge/DetailDailyFields';
import { API_PATH } from '@/config/api';
import { dataOptions } from '@/constant/challenge';
import { DaysOfWeekOptions } from '@/constant/plan';

const EditDailyChallenge = ({
  params,
  loadData,
}: {
  params: { id: string };
  loadData: () => void;
}) => {
  //params id
  const id = params.id;

  const axiosAuth = useAxiosAuth();
  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string>('');

  const methods = useForm<editDailyChallengeValues>({
    mode: 'onChange',
    resolver: zodResolver(editDailyChallengeSchema),
    defaultValues: async () => {
      //API_PATH.GET_DAILY_CHALLENGE
      const response = await axiosAuth.get(`/api/challenge/daily/${id}`);
      const data = await response.data.data.daily;

      // Convert English day name to Thai label
      const thaiDays = data?.detail.day.map((dayItem: string) => {
        const foundDay = DaysOfWeekOptions.find(
          (option) => option.value === dayItem
        );
        return {
          label: foundDay?.label || dayItem,
          value: dayItem,
        };
      });

      return {
        name: data.name,
        points: data.points,
        numDays: data.numDays,
        description: data.description,
        photo: data.photo,
        detail: {
          name: data?.detail.name.map((nameItem: string) => ({
            name: nameItem,
          })), // Convert name array to array of objects
          day: thaiDays,
        },
        status: data?.status,
        resetOptions: {
          keepDirtyValues: true,
        },
      };
    },
  });

  const { control, handleSubmit, getValues } = methods;

  const onSubmit = async (data: z.infer<typeof editDailyChallengeSchema>) => {
    try {
      const selectedDays = data.detail.day.map(
        (day: { value: string }) => day.value
      );
      // Make the API call and handle success
      await axiosAuth.put(API_PATH.PUT_DAILY_CHALLENGE(id), {
        name: data.name,
        points: data.points,
        numDays: data.numDays,
        description: data.description,
        photo: downloadURL,
        detail: {
          name: data.detail.name.map((item: any) => item.name),
          day: selectedDays,
        },
        status: data.status,
      });
      //console.log('Edit Daily Succcess', data)

      enqueueSnackbar('Edit Daily Success', { variant: 'success' });
      loadData();

      closeModal();
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <HeaderArticle
        title='รายละเอียดภารกิจ'
        variant='h4'
        className='mb-3 rounded-b-none rounded-t-lg bg-gray-50 px-6 py-4'
      >
        <div className='flex items-center gap-1' onClick={openModal}>
          <FiEdit className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out' />
          <p className='text-default-blue'>แก้ไข</p>
        </div>
      </HeaderArticle>

      <Modal>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeaderText icon={MdEdit} title='แก้ไขภารกิจ' useBigestHeader />
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-7'>
              {/* section1 */}
              <div className='col-span-1 flex flex-col space-y-4 rounded-lg md:col-span-4 md:space-y-8'>
                <InputText name='name' control={control} label='ชื่อโปรแกรม' />
                <InputText
                  name='points'
                  control={control}
                  label='คะแนนรวมสะสม'
                  type='number'
                  unit='คะแนน'
                />
                <InputText
                  name='numDays'
                  control={control}
                  label='ระยะเวลาการทำภารกิจ'
                  type='number'
                  unit='วัน'
                />

                <SwitchToggle
                  name='status'
                  control={control}
                  label='สถานะการเปิดใช้งาน'
                  options={dataOptions.dailyChallengeStatus}
                  status={getValues().status}
                />
              </div>

              {/* section2 : wait picture */}
              <div className='order-first col-span-1 w-full space-y-4 rounded-lg md:order-none md:col-span-3 md:min-w-[350px]'>
                <ImageUpload
                  image={image}
                  setImage={setImage}
                  imageError={imageError}
                  setDownloadURL={setDownloadURL}
                  currentPhoto={methods.watch('photo')} // Pass the current photo URL
                />
              </div>

              {/* section3 : detail */}
              <div className='col-span-1 space-y-4 rounded-lg pt-2 md:col-span-7'>
                <TiptapTextField
                  name='description'
                  control={control}
                  label='รายละเอียด'
                />
                <DetailDailyFields />
              </div>
            </div>

            <div className='flex w-full justify-end space-x-3 py-4'>
              <ActionButton type='reset' variant='cancel' onClick={closeModal}>
                ยกเลิก
              </ActionButton>
              <ActionButton type='submit' variant='submit'>
                แก้ไขภารกิจ
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default EditDailyChallenge;
