'use client';
import React, { useState } from 'react';

import IconTypeButton from '@/components/buttons/IconTypeButton';
import LineChart from '@/components/charts/LineChart';
import LineChartPressure from '@/components/charts/LineChartPressure';
import LineMultiChart from '@/components/charts/LineMultiChart';

import { iconTypeHealthMapping } from '@/helpers/typeIcon';

import { GraphHealthType } from '@/types/recordHealth';

const GraphHealth = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const [selectedType, setSelectedType] = useState<GraphHealthType>(
    GraphHealthType.bmi
  );

  const handleButtonClick = (type: GraphHealthType) => {
    setSelectedType(type);
  };
  // Define a function to dynamically determine icon, variant, and label based on selectedType
  const getChartInfo = (type: GraphHealthType) => {
    return iconTypeHealthMapping[type] || iconTypeHealthMapping.default;
  };

  // Define a switch statement to render the appropriate chart component based on the selectedType
  const renderChartComponent = () => {
    switch (selectedType) {
      case GraphHealthType.bmi:
        return (
          <>
            <div className='my-2 flex h-full w-full flex-col items-center justify-evenly gap-4 px-4 lg:flex-row'>
              <div className='w-full md:max-h-[400px] lg:w-[60%]'>
                <LineChart
                  patientId={id}
                  graphType={GraphHealthType.bmi}
                  nameType='ดัชนีมวลกาย'
                />
              </div>
              <div className='w-full md:max-h-[400px] lg:w-[40%]'>
                <LineChart
                  patientId={id}
                  graphType={GraphHealthType.waistline}
                  nameType='รอบเอว'
                />
              </div>
            </div>
          </>
        );

      case GraphHealthType.bloodGlucose:
        return (
          <>
            <div className='my-2 flex h-full w-full flex-col items-center justify-evenly gap-4 px-4 lg:flex-row'>
              <LineChart
                patientId={id}
                graphType={GraphHealthType.bloodGlucose}
                nameType='ระดับน้ำตาล'
              />
            </div>
          </>
        );
      case GraphHealthType.bloodLipids:
        return (
          <>
            <div className='my-2 flex h-full w-full flex-col items-center justify-evenly gap-4 px-4 lg:flex-row'>
              <LineMultiChart
                patientId={id}
                graphType={GraphHealthType.bloodLipids}
                labels={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
                dataKeys={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
                nameType='ไขมันในเลือด'
              />
            </div>
          </>
        );
      case GraphHealthType.bloodPressure:
        return (
          <>
            <div className='my-2 flex h-full w-full flex-col items-center justify-evenly gap-4 px-4 lg:flex-row'>
              <LineChartPressure
                patientId={id}
                graphType={GraphHealthType.bloodPressure}
                labels={[
                  'Systolic Pressure',
                  'Diastolic Pressure',
                  'Pulse Rate',
                ]}
                dataKeys={[
                  'systolicBloodPressure',
                  'diastolicBloodPressure',
                  'pulseRate',
                ]}
                nameType='ความดันโลหิต'
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='w-full p-2'>
      <div className='flex w-full flex-col md:flex-row'>
        {/* Render buttons for each health type */}
        <div className='flex flex-wrap items-stretch gap-1.5 p-4 md:flex-col'>
          {Object.values(GraphHealthType).map((type) => {
            const { icon, variant, label, bg } = getChartInfo(type);
            return (
              <div key={type} className='flex md:w-full'>
                {type !== GraphHealthType.waistline && ( // Render the button only if it's not waistline
                  <IconTypeButton
                    icon={icon}
                    variant={variant}
                    className='mb-2'
                    classNames={{ icon: `bg-${bg}` }}
                    onClick={() => handleButtonClick(type)}
                  >
                    {label || type}
                  </IconTypeButton>
                )}
              </div>
            );
          })}
        </div>

        {/* Render the selected chart component */}
        <div className='flex w-full flex-col items-center justify-center'>
          {renderChartComponent()}
        </div>
      </div>
    </div>
  );
};

export default GraphHealth;
