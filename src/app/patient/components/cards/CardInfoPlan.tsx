import React from 'react';

import OutlineButton from '@/components/buttons/OutlineButton';

import { iconTypeMapping, TypePlan } from '@/helpers/typeIcon';

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
    <div className="flex flex-col items-start justify-center w-full p-4 gap-3">
      <h4 className='text-balance p-2'>โปรแกรมสุขภาพ</h4>
      {planID && Plan && planID.length > 0 ? (
        planID.map(planId => {
          const plan = Plan.find(p => p.id === planId);
          if (!plan) return null;

          // Retrieve the icon, variant, and label for the plan type
          const { icon: Icon, variant, label: thaiLabel, bg } = iconTypeMapping[plan.type as TypePlan] || iconTypeMapping.default;
          const displayValueType = thaiLabel || plan.type;
          return (
            <div key={plan.id} className="flex items-center p-4 w-full rounded-lg overflow-hidden hover:shadow-md" style={{ backgroundColor: bg }}>
              <div className='w-14'>
                <div className="flex flex-col w-full items-center " style={{ color: bg }}>
                  <Icon className="w-10 h-10 bg-[#FFFFFF] flex rounded-full text-center p-1.5 object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-start ml-3">
                <h5 className='pl-1 text-base font-medium'>{plan.name}</h5>
                <OutlineButton variant={variant} size='sm' className='p-0 rounded-none shadow-none'>
                  {displayValueType}
                </OutlineButton>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-4 w-full rounded-lg  text-center">
          <p className="text-xl text-default-red">ยังไม่มีโปรแกรมสุขภาพในตอนนี้</p>
        </div>
      )}
    </div>
  );
};

export default CardInfoPlan;
