'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineCreateNewFolder } from 'react-icons/md';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import UploadImageDisplay from '@/components/form/components/UploadImageDisplay';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputText } from '@/components/form/InputText';
import {
  createPlanSchema,
  FormCreatePlanProps,
} from '@/components/form/validation/PlanValidator';
import TiptapTextField from '@/components/text-editor/TipTapTextField';

import { API_PATH } from '@/config/api';
import { InputDropdown } from '@/components/form/InputDropdown';
import { typeplanDropdown } from '@/constant/plan';
import { enqueueSnackbar } from 'notistack';
import { fetchPlans } from '@/redux/slices/plansSlice';
import { useDispatch } from 'react-redux';

const CreatePlan = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { Modal, openModal, closeModal } = useModal();

  const dispatch = useDispatch<any>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormCreatePlanProps>({
    mode: 'onChange',
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      type: 'health',
    },
  });

  const onSubmit = async (data: FormCreatePlanProps) => {
    const { name, type, description } = data;

    try {
      const response = await axiosAuth.post(API_PATH.CREATE_PLAN, {
        name,
        type,
        description,
        // photo,
        // detail,
      });

      console.log('Create Plan:', response.data);

      enqueueSnackbar('Create Plan Success', { variant: 'success' });
      dispatch(fetchPlans());
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });

      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // response();
  }, []);

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>แผนสุขภาพ</h1>
        <IconFlatButton title='สร้างแผนสุขภาพ' onClick={openModal} />
      </article>

      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=''>
            <FormHeaderText
              icon={MdOutlineCreateNewFolder}
              title='สร้างแผนสุขภาพ'
              useBigestHeader
            />

            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-7'>
              {/* section1 */}
              <div className='col-span-1 space-y-4 rounded-lg border p-2 md:col-span-4'>
                <InputText
                  name='name'
                  label='ชื่อโปรแกรมสุขภาพ'
                  control={control}
                />
                <InputDropdown
                  name='type'
                  control={control}
                  label='ประเภท'
                  options={typeplanDropdown}
                />
                <TiptapTextField
                  name='description'
                  control={control}
                  label='รายละเอียด'
                />
              </div>

              {/* section2 : picture */}
              <div className='order-first col-span-1 space-y-4 rounded-lg md:order-none md:col-span-3'>
                <UploadImageDisplay displayType='large' />
              </div>

              {/* section3 : detail */}
              <div className='col-span-1 space-y-4 rounded-lg md:col-span-7'>
                <InputText name='name' label='รายละเอียด' control={control} />
              </div>
            </div>

            <div className='flex w-full justify-end space-x-3 p-4'>
              <button
                onClick={closeModal}
                className='rounded-xl bg-gray-50 px-4 py-4'
              >
                cancel
              </button>
              <button
                type='submit'
                className='flex items-center rounded-xl bg-blue-400 px-4 py-2'
              >
                submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePlan;
