'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { GoGoal } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputText } from '@/components/form/InputText';
import { createDailyChallengeSchema, createDailyChallengeValues } from '@/components/form/validation/ChallengeValidator';

import { API_PATH } from '@/config/api';
import { fetchAllDailyChallenge } from '@/redux/slices/dailyChallengesSlice';
import TiptapTextField from '@/components/text-editor/TipTapTextField';
import UploadImageDisplay from '@/components/form/components/UploadImageDisplay';
import DetailDailyFields from '@/app/challenge/daily/components/create-daily-challenge/DetailDailyFields';


const CreateDailyChallenge = () => {
  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<any>();

  const methods = useForm<createDailyChallengeValues>({
    mode: 'onChange',
    resolver: zodResolver(createDailyChallengeSchema),
    defaultValues: {
      photo: '',
      detail: {
        name: [{ name: '' }],
        day: [],
      },
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = methods;


  const onSubmit = async (data: z.infer<typeof createDailyChallengeSchema>) => {
    try {
      const selectedDays = data.detail.day.map(
        (day: { value: string }) => day.value
      );
      const response = await axiosAuth.post(API_PATH.CREATE_DAILY_CHALLENGE, {
        name: data.name,
        points: data.points,
        numDays: data.numDays,
        description: data.description,
        photo: data.photo,
        detail: {
          name: data.detail.name.map((item: any) => item.name),
          day: selectedDays,
        },
      });
      enqueueSnackbar('Create Daily Success', { variant: 'success' });
      console.log('Create Daily', response);
      await dispatch(fetchAllDailyChallenge());
      closeModal();
      // reset();
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>ภารกิจทั่วไป</h1>
        <IconFlatButton title='สร้างภารกิจ' onClick={openModal} />
      </article>

      <Modal>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeaderText
              icon={GoGoal}
              title='สร้างภารกิจทั่วไป'
              useBigestHeader
            />
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-7'>
              {/* section1 */}
              <div className='col-span-1 space-y-4 md:space-y-8 rounded-lg md:col-span-4 flex flex-col'>
                <InputText name='name' control={control} label='ชื่อภารกิจ' />
                <InputText name='points' control={control} label='คะแนนรวมสะสม' type='number' />
                <InputText name='numDays' control={control} label='ระยะเวลาการทำภารกิจ' type='number' />


              </div>

              {/* section2 : wait picture */}
              <div className='order-first col-span-1 space-y-4 rounded-lg md:order-none md:col-span-3'>
                {/* <p>รูปภาพหน้าปก</p> */}
                <UploadImageDisplay displayType='large' />
                {/* <InputText name='photo' control={control} label='photo' /> */}
              </div>

              {/* section3 : detail */}
              <div className='pt-2 col-span-1 space-y-4 rounded-lg md:col-span-7'>
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
              <ActionButton
                type='submit'
                variant='submit'
                disabled={!isDirty || Object.keys(errors).length > 0}
              >
                ยืนยันการสร้างภารกิจ
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default CreateDailyChallenge;
