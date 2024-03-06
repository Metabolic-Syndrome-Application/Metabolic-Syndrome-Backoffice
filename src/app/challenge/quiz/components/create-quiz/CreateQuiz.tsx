'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { Ri24HoursFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputText } from '@/components/form/InputText';
import { createQuizChallengeSchema, createQuizSchemaValues } from '@/components/form/validation/ChallengeValidator';

import OptionQuizFields from '@/app/challenge/quiz/components/create-quiz/OptionQuizFields';
import { API_PATH } from '@/config/api';
import { fetchAllQuizs } from '@/redux/slices/quizsSlice';
import { InputMultiline } from '@/components/form/InputMultiline';


const CreateQuiz = () => {
  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<any>();

  const methods = useForm<createQuizSchemaValues>({
    mode: 'onChange',
    resolver: zodResolver(createQuizChallengeSchema),
    defaultValues: {
      choices: [
        { option: '', isCorrect: true },
        { option: '', isCorrect: false },
      ],
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;


  const onSubmit = async (data: z.infer<typeof createQuizChallengeSchema>) => {
    try {

      const response = await axiosAuth.post(API_PATH.CREATE_QUIZ, {
        question: data.question,
        points: data.points,
        limitTime: data.limitTime,
        choices: data.choices
      });
      enqueueSnackbar('Create Quiz Success', { variant: 'success' });
      console.log('Create Quiz', response);

      await dispatch(fetchAllQuizs());
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
        <h1 className='text-balance'>ภารกิจตอบคำถามประจำวัน</h1>
        <IconFlatButton
          title='สร้างภารกิจประจำวัน'
          onClick={openModal}
        />
      </article>
      <Modal>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeaderText
              icon={Ri24HoursFill}
              title='สร้างภารกิจประจำวัน'
              useBigestHeader
            />
            <div className='flex flex-col space-y-4'>
              {/* section1 : Question*/}
              <div className='col-span-1 space-y-5 rounded-lg md:col-span-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium text-base'>คำถาม</h4>
                  <InputMultiline name="question" control={control} label='คำถาม' />
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                  <InputText name='points' control={control} label='คะแนนรวมสะสม' defaultValue={150} disabled />
                  <InputText name='limitTime' control={control} label='เวลาในการตอบคำถาม (นาที)' defaultValue={1} disabled />
                </div>

                {/* section2 : Answer Choices */}
                <OptionQuizFields />

              </div>
            </div>

            <div className='flex w-full justify-end space-x-3 py-4 mt-4'>
              <ActionButton type='reset' variant='cancel' onClick={closeModal}>
                ยกเลิก
              </ActionButton>
              <ActionButton
                type='submit'
                variant='submit'
              >
                ยืนยันการสร้างคำถาม
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default CreateQuiz;
