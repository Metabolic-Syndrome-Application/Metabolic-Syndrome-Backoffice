"use client"
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
import ImageUpload from '@/components/form/components/UploadImageDisplay';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { createPlanSchema, createPlanSchemaValues } from '@/components/form/validation/PlanValidator';
import TiptapTextField from '@/components/text-editor/TipTapTextField';

import DetailPlanFields from '@/app/plan/components/create-plan/nested-form/DetailPlanFields';
import { API_PATH } from '@/config/api';
import { typePlanOptions } from '@/constant/plan';
import { dayOfWeekThaiLabel } from '@/helpers/date';



const EditPlan = ({ params, loadData }: { params: { id: string }, loadData: () => void }) => {
  const id = params.id;

  const axiosAuth = useAxiosAuth();
  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar()
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string>('');
  //console.log('edit downloadURL', downloadURL)

  const methods = useForm<createPlanSchemaValues>({
    mode: 'onChange',
    resolver: zodResolver(createPlanSchema),
    defaultValues: async () => {

      const response = await axiosAuth.get(`/api/plan/${id}`);
      const data = await response.data.data.plan


      const thaiDays = data?.detail.day.map((dayItem: string) => ({
        label: dayOfWeekThaiLabel(dayItem), // Convert English day name to Thai label
        value: dayItem
      }));
      return {
        name: data.name,
        type: data.type,
        photo: data.photo,
        description: data?.description,
        detail: {
          name: data?.detail.name.map((nameItem: any) => ({ name: nameItem })), // Convert name array to array of objects
          //day: data?.detail.day.map((dayItem: string) => ({ label: dayItem, value: dayItem })) // Map each day string to an object with label and value
          day: thaiDays
        },
        resetOptions: {
          keepDirtyValues: true,
        }
      }
    }



  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit = async (data: z.infer<typeof createPlanSchema>) => {
    try {
      const selectedDays = data.detail.day.map(
        (day: { value: string }) => day.value
      );
      // Make the API call and handle success
      await axiosAuth.put(API_PATH.PUT_PLAN(id), {
        name: data.name,
        description: data.description,
        type: data.type,
        //photo: data.photo,
        photo: downloadURL,
        detail: {
          name: data.detail.name.map((item: any) => item.name),
          day: selectedDays,
        },
      });
      // console.log('Edit Plan Succcess', data)

      enqueueSnackbar('Edit Plan Success', { variant: 'success' });;
      loadData();

      closeModal()
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      // console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-end p-4'>
        <FiEdit
          className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out'
          onClick={openModal}
        />
      </article>

      <Modal>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeaderText
              icon={MdEdit}
              title='แก้ไขแผนสุขภาพ'
              useBigestHeader
            />
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-7'>
              {/* section1 */}
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
                {/* <UploadImageDisplay setDownloadURL={setDownloadURL} /> */}
                <ImageUpload
                  image={image}
                  setImage={setImage}
                  imageError={imageError}
                  setDownloadURL={setDownloadURL}
                />
              </div>

              {/* section3 : detail */}
              <div className='col-span-1 space-y-4 rounded-lg md:col-span-7'>
                <DetailPlanFields />
              </div>
            </div>

            <div className='flex h-full justify-end space-x-3 p-4'>
              <ActionButton
                type='reset'
                variant='cancel'
                onClick={closeModal}
              >
                ยกเลิก
              </ActionButton>
              <ActionButton type='submit' variant='submit' disabled={!isDirty || Object.keys(errors).length > 0}>
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
