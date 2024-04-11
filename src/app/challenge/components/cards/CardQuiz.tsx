'use client';
import Image from 'next/image';
import React from 'react';
import { MdOutlineQuiz } from 'react-icons/md';

import { TextFieldInfo } from '@/components/form/TextFieldInfo';

import { IQuizChallengeData } from '@/types/challenge';

export const CardQuiz = ({ question, choices }: IQuizChallengeData) => {
  return (
    <div className='flex w-full flex-col items-center justify-center p-2 md:p-4'>
      <div className='relative py-6'>
        <div className='bg-default-blue absolute left-1/2 top-[10px] z-10 -translate-x-1/2 transform rounded-xl px-4 py-2 text-white'>
          <div className='flex min-w-[110px] items-center gap-1 text-center'>
            <MdOutlineQuiz />
            <span className='text-sm md:text-base'>คำถามประจำวัน</span>
          </div>
        </div>

        <div className='flex h-full min-h-[200px] w-full flex-col items-center justify-center rounded-xl bg-blue-50 p-4 pt-8 md:min-w-[350px] md:max-w-[650px]'>
          <h4 className='whitespace-pre-line text-wrap break-all text-center font-semibold leading-normal tracking-wide'>
            {question}
          </h4>
        </div>
      </div>

      <div className='grid w-full grid-cols-1 gap-4 md:w-[650px] md:grid-cols-2 md:gap-6'>
        {choices &&
          choices.map((choice, index) => (
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
          className='md:[300px] w-[200px] object-contain'
          width={400}
          height={400}
          priority={false}
        />
      </div>
    </div>
  );
};
