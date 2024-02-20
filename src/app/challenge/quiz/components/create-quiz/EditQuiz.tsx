'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { Ri24HoursFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
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
import { FiEdit } from 'react-icons/fi';
import { fetchQuizById, selectAllQuizs, selectQuizById } from '@/redux/slices/quizsSlice';
import { useCallback, useEffect, useState } from 'react';
import { IChoicesQuiz } from '@/types/challenge';
import { TextFieldInfo } from '@/components/form/TextFieldInfo';


const EditQuiz = ({ params, loadData }: { params: { id: string }, loadData: () => void }) => {
  const id = params.id;

  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<any>();


  // const quiz = useSelector(selectAllQuizs);
  const quiz = useSelector(selectQuizById);

  //const quiz = useSelector((state: { quiz: any }) => selectQuizById(state, id));
  console.log('currentQuiz', quiz)


  // Check if quiz?.choices is defined before mapping over it
  let defaultValue;
  if (quiz?.choices) {
    defaultValue = quiz?.choices.map(choice => ({
      option: choice.option,
      isCorrect: choice.isCorrect,
    }));
    console.log('defaultValue', defaultValue);
  } else {
    console.log('Quiz choices are undefined');
  }

  const methods = useForm<createQuizSchemaValues>({
    mode: 'onChange',
    resolver: zodResolver(createQuizChallengeSchema),
    defaultValues: {
      question: quiz?.question,
      points: quiz?.points,
      limitTime: quiz?.limitTime,
      choices: defaultValue
    }

    // defaultValues: async () => {
    //   const response = await axiosAuth.get(`/api/challenge/quiz/${id}`);
    //   const data = await response.data.data.quiz

    //   // Map choices array to the desired structure
    //   const choices = data?.choices.map((choice: { option: any; isCorrect: any; }) => ({
    //     option: choice.option,
    //     isCorrect: choice.isCorrect,
    //   })) || [];

    //   return {
    //     question: data.question,
    //     points: data.points,
    //     limitTime: data?.limitTime,
    //     choices: choices,
    //   }
    // }
  });


  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  // Fetch the quiz data when the component mounts
  useEffect(() => {
    dispatch(fetchQuizById(id));
  }, [dispatch, id]);


  const onSubmit = async (data: z.infer<typeof createQuizChallengeSchema>) => {
    try {

      const response = await axiosAuth.put(API_PATH.PUT_QUIZ(id), {
        question: data.question,
        points: data.points,
        limitTime: data.limitTime,
        choices:
          data.choices
      });
      enqueueSnackbar('Edit Quiz Success', { variant: 'success' });

      dispatch(fetchQuizById(id));
      loadData();
      closeModal();

    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.error(error);
    }
  };


  // useEffect(() => {
  //   dispatch(fetchQuizById(id))
  //     .then(() => setLoading(false))
  //     .catch((error: any) => {
  //       console.error('Error fetching quiz:', error);
  //       enqueueSnackbar('Failed to fetch quiz', { variant: 'error' });
  //     });
  // }, [dispatch, id]);


  return (
    <div className='w-full'>
      {quiz && quiz.choices && (
        <div>
          <h2>{quiz.question}</h2>
          <ul>
            {quiz.choices.map((choice, index) => (
              <TextFieldInfo key={index} label={''} value={`${choice.option} - ${choice.isCorrect}`} isSelected={choice.isCorrect} />
            ))}
          </ul>
        </div>
      )}

      <article className='flex w-full items-center justify-between px-4 py-2'>

        <FiEdit
          className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out'
          onClick={openModal}
        />
      </article>

      <Modal>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeaderText
              icon={Ri24HoursFill}
              title='แก้ไขภารกิจประจำวัน'
              useBigestHeader
            />
            <div className='flex flex-col space-y-4'>
              {/* section1 : Question*/}
              <div className='col-span-1 space-y-4 rounded-lg md:col-span-4'>
                <h4 className='font-medium text-base'>คำถาม</h4>

                <InputText name='question' control={control} label='คำถาม' />

                <div className='flex flex-col md:flex-row gap-4'>
                  <InputText name='points' control={control} label='คะแนนรวมสะสม' defaultValue={150} disabled />
                  <InputText name='limitTime' control={control} label='เวลาในการตอบคำถาม (นาที)' defaultValue={1} disabled />
                </div>

                {/* section2 : Answer Choices */}
                {/* <OptionQuizFields /> */}
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

export default EditQuiz;


