'use client';
import Image from 'next/image';
import React from 'react';

import {
  calculateProgress,
  ProgressBar,
  RangeColorDiseaseRisk,
} from '@/components/common/Progressbar';

import {
  imgDisease,
  labelDisease,
  thaiLabelDiseaseRisk,
} from '@/helpers/typeIcon';

import { DiseaseType, IDiseaseRisk } from '@/types/patient';

interface CardDiseaseRiskProps {
  id: string;
  diseaseRisk: IDiseaseRisk;
}

{
  /* Display all diseaseRisk */
}
const DiseaseRiskComponent = ({
  disease,
  rangeRisk,
}: {
  disease: DiseaseType;
  rangeRisk: string;
}) => (
  <div className='border-light-gray hover:bg-light-blue flex w-full flex-col items-center justify-center gap-3 rounded-lg border-[1px] p-4 hover:border-blue-200 hover:shadow-md'>
    <div className='flex w-full items-start gap-3 md:min-w-[230px]'>
      <Image
        src={imgDisease[disease]}
        alt={disease}
        className='bg-light-yellow h-[50px] w-[50px] rounded-xl object-cover p-2'
        width={400}
        height={400}
        priority={false}
      />

      <div className='ml-3 flex flex-grow flex-col whitespace-pre-line'>
        <h5 className='text-base font-medium'>{labelDisease[disease]}</h5>
        <p className='text-default-gray py-1 text-xs md:text-sm'>
          {thaiLabelDiseaseRisk[rangeRisk]}
        </p>
      </div>
    </div>
    <div className='w-full'>
      <ProgressBar
        progress={calculateProgress(rangeRisk)}
        color={
          RangeColorDiseaseRisk[rangeRisk as keyof typeof RangeColorDiseaseRisk]
        }
      />
    </div>
  </div>
);

const CardDiseaseRisk = ({ id, diseaseRisk }: CardDiseaseRiskProps) => {
  //if all diseaseRisk = 'metabolicLow' -> show "MetabolicSyndrome"
  const allMetabolicLow = Object.values(diseaseRisk || {}).every(
    (value) => value === 'metabolicLow'
  );

  return (
    <div className='w-full'>
      {diseaseRisk && (
        <div key={id} className='flex w-full flex-col '>
          <h4 className='text-balance p-2'>ผลจากแบบประเมินความเสี่ยง</h4>
          <div className='flex flex-col md:flex-row'>
            <div className='relative w-full  md:min-h-[350px]'>
              <Image
                src='/assets/images/wireBody.jpg'
                alt='screening'
                className='h-[250px] w-full rounded-xl object-contain md:h-full md:overflow-hidden lg:object-cover'
                width={400}
                height={400}
                priority={true}
              />

              <div className='bg-default-yellow absolute inset-0 left-1/2 top-[42.77%] block h-[65px] w-[65px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed blur-md md:hidden md:overflow-hidden lg:block'>
                <div className='bg-default-red absolute inset-0 m-auto h-[30px] w-[30px] rounded-full blur-sm'></div>
              </div>
            </div>
            <div className='flex w-full flex-col items-center justify-center space-y-4 py-2'>
              {allMetabolicLow ? (
                <DiseaseRiskComponent
                  disease={DiseaseType.metabolicLow}
                  rangeRisk='metabolicLow'
                />
              ) : (
                Object.entries(diseaseRisk).map(([disease, rangeRisk]) => (
                  <DiseaseRiskComponent
                    key={disease}
                    disease={disease as DiseaseType}
                    rangeRisk={rangeRisk}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDiseaseRisk;
