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
import HeaderArticle from '@/components/common/HeaderArticle';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import ImageUpload from '@/components/form/components/UploadImageDisplay';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import {
  createPlanSchema,
  createPlanSchemaValues,
} from '@/components/form/validation/PlanValidator';
import TiptapTextField from '@/components/text-editor/TipTapTextField';

import DetailPlanFields from '@/app/plan/components/create-plan/DetailPlanFields';
import { API_PATH } from '@/config/api';
import { DaysOfWeekOptions, typePlanOptions } from '@/constant/plan';
import { fetchAllPlans, fetchAllPlansDefault } from '@/redux/slices/plansSlice';

const EditPlan = ({
  params,
  loadData,
}: {
  params: { id: string };
  loadData: () => void;
}) => {
  const id = params.id;

  const axiosAuth = useAxiosAuth();
  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string>('');
  //console.log('edit downloadURL', downloadURL);

  const methods = useForm<createPlanSchemaValues>({
    mode: 'onChange',
    resolver: zodResolver(createPlanSchema),
    defaultValues: async () => {
      //API_PATH.GET_PLAN
      const response = await axiosAuth.get(`/api/plan/${id}`);
      const data = await response.data.data.plan;
      //console.log('plan photo', data.photo);

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
        type: data.type,
        photo: data.photo,
        description: data?.description,
        detail: {
          name: data?.detail.name.map((nameItem: any) => ({ name: nameItem })), // Convert name array to array of objects
          day: thaiDays,
        },
        resetOptions: {
          keepDirtyValues: true,
        },
      };
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = async (data: z.infer<typeof createPlanSchema>) => {
    try {
      const selectedDays = data.detail.day.map(
        (day: { value: string }) => day.value
      );
      await axiosAuth.put(API_PATH.PUT_PLAN(id), {
        name: data.name,
        description: data.description,
        type: data.type,
        photo: downloadURL,
        detail: {
          name: data.detail.name.map((item: any) => item.name),
          day: selectedDays,
        },
      });

      // console.log('Edit Plan Succcess', data)
      enqueueSnackbar('Edit Plan Success', { variant: 'success' });
      loadData();

      closeModal();

      // Fetch all plans in parallel (optional, optimize based on usage)
      await Promise.all([fetchAllPlans(), fetchAllPlansDefault()]);
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <HeaderArticle
        title='รายละเอียดแผนสุขภาพ'
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
            <FormHeaderText
              icon={MdEdit}
              title='แก้ไขแผนสุขภาพ'
              useBigestHeader
            />
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-7'>
              {/* section1 : info */}
              <div className='col-span-1 space-y-4 rounded-lg md:col-span-4'>
                <InputText name='name' control={control} label='ชื่อโปรแกรม' />
                <InputDropdown
                  name='type'
                  control={control}
                  label='ประเภท'
                  options={typePlanOptions}
                />
                <TiptapTextField
                  name='description'
                  control={control}
                  label='รายละเอียด'
                />
              </div>

              {/* section2 : wait picture */}
              <div className='order-first col-span-1 space-y-4 rounded-lg md:order-none md:col-span-3'>
                <ImageUpload
                  image={image}
                  setImage={setImage}
                  imageError={imageError}
                  setDownloadURL={setDownloadURL}
                  currentPhoto={methods.watch('photo')} // Pass the current photo URL
                />
              </div>

              {/* section3 : detail */}
              <div className='col-span-1 space-y-4 rounded-lg md:col-span-7'>
                <DetailPlanFields />
              </div>
            </div>

            <div className='mb-20 flex w-full justify-end space-x-3 py-4 md:mb-4'>
              <ActionButton type='reset' variant='cancel' onClick={closeModal}>
                ยกเลิก
              </ActionButton>
              <ActionButton type='submit' variant='submit'>
                แก้ไข
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default EditPlan;
