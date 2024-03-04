// "use client"
// import React from 'react';

// import { IPlan } from '@/types/patient';

// export interface IPlanData {
//   planID: string[];
//   Plan: IPlan[];
// }

// interface CardInfoPlanProps {
//   id: string;
//   planData: IPlanData;
// }

// const CardInfoPlan = ({ id, planData }: CardInfoPlanProps) => {
//   const { planID, Plan } = planData || {}; // Handle if planData is null or undefined

//   return (
//     <div className="flex flex-col items-center justify-center w-full shadow-sm border border-light-gray rounded-lg p-4 gap-3">
//       <h3>โปรแกรมสุขภาพ</h3>

//       {/* Iterate through the planID array */}
//       {planID && Plan && planID.map(planId => {
//         // Find the corresponding plan object
//         const plan = Plan.find(p => p.id === planId);
//         if (!plan) return null; // Handle if plan is not found

//         // Render the plan name
//         return (
//           <div key={plan.id} className="flex gap-2">
//             <h5 className='text-dark-gray'>ชื่อโปรแกรม :</h5>
//             <h5 className=''>{`${plan.name}`} </h5>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default CardInfoPlan;


import React from 'react';

import { IPlan } from '@/types/patient';

interface IPlanData {
  planID: string[];
  Plan: IPlan[];
}

interface CardInfoPlanProps {
  id?: string;
  planData: IPlanData;
}

const CardInfoPlan: React.FC<CardInfoPlanProps> = ({ planData }) => {
  const { planID = [], Plan = [] } = planData || {};

  return (
    <div className="flex flex-col items-center justify-center w-full shadow-sm border border-light-gray rounded-lg p-4 gap-3">
      <h3>โปรแกรมสุขภาพ</h3>
      {planID && Plan && planID.map(planId => {
        const plan = Plan.find(p => p.id === planId);
        console.log('planid', plan)
        if (!plan) return null;
        return (
          <div key={plan.id} className="flex gap-2">
            <h5 className='text-dark-gray'>ชื่อโปรแกรม :</h5>
            <h5>{plan.name}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default CardInfoPlan;

