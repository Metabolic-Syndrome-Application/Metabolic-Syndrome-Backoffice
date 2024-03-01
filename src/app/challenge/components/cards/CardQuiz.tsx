'use client';
import Image from 'next/image';
import React from 'react';
import { MdOutlineQuiz } from "react-icons/md";

import { TextFieldInfo } from '@/components/form/TextFieldInfo';

import { IQuizChallengeData } from '@/types/challenge';

export const CardQuiz = ({
  question,
  choices,
}: IQuizChallengeData) => {


  return (
    <div className='flex flex-col w-full items-center justify-center p-2 md:p-4'>
      <div className='relative py-6'>
        <div className='absolute top-[10px] left-1/2 transform -translate-x-1/2 z-10 rounded-xl bg-default-blue text-white px-4 py-2'>
          <div className='flex items-center text-center gap-1 min-w-[110px]'>
            <MdOutlineQuiz />
            <span className='text-sm md:text-base'>
              คำถามประจำวัน
            </span>
          </div>
        </div>

        <div className='pt-8 flex flex-col items-center justify-center bg-blue-50 rounded-xl w-full min-w-[350px] md:max-w-[650px] min-h-[200px] h-full p-4'>
          <h4 className='text-center whitespace-pre-line text-wrap font-semibold leading-normal tracking-wide break-all'>
            {question}
          </h4>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full md:w-[650px]'>
        {choices && choices.map((choice, index) => (
          <div key={index}>
            <TextFieldInfo
              label=''
              value={choice.option}
              isSelected={choice.isCorrect}
            />
          </div>
        ))}
      </div>

      <div className='pt-2'>
        <Image
          src='/assets/images/quiz.svg'
          alt='quiz-image'
          className='w-[250px] lg:[300px]'
          width={400}
          height={400}
          priority={false}
        />
      </div>



    </div >
  );
};
