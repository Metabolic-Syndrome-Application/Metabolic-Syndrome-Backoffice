'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import { IconFlatButton } from '@/components/buttons/IconFlatButton';
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
import { typePlanOptions } from '@/constant/plan';
import { fetchAllPlans, fetchAllPlansDefault } from '@/redux/slices/plansSlice';

const CreatePlan = () => {
  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<any>();

  const [image, setImage] = useState<File | null>(null);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [imageError, setImageError] = useState(false);

  const [downloadURL, setDownloadURL] = useState<string>('');
  //console.log('downloadURL', downloadURL)

  const methods = useForm<createPlanSchemaValues>({
    mode: 'onChange',
    resolver: zodResolver(createPlanSchema),

    defaultValues: {
      type: 'health',
      photo: '',
      detail: {
        name: [{ name: '' }],
        day: [],
      },
    },
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
      // eslint-disable-next-line unused-imports/no-unused-vars
      const response = await axiosAuth.post(API_PATH.CREATE_PLAN, {
        name: data.name,
        description: data.description,
        type: data.type,
        photo: downloadURL,
        detail: {
          name: data.detail.name.map((item: any) => item.name),
          day: selectedDays,
        },
      });

      enqueueSnackbar('Create Plan Success', { variant: 'success' });
      //console.log('Create Plan', response);

      //Update plan after create plan success
      await dispatch(fetchAllPlans());
      await dispatch(fetchAllPlansDefault());
      closeModal();
      reset();
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      // console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>แผนสุขภาพ</h1>
        <IconFlatButton title='สร้างแผนสุขภาพ' onClick={openModal} />
      </article>

      <Modal>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeaderText
              icon={MdOutlineCreateNewFolder}
              title='สร้างแผนสุขภาพ'
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
              <div className='order-first col-span-1 w-full space-y-4 md:order-none md:col-span-3 '>
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

            <div className='flex w-full justify-end space-x-3 py-4'>
              <ActionButton type='reset' variant='cancel' onClick={closeModal}>
                ยกเลิก
              </ActionButton>
              <ActionButton
                type='submit'
                variant='submit'
                disabled={!isDirty || Object.keys(errors).length > 0}
              >
                ยืนยันการสร้างแผนสุขภาพ
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default CreatePlan;
