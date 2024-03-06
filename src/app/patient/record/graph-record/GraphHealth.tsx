"use client"
import React, { useState } from 'react';

import IconTypeButton from '@/components/buttons/IconTypeButton';
import LineChart from '@/components/charts/LineChart';
import { iconTypeHealthMapping } from '@/helpers/typeIcon';

import { GraphHealthType } from '@/types/recordHealth';
import LineMultiChart from '@/components/charts/LineMultiChart';
import LineChartPressure from '@/components/charts/LineChartPressure';

const GraphHealth = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const [selectedType, setSelectedType] = useState<GraphHealthType>(GraphHealthType.bmi);

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
            <div className='flex flex-col lg:flex-row items-center justify-evenly w-[90%] gap-4 h-full'>
              <LineChart patientId={id} graphType={GraphHealthType.bmi} nameType='ดัชนีมวลกาย' />
              <LineChart patientId={id} graphType={GraphHealthType.waistline} nameType='รอบเอว' />
            </div>
          </>
        );

      case GraphHealthType.bloodGlucose:

        return (
          <>
            <div className='flex flex-col lg:flex-row items-center justify-evenly w-[90%] gap-4 h-full'>
              <LineChart patientId={id} graphType={GraphHealthType.bloodGlucose} nameType='ระดับน้ำตาล' />
            </div>
          </>
        );
      case GraphHealthType.bloodLipids:
        return (
          <>
            <div className='flex flex-col lg:flex-row items-center justify-evenly w-[90%] gap-4 h-full'>
              <LineMultiChart
                patientId={id}
                graphType={GraphHealthType.bloodLipids}
                labels={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
                dataKeys={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
                nameType='กราฟไขมันในเลือด'
              />
            </div>
          </>
        );
      case GraphHealthType.bloodPressure:
        return (
          <>
            <div className='flex flex-col lg:flex-row items-center justify-evenly w-[90%] gap-4 h-full'>
              <LineChartPressure
                patientId={id}
                graphType={GraphHealthType.bloodPressure}
                labels={['Systolic Pressure', 'Diastolic Pressure', 'Pulse Rate']}
                dataKeys={['systolicBloodPressure', 'diastolicBloodPressure', 'pulseRate']}
                nameType='กราฟความดันโลหิต'
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
      <div className='flex flex-col md:flex-row w-full'>
        {/* Render buttons for each health type */}
        <div className='flex md:flex-col flex-wrap items-center justify-stretch p-4 md:p-0'>
          {Object.values(GraphHealthType).map((type) => {
            const { icon, variant, label, bg } = getChartInfo(type);
            return (
              <div className="w-full" key={type}>
                {type !== GraphHealthType.waistline && ( // Render the button only if it's not waistline
                  <IconTypeButton
                    icon={icon}
                    variant={variant}
                    className='my-1'
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
        <div className='flex flex-col justify-center items-center w-full'>
          {renderChartComponent()}
        </div>

      </div>
    </div>

  );
};

export default GraphHealth;
