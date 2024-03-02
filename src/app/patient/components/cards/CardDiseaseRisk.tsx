"use client"
import Image from 'next/image';
import React from 'react';

import { calculateProgress, ProgressBar, RangeColorDiseaseRisk } from '@/components/common/Progressbar';

import { imgDisease, labelDisease, thaiLabelDiseaseRisk } from '@/helpers/typeIcon';

import { DiseaseType, IDiseaseRisk } from '@/types/patient';

interface CardDiseaseRiskProps {
  id: string;
  diseaseRisk: IDiseaseRisk;
}

{/* Display all diseaseRisk */ }
const DiseaseRiskComponent = ({ disease, rangeRisk }: { disease: DiseaseType; rangeRisk: string }) => (
  <div className="flex flex-col items-center justify-center w-full shadow-sm border border-light-gray rounded-lg p-4 gap-3">
    <div className="flex items-start w-full min-w-[230px] gap-3">
      <Image
        src={imgDisease[disease]}
        alt={disease}
        className="w-[50px] h-[50px] bg-light-yellow rounded-xl object-cover p-2"
        width={400}
        height={400}
        priority={false}
      />
      <div>
        <h5 className="text-base font-medium">{labelDisease[disease]}</h5>
        <p className="text-[12px] text-default-gray">{thaiLabelDiseaseRisk[rangeRisk]}</p>
      </div>
    </div>
    <div className="w-full">
      <ProgressBar
        progress={calculateProgress(rangeRisk)}
        color={RangeColorDiseaseRisk[rangeRisk as keyof typeof RangeColorDiseaseRisk]}
      />
    </div>
  </div>
);

const CardDiseaseRisk = ({ id, diseaseRisk }: CardDiseaseRiskProps) => {

  //if all diseaseRisk = 'metabolicLow' -> show "MetabolicSyndrome"
  const allMetabolicLow = Object.values(diseaseRisk || {}).every((value) => value === 'metabolicLow');

  return (
    <div className="w-full">
      {diseaseRisk && (
        <div key={id} className="flex flex-col w-full lg:w-[40%] p-2">
          {/* <FormHeaderText title="แบบประเมินความเสี่ยง" useBigestHeader={true} /> */}
          <h3>ผลจากแบบประเมินความเสี่ยง</h3>
          <div className='flex flex-col md:flex-row py-2'>
            <div className='w-full relative  md:min-h-[350px]'>
              <Image
                src="/assets/images/wireBody.jpg"
                alt="screening"
                className="w-full h-[250px] md:h-full rounded-xl object-contain md:object-fill lg:object-cover"
                width={400}
                height={400}
                priority={false}
              />

              <div className="absolute inset-0 top-[42.77%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dashed border-2 bg-default-yellow blur-md w-[65px] h-[65px] rounded-full">
                <div className="absolute inset-0 m-auto bg-default-red blur-sm w-[30px] h-[30px] rounded-full"></div>
              </div>

            </div>
            <div className='flex flex-col items-center justify-center w-full space-y-4 py-2'>
              {allMetabolicLow ? (
                <DiseaseRiskComponent disease={DiseaseType.metabolicLow} rangeRisk="metabolicLow" />
              ) : (
                Object.entries(diseaseRisk).map(([disease, rangeRisk]) => (
                  <DiseaseRiskComponent key={disease} disease={disease as DiseaseType} rangeRisk={rangeRisk} />
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

