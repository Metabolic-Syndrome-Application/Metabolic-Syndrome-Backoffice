// import React, { useMemo, useState } from 'react'

// import LineChart from '@/components/charts/LineChart';
// import LipidChart from '@/components/charts/LipidChart';
// import { HealthRecordType } from '@/types/patient';

// const TestChart = ({ params }: { params: { id: string } }) => {
//   const id = params.id;

//   const [selectedTypes, setSelectedTypes] = useState<string[]>([
//     HealthRecordType.BMI,
//   ]);

//   return (
//     <div>
//       TestChart

//       <LineChart patientId={id} graphType="bmi"></LineChart>
//       <LineChart patientId={id} graphType="waistline"></LineChart>
//       <LineChart patientId={id} graphType="bloodGlucose"></LineChart>

//       {/* <DayChart
//         patientId={id}
//         graphType="bloodPressure"
//         labels={['Systolic Pressure', 'Diastolic Pressure', 'Pulse Rate']}
//         dataKeys={['systolicBloodPressure', 'diastolicBloodPressure', 'pulseRate']}
//       /> */}
//       <LipidChart
//         patientId={id}
//         graphType="bloodLipids"
//         labels={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
//         dataKeys={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
//       />
//       {/* < LipidChart patientId={id} graphType="bloodLipids"></LipidChart> */}
//     </div>
//   )
// }

// export default TestChart

import React, { useState } from 'react';

import IconTypeButton from '@/components/buttons/IconTypeButton';
import LineChart from '@/components/charts/LineChart';
import LipidChart from '@/components/charts/LipidChart';

import { iconTypeHealthMapping } from '@/helpers/typeIcon';

import { GraphHealthType } from '@/types/recordHealth';

const TestChart = ({ params }: { params: { id: string } }) => {
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
            <div className='flex flex-col md:flex-row justify-evenly w-full'>
              <LineChart patientId={id} graphType={GraphHealthType.bmi} />
              <LineChart patientId={id} graphType={GraphHealthType.waistline} />
            </div>
          </>
        );

      case GraphHealthType.bloodGlucose:
        return <LineChart patientId={id} graphType={GraphHealthType.bloodGlucose} />;
      case GraphHealthType.bloodLipids:
        return (
          <LipidChart
            patientId={id}
            graphType={GraphHealthType.bloodLipids}
            labels={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
            dataKeys={['cholesterol', 'hdl', 'ldl', 'triglyceride']}
          />
        );
      // case GraphHealthType.bloodPressure:
      //   return (
      //     <DayChart
      //       patientId={id}
      //       graphType={GraphHealthType.bloodPressure}
      //       labels={['Systolic Pressure', 'Diastolic Pressure', 'Pulse Rate']}
      //       dataKeys={['systolicBloodPressure', 'diastolicBloodPressure', 'pulseRate']}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (

    <div className='flex flex-col md:flex-row w-full'>
      {/* Render buttons for each health type */}
      {/* <div className='flex md:flex-col flex-wrap items-center justify-stretch gap-2'>
        {Object.values(GraphHealthType).map((type) => {
          const { icon, variant, label, bg } = getChartInfo(type);
          return (
            <div className="w-fit md:w-full" key={type}> 
              <IconTypeButton
                icon={icon}
                variant={variant}
                classNames={{ icon: `bg-${bg}` }}
                onClick={() => handleButtonClick(type)}
              >
                {label || type}
              </IconTypeButton>
            </div>
          );
        })}
      </div> */}
      {/* Render buttons for each health type */}
      <div className='flex md:flex-col flex-wrap items-center justify-stretch gap-2'>
        {Object.values(GraphHealthType).map((type) => {
          const { icon, variant, label, bg } = getChartInfo(type);
          return (
            <div className="w-fit md:w-full" key={type}>
              {type !== GraphHealthType.waistline && ( // Render the button only if it's not waistline
                <IconTypeButton
                  icon={icon}
                  variant={variant}
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
      <div className='flex flex-col justify-center items-center bg-green-400 w-full'>
        {renderChartComponent()}
      </div>

    </div>
  );
};

export default TestChart;
